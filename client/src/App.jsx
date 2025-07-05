import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Predict } from "./pages/Predict";
import { Register } from "./pages/Register";
import { AppLayout } from "./components/layout/applayout";
import { ErrorPage } from "./pages/errorpage";
import { SymptomChecklist } from "./components/layout/SymptomChecklist";
import { Logout } from "./pages/logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/Predict",
        element: <Predict />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "predict/:id",
        element: <SymptomChecklist />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  );
};

export default App;
