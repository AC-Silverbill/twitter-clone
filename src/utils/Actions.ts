export default class Actions {
    static convertDateToLastCreatedTwitterTime(date: Date) {
        const MAX_TIME_BEFORE_LITERAL_DATE = 100;
        const currentDate = new Date();
        const differenceInMilliseconds = currentDate.valueOf() - date.valueOf();
        if (differenceInMilliseconds > MAX_TIME_BEFORE_LITERAL_DATE) {
            const regexAll = /(\w+)(\s)(\w+)(\s)([0-9]+)(\s)([0-9]+)/g;
            const regexRemoveLeadingZero = /(\s)(0)([0-9]+)/g;
            if (date.getFullYear() !== currentDate.getFullYear()) {
                return date.toDateString().replace(regexAll, "$3$4$5,$6$7").replace(regexRemoveLeadingZero, "$1$3");
            } else {
                return date.toDateString().replace(regexAll, "$3$4$5").replace(regexRemoveLeadingZero, "$1$3");
            }
        } else {
            // return time in difference
            return "a short time";
        }
    }
}
