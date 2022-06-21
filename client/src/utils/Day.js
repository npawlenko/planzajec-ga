
class Day {
    static get Name() {
        return {
            mon: "Poniedziałek",
            tue: "Wtorek",
            wed: "Środa",
            thu: "Czwartek",
            fri: "Piątek",
            sat: "Sobota",
            sun: "Niedziela"
        };
    }

    constructor(day) {
        this.day = day;
        this.dayName = Day.Name[day];
    }
}

module.exports = Day;