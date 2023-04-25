export const isUserLoggedIn = () => {
  let userId = localStorage.getItem("userId");
  if (userId === null) return false;
  return true;
};
