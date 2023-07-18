import React, { createContext, useContext, useState } from "react";
import { apiCall } from "../../api/functions";

export const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
  const [communityInfo, setCommunityInfo] = useState({});
  const [actions, setActions] = useState([]);
  const [events, setEvents] = useState([]);
  const [vendors, setVendors] = useState([]);

  const fetchInfo = (endpoint, args, setInfo, callBackFn=null) => {
    apiCall(endpoint, args).then((json) => {
      if (json.success) {
        setInfo({ ...json.data, community_id: community_id });
        if (callBackFn) callBackFn(json.data, null);
      } else {
        console.log(json);
        if (callBackFn) callBackFn(null, json.error);
      }
    });
  }

  const fetchCommunityInfo = async (community_id, callBackFn = null) => {
    await Promise.all([
      apiCall("communities.info", { community_id: community_id }).then((json) => {
        if (json.success) {
          setCommunityInfo({ ...json.data, community_id: community_id });
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("actions.list", { community_id: community_id }).then((json) => {
        if (json.success) {
          setActions(json.data);
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("events.list", { community_id: community_id }).then((json) => {
        if (json.success) {
          setEvents(json.data);
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("vendors.list", { community_id: community_id }).then((json) => {
        if (json.success) {
          setVendors(json.data);
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      })
    ]).then(() => {
      // console.log(actions)
      if (callBackFn) callBackFn();
    });
  };

  return (
    <CommunityContext.Provider value={{ communityInfo, actions, events, vendors, fetchCommunityInfo }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useUpcomingEvent = () => {
  const context = useContext(CommunityContext);

  if (context === undefined) {
    throw new Error("useUpcomingEvent must be used within a CommunityProvider");
  }

  const upcoming = context.events.filter((event) => {
    const eventDate = new Date(event.start_date_and_time);
    const now = new Date();
    return eventDate > now;
  });

  if (upcoming.length > 0) {
    return upcoming[0]
  }
  else {
    return null
  }
}