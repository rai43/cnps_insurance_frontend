import { createStore, produce } from "solid-js/store";

export const [appStore, setAppStore] = createStore({
  userLoginInfo: {},
  beneficiariesList: [],
  constantsList: [],
  consultationsList: [],
  consultationsListDone: [],
  examsList: [],
  pageTitle: "",
});
