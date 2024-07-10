import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Promotion } from "./app/Promotion/pages";
import { PublishedReservation } from "./app/PublishedReservation/pages/Register";
import { AllPublishedReservation } from "./app/PublishedReservation/pages/Reservations";
import { ReservationDetails } from "./app/PublishedReservation/pages/ReservationDetails";

const router = createBrowserRouter([
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
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
