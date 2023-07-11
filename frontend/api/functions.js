import URLS from "./urls";

/**
 * Handles making a POST request to the backend as a form submission
 * It also adds meta data for the BE to get context on the request coming in.
 * @param {String} destinationUrl url to send the request to
 * @param {Object} dataToSend data to be converted to form data and sent to the backend
 * @param {String} relocationPage page to redirect to if the request is successful
 * @returns
 */
export async function apiCall(
  destinationUrl,
  dataToSend = {},
  // TODO: figure out what this is for.
  relocationPage = null
) {
  // TODO: add some meta data for context in backend
  // dataToSend = {
  //     // __is_prod: IS_PROD || IS_CANARY,
  //     // ..._getCurrentCommunityContext(),
  //     ...dataToSend,
  // };

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

  console.log("Data to send", dataToSend);
  Object.keys(dataToSend).map((k) => formData.append(k, dataToSend[k]));
  formData.append("", "");

  // Object.keys(dataToSend).map((k) => formData.append(k, {...dataToSend[k], type: 'multipart/form-data'}));
  // if (authToken)
  //     formData.append("__token", authToken || authTokenInLocalStorage || null);

  // })
  // .catch(err => {
  //     console.log("error catch search:", err.message);
  //     fetching = false;
  //     // Choose one, depends what you need.
  //     return false; // If you want to ignore the error and do something in a chained .then()
  // })
  console.log(formData);

  try {
    console.log("URL", `${URLS.ROOT}/${destinationUrl}`);
    console.log("Form Data", formData, JSON.stringify(dataToSend));
    const response = await fetch(`${URLS.ROOT}/${destinationUrl}`, {
      credentials: "include",
      method: "POST",
      body: formData,
    });
    // const response = await sendXmlHttpRequest(`${URLS.ROOT}/${destinationUrl}`, formData);
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
