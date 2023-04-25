import { createSignal } from "solid-js";
import moment from "moment";
import toast from "solid-toast";
import axios from "axios";

import { INITIAL_CONSTANTS_OBJECT } from "../../../schemas/constantsSchema";
import {
  closeModal,
  modalState,
  setModalState,
} from "../../../data/modalState";
import InputText from "../../../components/Input/InputText";
import { createConsultationsForm } from "../../../schemas/consultationsSchema";
import { refetch } from "./ManageConsultations";
import { refetch as consultationHistoryRefetch } from "../../consultationsHistory/components/ManageConsultationsHistory";
import { refetch as constantRefetch } from "../../constants/components/ManageConstants";
import { VsHistory } from "solid-icons/vs";
import { TbReportSearch } from "solid-icons/tb";
import { FaSolidFileMedical } from "solid-icons/fa";
import { RiHealthHeartPulseLine } from "solid-icons/ri";
import { BsPostcardHeart } from "solid-icons/bs";
import { openRightSideBar } from "../../../data/rightSidebarState";
import { GLOBAL_CONSTANTS } from "../../../utils/globalConstantUtil";

const AddConsultationForm = (props) => {
  const [loading, setLoading] = createSignal(false);
  const [constantsObj, setConstantsObj] = createSignal(
    INITIAL_CONSTANTS_OBJECT
  );

  const saveConsultation = async (collectedJsonValues) => {
    const response = await axios.post(
      "http://localhost:9000/api/consultations",
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

  const submitForm = (values) => {
    setLoading(true);
    const collectedJsonValues = JSON.stringify({
      ...values,
      consulted_by:
        localStorage.getItem("userId") || appStore.userLoginInfo.userId,
    });

    toast.promise(saveConsultation(collectedJsonValues), {
      loading: "Enregistrement de la nouvelle consultation ...",
      success: (val) => {
        refetch();
        consultationHistoryRefetch();
        constantRefetch();
        closeModal();
        reset();
        setLoading(false);
        return <span>Consultation enregistrée</span>;
      },
      error: () => {
        setLoading(false);
        return (
          <span>
            Erreur lors de la création. Verifier les données et réessayer
          </span>
        );
      },
    });
  };

  const { form, data, reset, errors } = createConsultationsForm(submitForm);

  return (
    <>
      {/* <form use:form> */}
      <div class="mb-4">
        <div className="divider">CONSTANTES</div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1">
          <div>
            <InputText
              type="text"
              placeholder="Numéro de la Carte"
              defaultValue={
                modalState.extraObject?.data
                  ? modalState.extraObject.data.constant.card_number
                  : constantsObj().card_number
              }
              containerStyle="mt-1"
              labelTitle="Numéro de la Carte"
              disabled={true}
            />
          </div>
          <div>
            <InputText
              type="text"
              placeholder="Témperature"
              defaultValue={
                modalState.extraObject?.data
                  ? modalState.extraObject.data.constant.temperature
                  : constantsObj().temperature
              }
              containerStyle="mt-1"
              labelTitle="Témperature"
              disabled={true}
            />
          </div>
          <div>
            <InputText
              type="number"
              placeholder="Taille (cm)"
              defaultValue={
                modalState.extraObject?.data
                  ? modalState.extraObject.data.constant.height
                  : constantsObj().height
              }
              containerStyle="mt-1"
              labelTitle="Taille (cm)"
              disabled={true}
            />
          </div>
          <div>
            <InputText
              type="number"
              placeholder="Poids (cm)"
              defaultValue={
                modalState.extraObject?.data
                  ? modalState.extraObject.data.constant.weight
                  : constantsObj().weight
              }
              containerStyle="mt-1"
              labelTitle="Poids (cm)"
              disabled={true}
            />
          </div>
          <div>
            <InputText
              type="number"
              placeholder="Pouls (bpm)"
              defaultValue={
                modalState.extraObject?.data
                  ? modalState.extraObject.data.constant.pulse
                  : constantsObj().pulse
              }
              containerStyle="mt-1"
              labelTitle="Pouls (bpm)"
              disabled={true}
            />
          </div>
          <div>
            <InputText
              type="number"
              placeholder="Tension Arterielle"
              defaultValue={
                modalState.extraObject?.data
                  ? modalState.extraObject.data.constant.blood_pressure
                  : constantsObj().blood_pressure
              }
              containerStyle="mt-1"
              labelTitle="Tension Arterielle"
              disabled={true}
            />
          </div>
          <div class="md:col-span-3 h-full">
            <InputText
              type="text"
              placeholder="Autres remarques"
              defaultValue={
                modalState.extraObject?.data
                  ? modalState.extraObject.data.constant.other
                  : constantsObj().other
              }
              containerStyle="mt-1"
              labelTitle="Autres remarques"
              disabled={true}
            />
          </div>
        </div>
        <div className="divider">BÉNÉFICIAIRE</div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1">
          <div>
            <InputText
              type="text"
              placeholder="Nom"
              defaultValue={
                modalState.extraObject?.data &&
                modalState.extraObject.data.beneficiary.family_name
              }
              containerStyle="mt-1"
              labelTitle="Nom"
              disabled={true}
            />
          </div>
          <div>
            <InputText
              type="text"
              placeholder="Prénom(s)"
              defaultValue={
                modalState.extraObject?.data &&
                modalState.extraObject.data.beneficiary.first_name
              }
              containerStyle="mt-1"
              labelTitle="Prénom(s)"
              disabled={true}
            />
          </div>
          <div>
            <InputText
              type="text"
              placeholder="Date de naissance"
              defaultValue={
                modalState.extraObject?.data &&
                moment(modalState.extraObject.data.beneficiary.dob).format(
                  "DD-MM-YYYY"
                )
              }
              containerStyle="mt-1"
              labelTitle="Date de naissance"
              disabled={true}
            />
          </div>
        </div>
        <div className="divider">CONSULTATION</div>
        <form use:form>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1">
            <div class="md:col-span-3">
              <InputText
                type="text"
                name="sickness"
                placeholder="Pathologie"
                containerStyle="mt-1"
                inputStyle={
                  errors("sickness") ? "input-bordered input-error" : ""
                }
                labelTitle="Pathologie"
              />
            </div>
            <div class="md:col-span-3">
              <div class={`form-control w-full mt-1`}>
                <label className="label">
                  <span className="label-text">Commentaire</span>
                </label>
                <textarea
                  className={`textarea textarea-bordered h-24 ${
                    errors("comment") && "textarea-error"
                  }`}
                  placeholder="Commentaire"
                  name="comment"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="divider">ACTIONS</div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1">
            <button
              type="button"
              className="btn btn-primary btn-outline gap-2 mx-1"
              onClick={() =>
                openRightSideBar({
                  header: "HISTORIQUE",
                  bodyType:
                    GLOBAL_CONSTANTS.RIGHT_SIDE_DRAWER.BENEFICIARY_HISTORY,
                  extraObject: { ...modalState.extraObject },
                })
              }
            >
              <VsHistory />
              Historique
            </button>
            <button
              type="button"
              className="btn btn-primary btn-outline gap-2 mx-1"
              onClick={() =>
                openRightSideBar({
                  header: "EXAMENS",
                  bodyType: GLOBAL_CONSTANTS.RIGHT_SIDE_DRAWER.EXAMENS_NEW,
                  extraObject: { ...modalState.extraObject },
                })
              }
            >
              <TbReportSearch />
              Examens
            </button>
            <button
              type="button"
              className="btn btn-primary btn-outline gap-2 mx-1"
              onClick={() =>
                openRightSideBar({
                  header: "CERTIFICAT MEDICAL",
                  bodyType:
                    GLOBAL_CONSTANTS.RIGHT_SIDE_DRAWER.MEDICAL_CERTIFICAT_NEW,
                  extraObject: { ...modalState.extraObject },
                })
              }
            >
              <FaSolidFileMedical />
              Certificat Medical
            </button>
            <button className="btn btn-primary btn-outline gap-2 mx-1">
              <RiHealthHeartPulseLine />
              Acte Médical
            </button>
            <button className="btn btn-primary btn-outline gap-2 mx-1">
              <BsPostcardHeart />
              Ordonnance Interne
            </button>
            <button className="btn btn-accent btn-outline gap-2 mx-1">
              <BsPostcardHeart />
              Ordonnance Externe
            </button>
          </div>
          <div className="divider"></div>
          <button
            class={
              "btn mt-2 btn-primary md:col-span-7 w-full" +
              (loading() ? " loading" : "")
            }
          >
            Consulter
          </button>
        </form>
      </div>
    </>
  );
};

export default AddConsultationForm;
