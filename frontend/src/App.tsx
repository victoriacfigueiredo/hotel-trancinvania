import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./app/home/pages/homepage";
import LoginClient from "./app/auth/pages/client/login";
import LoginHotelier from "./app/auth/pages/hotelier/login";
import RecoverPasswordHotelier from "./app/auth/pages/recoverPassword/recoverHotelier";
import RecoverPasswordClient from "./app/auth/pages/recoverPassword/recoverClient";
import ResetPasswordClient from "./app/auth/pages/resetPassword/resetPClient";
import ResetPasswordHotelier from "./app/auth/pages/resetPassword/resetPHotelier";

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
    path: "client/password/recover",
    Component: RecoverPasswordClient,
  },
  {
    path: "client/password/reset",
    Component: ResetPasswordClient,
  },
  {
    path: "/hotelier/login",
    Component: LoginHotelier,
  },
  {
    path: "hotelier/password/recover",
    Component: RecoverPasswordHotelier,
  },
  {
    path: "hotelier/password/reset",
    Component: ResetPasswordHotelier,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
