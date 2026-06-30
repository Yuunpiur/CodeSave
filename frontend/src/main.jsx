import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CodePage from "./code-page";
import NotFound from "./not-found";
import Authpage from "./auth-page";
import Dashboard from "./dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    /* Route Component CodePage both for path / /:id because at the end of the day if the user has an existing source code or not, it should render the codepage page */
    path: "/",
    element: <CodePage />,
  },
  {
    path: "/:id",
    element: <CodePage />,
  },
  {
    path: "/login",
    element: <Authpage />,
  },
  {
    /* TODO: Add settings page */
    path: "/settings",
  },
  {
    /* It is possible to encounter /:id where id is undefined in the database, if it is the case then this component should be rendered */
    path: "/not-found",
    element: <NotFound />,
  },
  {
    path: "/library",
    element: <Library />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
