export const dateStamp = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear()
  return `${dd}-${mm}-${yyyy}`
}
