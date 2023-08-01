import React, { createContext, useContext, useEffect, useState } from "react";

import { apiCall } from "../../api/functions";

export const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
  const [communityInfo, setCommunityInfo] = useState(null);
  const [actions, setActions] = useState([]);
  const [events, setEvents] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [impactData, setImpactData] = useState(null);
  const [actionsCompleted, setActionsCompleted] = useState(null);
  const [about, setAbout] = useState(null);
  const [teams, setTeams] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(0);

  const fetchCommunityInfo = async (community_id, callBackFn = null) => {
    await Promise.all([
      apiCall("communities.info", { community_id: community_id }).then((json) => {
        if (json.success) {
          setCommunityInfo({ ...json.data, community_id: community_id });
          setInfoLoaded(infoLoaded => infoLoaded + 1);
          console.log("Community Info Fetched")
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("actions.list", { community_id: community_id }).then((json) => {
        if (json.success) {
          setActions(json.data);
          setInfoLoaded(infoLoaded => infoLoaded + 1);
          console.log("Actions Fetched")
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("events.list", { community_id: community_id }).then((json) => {
        if (json.success) {
          setEvents(json.data);
          setInfoLoaded(infoLoaded => infoLoaded + 1);
          console.log("Events Fetched")
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("vendors.list", { community_id: community_id }).then((json) => {
        if (json.success) {
          setVendors(json.data);
          setInfoLoaded(infoLoaded => infoLoaded + 1);
          console.log("Vendors Fetched")
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("testimonials.list", { community_id: community_id }).then((json) => {
        if (json.success) {
          setTestimonials(json.data);
          setInfoLoaded(infoLoaded => infoLoaded + 1);
          console.log("Testimonials Fetched")
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("graphs.actions.completed", { community_id: community_id }).then((json) => {
        if (json.success) {
          setImpactData(json.data);
          setInfoLoaded(infoLoaded => infoLoaded + 1);
          console.log("Graph Info Fetched")
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("communities.actions.completed", { community_id: community_id }).then((json) => {
        if (json.success) {
          setActionsCompleted(json.data);
          setInfoLoaded(infoLoaded => infoLoaded + 1);
          console.log("Actions List Fetched")
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("about_us_page_settings.info", { community_id: community_id }).then((json) => {
        if (json.success) {
          setAbout(json.data);
          setInfoLoaded(infoLoaded => infoLoaded + 1);
          console.log("About Fetched")
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("teams.stats", { community_id: community_id }).then((json) => {
        if (json.success) {
          setTeams(json.data);
          setInfoLoaded(infoLoaded => infoLoaded + 1);
          console.log("Teams Fetched")
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
    ]).then(() => {
      setInfoLoaded(0);
      if (callBackFn) callBackFn();
    });
    console.log("Community Fetched");
  };

  return (
    <CommunityContext.Provider
      value={{
        communityInfo,
        actions,
        events,
        vendors,
        testimonials,
        impactData,
        actionsCompleted,
        about,
        teams,
        infoLoaded,
        fetchCommunityInfo }}>
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

export const useDetails = (route, args) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching Details");
    apiCall(route, args).then((json) => {
      if (json.success) {
          setData(json.data);
      } else {
          console.log(json);
      }
      setIsLoading(false);
    });
  }, [])

  return [data, isLoading]
}