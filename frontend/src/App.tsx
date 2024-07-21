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
import { Profile } from "./app/Profile";
import { Rate } from "./app/Rate/pages/myRates";
import { Whishlist } from "./app/Wishlist/pages/myWhishlist";
import LoginClient from "./app/auth/pages/client/login";
import LoginHotelier from "./app/auth/pages/hotelier/login";
import RecoverPasswordHotelier from "./app/auth/pages/hotelier/recover";
import RecoverPasswordClient from "./app/auth/pages/client/recover";
import ResetPasswordClient from "./app/auth/pages/client/reset";
import ResetPasswordHotelier from "./app/auth/pages/hotelier/reset";
import RegisterClient from "./app/auth/pages/client/register";
import EditProfileClient from "./app/auth/pages/client/profile";
import RegisterHotelier from "./app/auth/pages/hotelier/register";
import { PublishedReservationUpdate } from "./app/PublishedReservation/pages/Update";
import { AllPublishedReservationClient } from "./app/PublishedReservation/pages/ReservationsClients";
import { SearchPage } from "./app/search/pages/search";



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
  {
    path: "/client/profile",
    Component: Profile,
  },
  {
    path: "/client/profile/rate",
    Component: Rate,
  },
  {
    path: "/client/profile/whishlist",
    Component: Whishlist,
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
  {
    path: "/search",
    Component: SearchPage,
  },
  {
    path: '/promotions',
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
    path: '/hotelier-reservations',
    Component: AllPublishedReservation,
  },
  {
    path: '/reservationDetails',
    Component: ReservationDetails,
  },
  {
    path: '/reservationUpdate',
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
