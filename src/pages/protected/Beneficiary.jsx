import { createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import toast from "solid-toast";
import Beneficiary from "../../features/beneficiary";
import { setPageTitle } from "../../data/mainStoreFunctions";
import { isUserLoggedIn } from "../../components/helpers/AuthenticationService";

function InternalPage() {
  const navigate = useNavigate();
  createEffect(() => {
    setPageTitle("Bénéficiaire");
    if (!isUserLoggedIn()) {
      toast.error(
        "Oops! il semble que votre session a expiré. Reconnectez-vous."
      );
      setTimeout(() => {
        return navigate("/login", { replace: true });
      }, 3000);
    }
  });

  return <Beneficiary />;
}

export default InternalPage;
