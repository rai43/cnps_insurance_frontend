import { Show, createEffect, createSignal } from "solid-js";
import { validateSchema } from "@felte/validator-zod";
import { createForm } from "@felte/solid";
import * as zod from "zod";
import { A, useNavigate } from "@solidjs/router";
import LandingIntro from "./LandingIntro";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import axios from "axios";
import { setLoginInfo } from "../../data/mainStoreFunctions";

const INITIAL_LOGIN_OBJ = {
  loginId: "user1@test.com",
  password: "pass@1234",
};

const signinFormSchema = zod.object({
  loginId: zod.string().nonempty(),
  password: zod.string().nonempty(),
});

const Login = () => {
  const [loading, setLoading] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal("");
  const [loginObj, setLoginObj] = createSignal(INITIAL_LOGIN_OBJ);
  const navigate = useNavigate();

  const submitForm = async (values) => {
    console.log("On submit", errors());
    const collectedJsonValues = JSON.stringify(values);
    console.log(collectedJsonValues);

    setLoading(true);
    // Call API to check user credentials and save token in localstorage
    let response;
    try {
      response = await axios.post(
        "http://localhost:9000/api/users/login/",
        collectedJsonValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setLoginInfo(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("id_number", response.data.id_number);

      // navigate("/app/dashboard", { replace: true });
      window.location.href = "/app/dashboard";
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    console.log("good");
  };

  const { form, data, errors } = createForm({
    validate: validateSchema(signinFormSchema),
    onSubmit: submitForm,
  });

  createEffect(() => {
    if (errors("loginId")) {
      console.log(1);
      setErrorMessage("L'identifiant de connexion est requis!");
    } else if (errors("password")) {
      console.log(2);
      setErrorMessage("Mot de passe requis!");
    } else {
      console.log(3);
      setErrorMessage("");
    }
  });

  return (
    <div class="min-h-screen bg-base-200 flex items-center">
      <div class="card mx-auto w-full max-w-5xl  shadow-xl">
        <div class="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div class="">
            <LandingIntro />
          </div>
          <div class="py-24 px-10">
            <h2 class="text-2xl font-semibold mb-2 text-center">
              Page de connexion
            </h2>
            <form use:form>
              <div class="mb-4">
                <InputText
                  type="loginId"
                  name="loginId"
                  placeholder="Identifiant"
                  defaultValue={loginObj().loginId}
                  containerStyle="mt-4"
                  labelTitle="Identifiant"
                />

                <InputText
                  defaultValue={loginObj().password}
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  containerStyle="mt-4"
                  labelTitle="Mot de passe"
                />
              </div>

              <div class="text-right text-primary">
                <A href="/forgot-password">
                  <span class="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Mot de passe oublié?
                  </span>
                </A>
              </div>

              <Show when={errorMessage()}>
                <ErrorText styleClass="mt-8">{errorMessage()}</ErrorText>
              </Show>
              <button
                class={
                  "btn mt-2 w-full btn-primary" + (loading() ? " loading" : "")
                }
              >
                Se connecter
              </button>

              <div class="text-center mt-4">
                Vous n'avez pas encore de compte?{" "}
                <A href="/register">
                  <span class="inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Inscrivez vous maintenant
                  </span>
                </A>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
