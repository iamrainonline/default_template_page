import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
// pagini
import Homepage from "./pages/Homepage";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { div } from "framer-motion/client";

const Layout = () => (
  <>
    {/* <Navbar /> */}
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <div className="h-screen flex items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-red-500">
          Oops! Page not found.
        </h1>
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
