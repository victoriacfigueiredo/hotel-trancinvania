import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import { Promotion } from "./app/home/pages/Promotion";
import { PublishedReservation } from "./app/home/pages/PublishedReservation/Register";
import { AllPublishedReservation } from "./app/home/pages/PublishedReservation/Reservations";
import { ReservationDetails } from "./app/home/pages/PublishedReservation/ReservationDetails";

const router = createBrowserRouter([
  {
    path: "*",
    Component: CreateTest,
  },
  {
    path: "/create-test",
    Component: CreateTest,
  },
  {
    path: "/tests",
    Component: ListTests,
  },
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
