import { onMount } from "solid-js";
import { Route, useNavigate } from "@solidjs/router";
import { isUserLoggedIn } from "./AuthenticationService";

const AuthenticatedRoute = (props) => {
  const navigate = useNavigate();
  onMount(() => {
    if (!isUserLoggedIn()) navigate("/login", { replace: true });
  });

  return <Route {...props} />;
};

export default AuthenticatedRoute;
