import React, { createContext, useContext, useEffect, useState } from "react";

import _ from 'lodash'

import { apiCall } from "../../api/functions";
import { setAsyncStorageItem } from "../Shared/Utils";
import { LAST_VISITED_COMMUNITY_ID } from "../Constants";

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
          const newCommunityInfo = { ...json.data, community_id: community_id };
          if (!communityInfo || !_.isEqual(communityInfo, newCommunityInfo)) {
            setCommunityInfo({ ...json.data, community_id: community_id });
            setInfoLoaded(infoLoaded => infoLoaded + 1);
            console.log("Community Info Fetched")
          }
          setAsyncStorageItem(LAST_VISITED_COMMUNITY_ID, community_id.toString())
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("actions.list", { community_id: community_id }).then((json) => {
        if (json.success) {
          const newActions = json.data;
          if (!actions || !_.isEqual(actions, newActions)) {
            setActions(json.data);
            setInfoLoaded(infoLoaded => infoLoaded + 1);
            console.log("Actions Fetched")
          }
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("events.list", { community_id: community_id }).then((json) => {
        if (json.success) {
          const newEvents = json.data;
          if (!events || !_.isEqual(events, newEvents)) {
            setEvents(json.data);
            setInfoLoaded(infoLoaded => infoLoaded + 1);
            console.log("Events Fetched")
          }
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("vendors.list", { community_id: community_id }).then((json) => {
        if (json.success) {
          const newVendors = json.data;
          if (!vendors || !_.isEqual(vendors, newVendors)) {
            setVendors(json.data);
            setInfoLoaded(infoLoaded => infoLoaded + 1);
            console.log("Vendors Fetched")
          }
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("testimonials.list", { community_id: community_id }).then((json) => {
        if (json.success) {
          const newTestimonials = json.data;
          if (!testimonials || !_.isEqual(testimonials, newTestimonials)) {
            setTestimonials(json.data);
            setInfoLoaded(infoLoaded => infoLoaded + 1);
            console.log("Testimonials Fetched")
          }
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("graphs.actions.completed", { community_id: community_id }).then((json) => {
        if (json.success) {
          const newImpactData = json.data;
          if (!impactData || !_.isEqual(impactData, newImpactData)) {
            setImpactData(json.data);
            setInfoLoaded(infoLoaded => infoLoaded + 1);
            console.log("Graph Info Fetched")
          }
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("communities.actions.completed", { community_id: community_id }).then((json) => {
        if (json.success) {
          const newActionsCompleted = json.data;
          if (!actionsCompleted || !_.isEqual(actionsCompleted, newActionsCompleted)) {
            setActionsCompleted(json.data);
            setInfoLoaded(infoLoaded => infoLoaded + 1);
            console.log("Actions List Fetched")
          }
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("about_us_page_settings.info", { community_id: community_id }).then((json) => {
        if (json.success) {
          const newAbout = json.data;
          if (!about || !_.isEqual(about, newAbout)) {
            setAbout(json.data);
            setInfoLoaded(infoLoaded => infoLoaded + 1);
            console.log("About Fetched")
          }
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("teams.stats", { community_id: community_id }).then((json) => {
        if (json.success) {
          const newTeams = json.data;
          if (!teams || !_.isEqual(teams, newTeams)) {
            setTeams(json.data);
            setInfoLoaded(infoLoaded => infoLoaded + 1);
            console.log("Teams Fetched")
          }
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