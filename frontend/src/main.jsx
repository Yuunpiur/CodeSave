import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CodePage from "./code-page";
import NotFound from "./not-found";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CodePage />,
  },
  {
    path: "/:id",
    element: <CodePage />,
  },
  {
    path: "/settings",
  },
  {
    path: "/not-found",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
