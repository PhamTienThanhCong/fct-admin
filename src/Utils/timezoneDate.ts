import moment, { Moment } from "moment";

export const timezoneDate = (date: Moment | string | undefined | null): string | null => {
  if (!date || !moment(date).isValid()) {
    return null;
  }
  const newDate = moment(date).format("DD/MM/YYYY HH:mm");
  return newDate;
};

export const convertDate = (date: Moment | string | undefined | null): string | null => {
  if (!date || !moment(date).isValid()) {
    return null;
  }
  const newDate = moment(date).format("DD/MM/YYYY");
  return newDate;
};
