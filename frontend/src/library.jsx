import { useEffect } from "react";
import { library } from "./utils/library.js";
import { useAccessToken } from "./auth-page.jsx";

const Library = () => {
  const accessToken = useAccessToken((state) => state.accessToken);
  const updateAccessToken = useAccessToken((state) => state.updateAccessToken);

  useEffect(() => {
    console.log(accessToken);
  }, [accessToken]);

  return <div className="parent-container bg-[#FFFFFF]"></div>;
};

export default Library;
