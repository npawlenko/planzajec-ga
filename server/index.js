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

const validation = require("joi");

const PlanZajecGA = require("./src/PlanZajecGA");
const {valid} = require("joi");

// Setup
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.use(cors());
app.use(express.static('./public'));
app.use(express.json());

app.get('/', (req, res) => {
    if(debug)
        console.log(`Request (${req.method}) ${req.path} from ${req.ip}, body: ${JSON.stringify(req.body)}`);

    let response = {
        status: 1
    };

    res.end(JSON.stringify(response));
});

app.post('/generate', (req, res) => {
    if(debug)
        console.log(`Request (${req.method}) ${req.path} from ${req.ip}, body: ${JSON.stringify(req.body)}`);

    let response = {
      status: false,
      message: "Unknown error"
    };

    if(!req.body) {
        response = {
          status: false,
          message: "Invalid JSON"
        };
        res.end(JSON.stringify(response));
        return;
    }

    // Validation
    const validationSchema = validation.object({
        dayStart: validation.string()
            .required(),

        dayEnd: validation.string()
            .required(),

        groups: validation.array()
            .required(),

        subjects: validation.array()
            .required(),

        teachers: validation.array()
            .required()
    });
    validationSchema.validate(req.body);

    // Prepare data
    // TODO: Objectize
    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    const dayStart = days.indexOf(req.body["dayStart"]);
    const dayEnd = days.indexOf(req.body["dayEnd"]);
    let workingDays;

    if(dayStart > dayEnd) {
        workingDays = days.slice(dayEnd, days.length-1); // dayEnd-Sun
        workingDays = workingDays.concat(days.slice(0, dayStart)); // Mon-dayStart
    }
    else
        workingDays = days.splice(dayStart, dayEnd); // dayStart-dayEnd

    const data = {
        groups: req.body["groups"],
        subjects: req.body["subjects"],
        teachers: req.body["teachers"],
        day: workingDays,
        time: req.body["time"]
    };

    // Algorithm
    const schedule = new PlanZajecGA(data);


    // Response
    res.end(JSON.stringify(response));
});

// Start server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});