import moment from "moment";

export const dateStamp = () => {
  const today = moment();
  return moment(today).format('DD-MM-YYYY');
}
