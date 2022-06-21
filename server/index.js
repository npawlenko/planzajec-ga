/**
 *
 */

// Config
const port = process.env.PORT || 8080;
const hostname = "127.0.0.1";
const debug = true;

// App
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const cors = require("cors");
const path = require("path");
const fs = require("fs");
const publicDir = path.resolve("../client/build");


const Joi = require("joi");
const Day = require("../client/src/utils/Day");
const PlanZajecGA = require("./src/PlanZajecGA");
const Schedule = require("./src/Schedule");

// Setup
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.use(cors());
app.use(express.static(publicDir));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");



app.get("/schedule/:filename", (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.resolve("./tmp", fileName+".pdf");

    if(fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);

        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Rozklad_zajec.pdf');
        fs.createReadStream(filePath).pipe(res);
        return;
    }
    else {
        res.status(500);
        res.send('File not found');
    }
});

app.get('*', (req, res) => {
    if(debug)
        console.log(`Request (${req.method}) ${req.path} from ${req.ip}, body: ${JSON.stringify(req.body)}`);

    res.sendFile(path.resolve(publicDir, 'index.html'));
});

app.post('/generate', (req, res) => {
    if(debug)
        console.log(`Request (${req.method}) ${req.path} from ${req.ip}, body: ${JSON.stringify(req.body)}`);

    let response = {
      status: false,
      error: "Unknown error"
    };

    // Validation
    const validationSchema = Joi.object({
        dayStart: Joi.string()
            .valid(
                'mon', 'tue', 'wed',
                'thu', 'fri', 'sat', 'sun'
            )
            .required(),

        dayEnd: Joi.string()
            .valid(
                'mon', 'tue', 'wed',
                'thu', 'fri', 'sat', 'sun'
            )
            .required(),

        groups: Joi.array()
            .min(1)
            .required(),

        subjects: Joi.array()
            .min(1)
            .required(),

        time: Joi.array()
            .min(1)
            .required(),

        teachers: Joi.array()
            .min(1)
            .required()
    });
    const validation = validationSchema.validate(req.body);

    if(validation.error) // Invalid input
    {
        response = {
          "status": false,
          "error": validation.error.details[0].message
        };
        res.end(JSON.stringify(response));
        return;
    }


    // Prepare data
    const days = Object.keys(Day.Name);

    const dayStart = days.indexOf(req.body["dayStart"]);
    const dayEnd = days.indexOf(req.body["dayEnd"]);
    let workingDays;

    if(dayStart > dayEnd) {
        workingDays = days.slice(dayEnd, days.length-1); // dayEnd-Sun
        workingDays = workingDays.concat(days.slice(0, dayStart)); // Mon-dayStart
    }
    else
        workingDays = days.splice(dayStart, dayEnd+1); // dayStart-dayEnd

    const data = {
        groups: req.body.groups,
        subjects: req.body.subjects,
        teachers: req.body.teachers,
        days: workingDays,
        times: req.body["time"]
    };

    // Algorithm
    const scheduleGA = new PlanZajecGA(data);
    scheduleGA.evolve();

    const schedule = new Schedule(data, scheduleGA.ga.population());
    const pdf = schedule.render();
    if(pdf === undefined) {
        result = {
          status: false,
          error: "Nie udało się wygenerować planu zajęć. Spróbuj ponownie."
        };
        res.end(response);
        return;
    }

    // Response
    response = {
        status: true,
        url: "http://localhost:8080/schedule/"+pdf
    };

    res.end(JSON.stringify(response));
});

// Start server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});