import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./app/home/pages/homepage";
import LoginClient from "./app/auth/pages/client/login";
import LoginHotelier from "./app/auth/pages/hotelier/login";
import { RecoverPassword } from "./app/auth/pages/recoverPassword";
import { ResetNewPassword } from "./app/auth/pages/resetPassword/reset_newPassword";
import { ResetToken } from "./app/auth/pages/resetPassword/reset_token";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/client/login",
    Component: LoginClient,
  },
  {
    path: "/hotelier/login",
    Component: LoginHotelier,
  },
  {
    path: "/password/recover",
    Component: RecoverPassword,
  },
  {
    path: "client/password/reset",
    Component: ResetNewPassword,
  },
  {
    path: "client/password/reset",
    Component: ResetNewPassword,
  },
  {
    path: "/password/token",
    Component: ResetToken,
  },

  /*{
    path: "/register/client",
    Component: ClientRegister,
  },*/
  /*{
    path: "/register/hotelier",
    Component: HotelierRegister,
  },*/
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
