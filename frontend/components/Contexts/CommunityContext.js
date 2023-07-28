import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { apiCall } from "../../api/functions";

export const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
  const [communityInfo, setCommunityInfo] = useState({});

  const fetchCommunityInfo = (community_id, callBackFn = null) => {
    apiCall("communities.info", { community_id: community_id }).then((json) => {
      if (json.success) {
        setCommunityInfo({ ...json.data, community_id: community_id });
        AsyncStorage.setItem("@LastVisitedCommunityId", community_id.toString());
        if (callBackFn) callBackFn(json.data, null);
      } else {
        console.log(json);
        if (callBackFn) callBackFn(null, json.error);
      }
    });
  };

  return (
    <CommunityContext.Provider value={{ communityInfo, fetchCommunityInfo }}>
      {children}
    </CommunityContext.Provider>
  );
};
