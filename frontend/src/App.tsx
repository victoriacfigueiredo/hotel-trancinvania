import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateReservation from "./app/reservation/pages/CreateReservation"
import MyReservations from "./app/reservation/pages/MyReservations"
import SelectReservation from "./app/reservation/pages/SelectReservation"
import EditReservation from "./app/reservation/pages/EditReservation"
import SeeReservation from "./app/reservation/pages/SeeReservation"
import { Promotion } from "./app/Promotion/pages";
import { PublishedReservation } from "./app/PublishedReservation/pages/Register";
import { AllPublishedReservation } from "./app/PublishedReservation/pages/Reservations";
import { ReservationDetails } from "./app/PublishedReservation/pages/ReservationDetails";
import { HomePage } from "./app/home/pages/homepage";
import LoginClient from "./app/auth/pages/client/login";
import LoginHotelier from "./app/auth/pages/hotelier/login";
import { PublishedReservationUpdate } from "./app/PublishedReservation/pages/Update";
import { AllPublishedReservationClient } from "./app/PublishedReservation/pages/ReservationsClients";



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
    path: "/create-reservation/:reservation_id",
    Component: CreateReservation,
  },
  {
    path: "/my-reservations",
    Component: MyReservations,
  },
  {
    path: "/select-reservation/:reservation_id",
    Component: SelectReservation,
  },
  {
    path: "/edit-reservation/:reserve_id",
    Component: EditReservation,
  },
  {
    path: "/see-reservation/:reserve_id",
    Component: SeeReservation,
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
  },
  {
    path: '/reservations',
    Component: AllPublishedReservationClient,
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
