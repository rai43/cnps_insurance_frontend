import { Show, createEffect } from "solid-js";
import logoCnps from "../../../assets/logoCnps.jpeg";
import { rightSidebarState } from "../../../data/rightSidebarState";
import moment from "moment";
import jsPDF from "jspdf";

const Medical_certificate_pdf = (props) => {
  let elementHTML;
  const onDownload = () => {
    console.log("download");
    const doc = new jsPDF();
    console.log("here");

    doc.html(elementHTML, {
      callback: function (doc) {
        // Save the PDF
        doc.save("medical-report.pdf");
      },
      x: 15,
      y: 15,
      width: 170, //target width in the PDF document
      windowWidth: 650, //window width in CSS pixels
    });
  };

  return (
    <>
      <div class="m-4 p-4 mt-6 card shadow-xl">
        <div ref={elementHTML}>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1 justify-center">
            <div class="">
              <img
                src={logoCnps}
                alt="Cnps logo"
                class="w-48 inline-block"
                style={{ "max-width": "10rem", "max-height": "10rem" }}
              />
            </div>
            <div class="col-span-2">
              <div class="grid grid-rows-2 grid-flow-col gap-4">
                <div class="justify-self-center">ENREGISTREMENT</div>
                <div class="text-xl font-semibold justify-self-center">
                  CERTIFICAT MEDICAL
                </div>
              </div>
            </div>
            <div>
              <div class="grid grid-rows-3 grid-flow-col gap-x-4">
                <div class="font-semibold">Réf. : EN-GRH-65</div>
                <div class="font-semibold">Version: 03</div>
                <div class="font-semibold">Page: 1/1</div>
              </div>
            </div>
          </div>
          <div class="m-5 p-3">
            <span>
              Je soussigné, Docteur en Médecine certifie que l'état de santé de:{" "}
            </span>
            <br />
            <span class="font-semibold">
              {rightSidebarState.extraObject.data.beneficiary.family_name +
                " " +
                rightSidebarState.extraObject.data.beneficiary.first_name}
            </span>
            <br />
            <br />
            <span class="font-bold">
              . Nécessite un traitement avec arrêt de travail{" "}
            </span>
            <br />
            <span class="font-semibold ml-4 text-primary">
              de {rightSidebarState.extraObject.data.medical_report.days_number}{" "}
              Jours
            </span>
            <br />
            <Show
              when={
                rightSidebarState.extraObject.data.medical_report
                  .stop_work_extended_from
              }
            >
              <span class="font-semibold ml-4">
                sauf complication à dater du{" "}
                {
                  rightSidebarState.extraObject.data.medical_report
                    .stop_work_extended_from
                }
              </span>
              <br />
            </Show>

            <Show
              when={
                rightSidebarState.extraObject.data.medical_report
                  .stop_work_extended_from
              }
            >
              <br />
              <br />
              <span class="font-bold">
                . Nécessite une prolongation d'arrêt de travail{" "}
              </span>
              <br />
              <span class="font-semibold ml-4 text-primary">
                de{" "}
                {
                  rightSidebarState.extraObject.data.medical_report
                    .stop_work_extended_from
                }{" "}
                Jours
              </span>
              <br />
            </Show>
            <Show
              when={
                rightSidebarState.extraObject.data.medical_report
                  .extention_extended_from
              }
            >
              <span class="font-semibold ml-4">
                sauf complication à dater du{" "}
                {
                  rightSidebarState.extraObject.data.medical_report
                    .extention_extended_from
                }
              </span>
              <br />
            </Show>

            <br />
            <br />
            <span class="font-bold">
              . Lui permettant de reprendre le travail à dater{" "}
            </span>
            <br />
            <span class="font-semibold ml-4 text-primary">
              du{" "}
              {moment(
                rightSidebarState.extraObject.data.medical_report.back_on
              ).format("DD/MM/YYYY")}
            </span>
          </div>
        </div>
      </div>
      <button class="btn btn-outline btn-primary" onClick={onDownload}>
        Télécharger
      </button>
    </>
  );
};

export default Medical_certificate_pdf;
