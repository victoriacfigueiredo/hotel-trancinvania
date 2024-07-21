import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateReservation from "./app/reservation/pages/CreateReservation";
import PayReservation from "./app/reservation/pages/PayReservation";
import MyReservations from "./app/reservation/pages/MyReservations";
import SelectReservation from "./app/reservation/pages/SelectReservation";
import EditReservation from "./app/reservation/pages/EditReservation";
import EditPay from "./app/reservation/pages/EditPay";
import { Promotion } from "./app/Promotion/pages";
import { PublishedReservation } from "./app/PublishedReservation/pages/Register";
import { AllPublishedReservation } from "./app/PublishedReservation/pages/Reservations";
import { ReservationDetails } from "./app/PublishedReservation/pages/ReservationDetails";
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
import { PublishedReservationUpdate } from "./app/PublishedReservation/pages/Update";
import { AllPublishedReservationClient } from "./app/PublishedReservation/pages/ReservationsClients";
import { SearchPage } from "./app/search/pages/search";
import EditProfileHotelier from "./app/auth/pages/hotelier/profile";
import { AuthWrapper } from "./shared/components/auth-wrapper";
import NotFoundPage from "./app/home/pages/notfound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/client/login",
    Component: LoginClient,
  },
  {
    path: "/client/password/recover",
    Component: RecoverPasswordClient,
  },
  {
    path: "/client/password/reset",
    Component: ResetPasswordClient,
  },
  {
    path: "/client/register",
    Component: RegisterClient,
  },
  {
    path: "/client/profile/edit",
    element: (
      <AuthWrapper allowedUserTypes={["client"]}>
        <EditProfileClient />
      </AuthWrapper>
    ),
  },
  {
    path: "/hotelier/login",
    Component: LoginHotelier,
  },
  {
    path: "/hotelier/password/recover",
    Component: RecoverPasswordHotelier,
  },
  {
    path: "/hotelier/password/reset",
    Component: ResetPasswordHotelier,
  },
  {
    path: "/hotelier/register",
    Component: RegisterHotelier,
  },
  {
    path: "/hotelier/profile",
    element: (
      <AuthWrapper allowedUserTypes={["hotelier"]}>
        <EditProfileHotelier />
      </AuthWrapper>
    ),
  },
  {
    path: "/create-reservation",
    Component: CreateReservation,
  },
  {
    path: "/pay-reservation",
    Component: PayReservation,
  },
  {
    path: "/my-reservations",
    Component: MyReservations,
  },
  {
    path: "/select-reservation",
    Component: SelectReservation,
  },
  {
    path: "/edit-reservation",
    Component: EditReservation,
  },
  {
    path: "/edit-pay",
    Component: EditPay,
  },
  {
    path: "/search",
    Component: SearchPage,
  },
  {
    path: "/promotions/:reservation_id",
    Component: Promotion,
  },
  {
    path: "/promotions",
    Component: Promotion,
  },
  {
    path: "/publishedReservation",
    Component: PublishedReservation,
  },
  {
    path: "/publishedReservationList",
    Component: AllPublishedReservation,
  },
  {
    path: "/publishedReservationDetails/:reservation_id",
    Component: ReservationDetails,
  },
  {
    path: "/publishedReservationUpdate/:reservation_id",
    Component: PublishedReservationUpdate,
  },
  {
    path: "/reservations",
    Component: AllPublishedReservationClient,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
