import { useEffect } from "react";
import { dashboard } from "./utils/dashboard.js";
import { useAccessToken } from "./auth-page.jsx";

const Dashboard = () => {
  const accessToken = useAccessToken((state) => state.accessToken);
  const updateAccessToken = useAccessToken((state) => state.updateAccessToken);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        zIndex: 9999,
        color: "white",
      }}
    >
      <h1>Token: {}</h1>
      <button
        onClick={() => {
          dashboard(accessToken);
        }}
      >
        Click Me!
      </button>
    </div>
  );
};

export default Dashboard;
