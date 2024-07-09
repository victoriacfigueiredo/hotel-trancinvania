import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./app/home/pages/homepage";
import LoginClient from "./app/auth/pages/client/login";
import LoginHotelier from "./app/auth/pages/hotelier/login";
import { recoverPassword } from "./app/auth/pages/recoverPassword";

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
    path: "/recover-password",
    Component: recoverPassword,
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
