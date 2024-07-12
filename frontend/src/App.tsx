import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Promotion } from "./app/Promotion/pages";
import { PublishedReservation } from "./app/PublishedReservation/pages/Register";
import { AllPublishedReservation } from "./app/PublishedReservation/pages/Reservations";
import { ReservationDetails } from "./app/PublishedReservation/pages/ReservationDetails";
import { HomePage } from "./app/home/pages/homepage";
import LoginClient from "./app/auth/pages/client/login";
import LoginHotelier from "./app/auth/pages/hotelier/login";
import { PublishedReservationUpdate } from "./app/PublishedReservation/pages/Update";

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
    /*{
    path: "/register/client",
    Component: ClientRegister,
  },*/
  /*{
    path: "/register/hotelier",
    Component: HotelierRegister,
  },*/
  {
    path: '/promotions/:reservation_id',
    Component: Promotion,
  },
  {
    path: '/promotions',
    Component: Promotion,
  },
  {
    path: '/publishedReservation',
    Component: PublishedReservation,
  },
  {
    path: '/publishedReservationList',
    Component: AllPublishedReservation,
  },
  {
    path: '/publishedReservationDetails/:reservation_id',
    Component: ReservationDetails,
  },
  {
    path: '/publishedReservationUpdate/:reservation_id',
    Component: PublishedReservationUpdate,
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
