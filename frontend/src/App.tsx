import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./app/home/pages/homepage";
import LoginClient from "./app/auth/pages/client/login";
import LoginHotelier from "./app/auth/pages/hotelier/login";
import RecoverPasswordHotelier from "./app/auth/pages/hotelier/recover";
import RecoverPasswordClient from "./app/auth/pages/client/recover";
import ResetPasswordClient from "./app/auth/pages/client/reset";
import ResetPasswordHotelier from "./app/auth/pages/hotelier/reset";
import RegisterClient from "./app/auth/pages/client/register";
import EditProfileClient from "./app/auth/pages/client/profile";
import RegisterHotelier from "./app/auth/pages/hotelier/register";

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
    path: "/client/register",
    Component: RegisterClient,
  },
  {
    path: "client/profile/edit",
    Component: EditProfileClient,
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
  {
    path: "/hotelier/register",
    Component: RegisterHotelier,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
