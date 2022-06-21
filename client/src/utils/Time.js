
class Time {
    constructor(timeString) {
        this.time = timeString;
    }

    getDate() {
        const today = new Date();
        today.setHours(this.hour, this.minute, 0, 0);
        return today;
    }

    isValid() {
        return !isNaN(this.getDate().getTime());
    }

    get time() {
        return this._time;
    }

    set time(time) {
        time = time.trim();
        this._time = time;

        const regex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
        if(!time.match(regex))
            return;

        const split = time.split(':');
        this.hour = split[0];
        this.minute = split[1];
    }

    get hour() {
        return this._hour;
    }

    set hour(hour) {
        const regex = /^([0-9]|0[0-9]|1[0-9]|2[0-3])$/;

        if(hour.match(regex)) this._hour = hour;
        else this._hour = undefined;
    }

    get minute() {
        return this._minute;
    }

    set minute(minute) {
        const regex = /^[0-5][0-9]$/;

        if(minute.match(regex)) this._minute = minute;
        else this._minute = undefined;
    }
}

export default Time;