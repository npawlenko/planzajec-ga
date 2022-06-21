class TimeRange {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    toJSON() {
        return {
            start: this.start,
            end: this.end
        };
    }

    overlaps(timeRange, bool=false) {
        let a = this.start.getDate(),
            b = this.end.getDate(),
            c = timeRange.start.getDate(),
            d = timeRange.end.getDate();

        let result;
        if((a <= c && a < d) && (b < c && b <= d))
            result = -1; // a,b is before
        else if((a > c && a >= d) && (b >= c && b > d))
            result = 1; // a,b is after
        else
            result = 0;

        console.log(result);
        if(bool) return result === 0;
        else return result;
    }
}

export default TimeRange;