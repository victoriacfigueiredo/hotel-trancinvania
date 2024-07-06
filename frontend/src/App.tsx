import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./app/home/pages/homepage";

const router = createBrowserRouter([
  {
    path: "*",
    Component: HomePage,
  },
  /*
  {
    path: "/login",
    Component: Login,
  },*/
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
