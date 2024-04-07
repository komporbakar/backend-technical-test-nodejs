import moment from "moment";

export const convertToPlus7 = (dateTimeString) => {
    return moment(dateTimeString).utcOffset('+07:00').format();
};