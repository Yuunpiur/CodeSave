import { dashboard } from "./utils/dashboard.js";

const Dashboard = () => {
  return (
    <>
      <button
        onClick={() => {
          dashboard(1);
        }}
      >
        Click Me!
      </button>
    </>
  );
};

export default Dashboard;
