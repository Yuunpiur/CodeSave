import { useEffect } from "react";
import { library } from "./utils/library.js";
import { useAccessToken } from "./auth-page.jsx";

const Library = () => {
  const accessToken = useAccessToken((state) => state.accessToken);
  const updateAccessToken = useAccessToken((state) => state.updateAccessToken);

  useEffect(() => {
    console.log(accessToken);
  }, [accessToken]);

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
        onClick={async () => {
          const newAccessToken = await library(accessToken);
          if (newAccessToken) {
            updateAccessToken(newAccessToken);
          }
        }}
      >
        Click Me!
      </button>
    </div>
  );
};

export default Library;
