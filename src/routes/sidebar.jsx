/** Icons are imported separatly to reduce build time */
import { IoGridOutline, IoSettingsOutline } from "solid-icons/io";
import { AiOutlineSchedule } from "solid-icons/ai";
import {
  RiEditorListUnordered,
  RiSystemListSettingsFill,
} from "solid-icons/ri";
import { FaSolidUserGear } from "solid-icons/fa";
import { BiRegularUserPlus } from "solid-icons/bi";

import { CgListTree } from "solid-icons/cg";
import { BsUiChecks } from "solid-icons/bs";
import { FaSolidUserDoctor } from "solid-icons/fa";
import { HiSolidClipboardList } from "solid-icons/hi";
import { VsHistory } from "solid-icons/vs";
import { BsHeartPulse } from "solid-icons/bs";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <IoGridOutline class={iconClasses} />,
    name: "Tableau de Bord",
  },
  {
    path: "/app/beneficiary",
    icon: <CgListTree class={submenuIconClasses} />,
    name: "Bénéficiaire",
  },
  {
    path: "/app/constants",
    icon: <BsUiChecks class={submenuIconClasses} />,
    name: "Constantes",
  },
  {
    path: "/app/exams",
    icon: <BsHeartPulse class={submenuIconClasses} />,
    name: "Examens",
  },
  {
    path: "", //no url needed as this has submenu
    icon: <FaSolidUserDoctor class={`${iconClasses} inline`} />, // icon component
    name: "Consultations", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/consultations/waiting", // url
        icon: <HiSolidClipboardList class={submenuIconClasses} />, // icon component
        name: "En attende", // name that appear in Sidebar
      },
      {
        path: "/app/consultations/done",
        icon: <VsHistory class={submenuIconClasses} />,
        name: "Consultations précédentes",
      },
    ],
  },
  {
    path: "", //no url needed as this has submenu
    icon: <IoSettingsOutline class={`${iconClasses} inline`} />, // icon component
    name: "Paramètres", // name that appear in Sidebar
    submenu: [
      {
        path: "/app/settings-profile", //url
        icon: <FaSolidUserGear class={submenuIconClasses} />, // icon component
        name: "Profil", // name that appear in Sidebar
      },
      {
        path: "/app/register",
        icon: <BiRegularUserPlus class={submenuIconClasses} />,
        name: "Creer un utilisateur",
      },
    ],
  },
];

export default routes;
