import { produce } from "solid-js/store";
import { appStore, setAppStore } from "./mainStore";
import { createEffect, createResource } from "solid-js";
import axios from "axios";

export const setPageTitle = (title) => {
  setAppStore(produce((state) => (state.pageTitle = title)));
};

export const setLoginInfo = (info) => {
  setAppStore(produce((state) => (state.userLoginInfo = info)));
  console.log(appStore);
};

export const setBeneficiariesList = (data) => {
  setAppStore(produce((state) => (state.beneficiariesList = data)));
  console.log("after beneficiaries list set");
  console.log(appStore);
};

export const setConstantsList = (data) => {
  setAppStore(produce((state) => (state.constantsList = data)));
  console.log("after constants list set");
  console.log(appStore);
};

export const setConsultationsList = (data) => {
  setAppStore(produce((state) => (state.consultationsList = data)));
  console.log("after consultation list set");
  console.log(appStore);
};

export const setConsultationsListDone = (data) => {
  setAppStore(produce((state) => (state.consultationsListDone = data)));
  console.log("after consultation done list set");
  console.log(appStore);
};

export const setExamsList = (data) => {
  setAppStore(produce((state) => (state.examsList = data)));
  console.log("after exams list set");
  console.log(appStore);
};
