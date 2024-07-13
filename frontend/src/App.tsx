import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import CreateReservation from "./app/reservation/pages/CreateReservation"
import PayReservation from "./app/reservation/pages/PayReservation"
import MyReservations from "./app/reservation/pages/MyReservations"
import SelectReservation from "./app/reservation/SelectReservation"
import EditReservation from "./app/reservation/pages/EditReservation"
import EditPay from "./app/reservation/pages/EditPay"

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
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
