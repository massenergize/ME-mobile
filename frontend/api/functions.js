import URLS from "./urls";

export async function apiCall(
    destinationUrl,
    dataToSend = {},
    // TODO: figure out what this is for.
    relocationPage = null
) {
    // TODO: add some meta data for context in backend
    dataToSend = {
        // __is_prod: IS_PROD || IS_CANARY,
        // ..._getCurrentCommunityContext(),
        ...dataToSend,
    };

    // make leading '/' optional
    if (destinationUrl.charAt(0) === "/") {
        destinationUrl = destinationUrl.substring(1);
    }

    // if (IS_LOCAL) {
    //     destinationUrl = "api/" + destinationUrl;
    //   }

    // const authToken = get_cookie(new Cookies(), "token"); // This is needed because in tests, cypress doesnt pass the token directly in the headers
    // const authTokenInLocalStorage = localStorage.getItem(AUTH_TOKEN); // This is also only used in test. Its a fallback method to retrieve token
    const formData = new FormData();

    Object.keys(dataToSend).map((k) => formData.append(k, dataToSend[k]));
    // if (authToken)
    //     formData.append("__token", authToken || authTokenInLocalStorage || null);

    const response = await fetch(`${URLS.ROOT}/${destinationUrl}`, {
        credentials: "include",
        method: "POST",
        body: formData,
    });
    try {
        const json = await response.json();
        // if (relocationPage && json && json.success) {
        //     window.location.href = relocationPage;
        // } else if (!json.success) {
        //     if (json.error === "session_expired") {
        //         window.location.href = window.location;
        //     } else {
        //         console.log(destinationUrl, json.error);
        //     }
        // }
        return json;
    } catch (error) {
        const errorText = error.toString();
        if (errorText.search("JSON") > -1) {
            const errorMessage =
                "Invalid response to " +
                destinationUrl +
                " Data: " +
                JSON.stringify(dataToSend);
            // this will send message to Sentry Slack channel
            // Sentry.captureMessage(errorMessage);
            return { success: false, error: errorMessage };
        } else {
            // Sentry.captureException(error);
            return { success: false, error: error.toString() };
        }
    }
}
