import { Show, createEffect, createResource, createSignal } from "solid-js";
import ElementViewer from "../../../components/ElementViewer/ElementViewer";
import { setConsultationsListDone } from "../../../data/mainStoreFunctions";
import axios from "axios";
import Filter from "../../../components/Filter/Filter";
import SuspenseContent from "../../../containers/SuspenseContent";

const fetchConsulationsDone = async () =>
  await axios.get(`http://localhost:9000/api/consultations/done`);

const [fetcherSignal, setFetcherSignal] = createSignal(1);

export const [consultationsDoneRessource, { mutate, refetch }] = createResource(
  fetcherSignal(),
  fetchConsulationsDone
);

const ManageConsultationsHistory = () => {
  createEffect(() => {
    if (!consultationsDoneRessource.loading) {
      setConsultationsListDone(consultationsDoneRessource().data.consultations);
      console.log(consultationsDoneRessource().data.consultations);
    }
  });

  return (
    <>
      <Show
        when={!consultationsDoneRessource.loading}
        fallback={<SuspenseContent />}
      >
        <div class="grid grid-cols-1 md:grid-cols-11 gap-x-4 gap-y-1 justify-items-start">
          <Show
            when={consultationsDoneRessource().data.consultations.length > 0}
            fallback={
              <div class="w-full col-span-11 text-center">
                Aucune information n'est disponible
              </div>
            }
          >
            <div class="md:col-span-8 w-full h-[35rem] overflow-auto">
              <ElementViewer
                data={consultationsDoneRessource().data.consultations}
              />
            </div>
            <div class="md:col-span-3 w-full shadow-md">
              <Filter />
            </div>
          </Show>
        </div>
      </Show>
    </>
  );
};

export default ManageConsultationsHistory;
