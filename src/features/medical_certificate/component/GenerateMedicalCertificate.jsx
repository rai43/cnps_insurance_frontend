import * as zod from "zod";
import { createForm } from "@felte/solid";
import { validateSchema } from "@felte/validator-zod";
import InputText from "../../../components/Input/InputText";
import { createEffect } from "solid-js";
import { rightSidebarState } from "../../../data/rightSidebarState";
import { appStore } from "../../../data/mainStore";
import toast from "solid-toast";
import axios from "axios";
import moment from "moment";
import Medical_certificate_pdf from "./Medical_certificate_pdf";
import { refetch as consultationRefetch } from "../../consultations/components/ManageConsultations";

const INITIAL_MEDICAL_CERTIFICATE_OBJECT = {
  days_number: "",
  stop_work_extended_from: "",
  extention_needed_for: "",
  extention_extended_from: "",
  back_on: "",
};

const medicalCertificateSchema = zod.object({
  days_number: zod.number().positive(),
  // stop_work_extended_from: zod.preprocess((arg) => {
  //   if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  // }, zod.date()),
  // extention_needed_for: zod.preprocess((arg) => {
  //   if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  // }, zod.date()),
  // extention_extended_from: zod.preprocess((arg) => {
  //   if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  // }, zod.date()),
  back_on: zod.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, zod.date()),
});

const createGenerateMedicalForm = (submitForm) => {
  const { form, data, errors, reset } = createForm({
    validate: validateSchema(medicalCertificateSchema),
    onSubmit: submitForm,
  });

  return { form, data, errors, reset };
};

const GenerateMedicalCertificate = (props) => {
  const saveMedicalCertificate = async (collectedJsonValues) => {
    console.log("colle : ", collectedJsonValues);
    const response = await axios.post(
      "http://localhost:9000/api/medical-certificate",
      collectedJsonValues,
      {
        headers: {
          "Content-Type": "application/json",
        },
        authorization:
          "Bearer " +
          (localStorage.getItem("token") || appStore.userLoginInfo.token),
      }
    );
    return response;
  };

  const submitForm = async (values) => {
    console.log(values);

    values = {
      ...values,
      consultation: rightSidebarState.extraObject.data._id,
      patient: rightSidebarState.extraObject.data.beneficiary._id,
      doctor: localStorage.getItem("userId"),
    };

    const collectedJsonValues = JSON.stringify(values);
    toast.promise(saveMedicalCertificate(collectedJsonValues), {
      loading: "Enregistrement du certificat médical ...",
      success: (val) => {
        consultationRefetch();
        // refetch();
        // consultationRefetch();
        // closeModal();
        // reset();
        return <span>Constante enregistrée</span>;
      },
      error: () => {
        return <span>Erreur lors de la création.</span>;
      },
    });
  };

  // const submitForm = async (values) => {
  //   console.log(values);
  //   console.log(rightSidebarState);
  //   values = {
  //     ...values,
  //     consultation: rightSidebarState.extraObject.data._id,
  //     patient: rightSidebarState.extraObject.data.beneficiary._id,
  //     doctor: localStorage.getItem("userId"),
  //   };

  //   try {
  //     // /api/medical-certificate
  //     // history.push("/");
  //   } catch (error) {}
  // };

  const { form, data, reset, errors, isValid } =
    createGenerateMedicalForm(submitForm);

  createEffect(() => console.log(data()));

  return (
    <>
      <form use:form>
        <div className="divider my-2">Arrêt de travail</div>
        <div class="mb-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
            <div>
              <InputText
                defaultValue={
                  rightSidebarState.extraObject?.data
                    ? rightSidebarState.extraObject?.data?.medical_report
                        ?.days_number
                    : ""
                }
                type="number"
                name="days_number"
                placeholder="Arret de travail - Nombre de jours"
                containerStyle="mt-1"
                // inputStyle={errors("dob") ? "input-bordered input-error" : ""}
                labelTitle="Arret de travail"
                // disabled={isLocked()}
              />
            </div>
            <div>
              <InputText
                defaultValue={
                  rightSidebarState.extraObject?.data
                    ? moment(
                        rightSidebarState.extraObject?.data?.medical_report
                          ?.stop_work_extended_from
                      ).format("YYYY-MM-DD")
                    : ""
                }
                type="date"
                name="stop_work_extended_from"
                placeholder="Complication a dater du"
                containerStyle="mt-1"
                // inputStyle={errors("dob") ? "input-bordered input-error" : ""}
                labelTitle="Complication a dater du"
                // disabled={isLocked()}
              />
            </div>
          </div>
        </div>
        <div className="divider my-2">Prolongation d'arrêt de travail</div>
        <div class="mb-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
            <div>
              <InputText
                defaultValue={
                  rightSidebarState.extraObject?.data
                    ? rightSidebarState.extraObject?.data?.medical_report
                        ?.extention_needed_for
                    : ""
                }
                type="number"
                name="extention_needed_for"
                placeholder="Nombre de jours"
                containerStyle="mt-1"
                // inputStyle={errors("dob") ? "input-bordered input-error" : ""}
                labelTitle="Arret de travail"
                // disabled={isLocked()}
              />
            </div>
            <div>
              <InputText
                defaultValue={
                  rightSidebarState.extraObject?.data
                    ? moment(
                        rightSidebarState.extraObject?.data?.medical_report
                          ?.extention_extended_from
                      ).format("YYYY-MM-DD")
                    : ""
                }
                type="date"
                name="extention_extended_from"
                placeholder="Sauf complication a dater du"
                containerStyle="mt-1"
                // inputStyle={errors("dob") ? "input-bordered input-error" : ""}
                labelTitle="Complication a dater du"
                // disabled={isLocked()}
              />
            </div>
          </div>
        </div>
        <div className="divider my-2">Reprise du travail</div>
        <div class="mb-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
            <div class="col-span-2">
              <InputText
                defaultValue={
                  rightSidebarState.extraObject?.data
                    ? moment(
                        rightSidebarState.extraObject?.data?.medical_report
                          ?.back_on
                      ).format("YYYY-MM-DD")
                    : ""
                }
                type="date"
                name="back_on"
                placeholder="Date de reprise"
                containerStyle="mt-1"
                // inputStyle={errors("dob") ? "input-bordered input-error" : ""}
                labelTitle="Date de reprise"
                // disabled={isLocked()}
              />
            </div>
          </div>
          {/* <Show when={!readOnly()}> */}

          <button
            class="btn mt-2 btn-primary md:col-span-7 w-full"
            // (loading() ? " loading" : "")
          >
            Generer
          </button>
          {/* </Show> */}
        </div>
      </form>
      <Medical_certificate_pdf />
    </>
  );
};

export default GenerateMedicalCertificate;
