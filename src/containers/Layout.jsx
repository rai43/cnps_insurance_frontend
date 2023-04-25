// import PageContent from "./PageContent"
import { Toaster } from "solid-toast";
// import { useSelector, useDispatch } from 'react-redux'
import RightSidebar from "./RightSidebar";
// import { useEffect } from "react"
// import  {  removeNotificationMessage } from "../features/common/headerSlice"
// import {NotificationContainer, NotificationManager} from 'react-notifications';
// import 'react-notifications/lib/notifications.css';
// import ModalLayout from "./ModalLayout"

// import { Show } from "solid-js";
import { modalState } from "../data/modalState";
import LeftSidebar from "./LeftSidebar";
import ModalLayout from "./ModalLayout";
import PageContent from "./PageContent";

const Layout = () => {
  // const dispatch = useDispatch()
  // const {newNotificationMessage, newNotificationStatus} = useSelector(state => state.header)

  // useEffect(() => {
  //     if(newNotificationMessage !== ""){
  //         if(newNotificationStatus === 1)NotificationManager.success(newNotificationMessage, 'Success')
  //         if(newNotificationStatus === 0)NotificationManager.error( newNotificationMessage, 'Error')
  //         dispatch(removeNotificationMessage())
  //     }
  // }, [newNotificationMessage])

  return (
    <>
      {/* Left drawer - containing page content and side bar (always open) */}
      <div class="drawer drawer-mobile">
        <input id="left-sidebar-drawer" type="checkbox" class="drawer-toggle" />
        <PageContent />
        <LeftSidebar />
      </div>

      {/* Right drawer - containing secondary content like notifications list etc.. */}
      <RightSidebar />

      {/** Notification layout container */}
      {/* <NotificationContainer /> */}

      {/* Modal layout container */}
      <Show when={modalState.isOpen}>
        <ModalLayout />
      </Show>
      <Toaster />
    </>
  );
};

export default Layout;
