export const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const containFilterParams = {
  filterOptions: ["contains", "notContains"],
  debounceMs: 200,
  maxNumConditions: 1,
};
