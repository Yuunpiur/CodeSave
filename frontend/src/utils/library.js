export const getAllFolders = async (accessToken) => {
    try {
        let username = "";
        console.log(accessToken);
        if (accessToken) {
            const requestOptions = {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            };

            const decodedPayload = atob(accessToken.split(".")[1]);
            console.log("payload", decodedPayload);
            username = JSON.parse(decodedPayload).username;
            console.log(import.meta.env.VITE_BACKEND_URL);


            const fetchResponse = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}api/library/get-all-folders`,
                requestOptions
            );

            const allFolders = await fetchResponse.json();
            return allFolders;
        }


    } catch (error) {
        console.error(error);
    }
}; 