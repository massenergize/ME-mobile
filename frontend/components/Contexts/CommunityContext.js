import React, { createContext, useEffect, useState } from "react";
import _ from 'lodash'

import { apiCall } from "../../api/functions";

export const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
  // state hooks for all of the community data
  const [communityInfo, setCommunityInfo] = useState(null);
  const [actions, setActions] = useState([]);
  const [events, setEvents] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [impactData, setImpactData] = useState(null);
  const [actionsCompleted, setActionsCompleted] = useState(null);
  const [about, setAbout] = useState(null);
  const [teams, setTeams] = useState(null);
  const [vendorsSettings, setVendorsSettings] = useState(null);
  const [testimonialsSettings, setTestimonialsSettings] = useState(null);
  const [teamsSettings, setTeamsSettings] = useState(null);
  const [homeSettings, setHomeSettings] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(0);

  // create a single promise that resolves when all the data is fetched
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
      apiCall("home_page_settings.info", { community_id: community_id }).then((json) => {
        if (json.success) {
          const newHomeSettings = json.data;
          if (!homeSettings || !_.isEqual(homeSettings, newHomeSettings)) {
            setHomeSettings(json.data);
            setInfoLoaded(infoLoaded => infoLoaded + 1);
            console.log("Home Page Settings Fetched")
          }
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("vendors_page_settings.info", { community_id: community_id }).then((json) => {
        if (json.success) {
          const newVendorsSettings = json.data;
          if (!vendorsSettings || !_.isEqual(vendorsSettings, newVendorsSettings)) {
            setVendorsSettings(json.data);
            setInfoLoaded(infoLoaded => infoLoaded + 1);
            console.log("Vendors Settings Fetched")
          }
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("testimonials_page_settings.info", { community_id: community_id }).then((json) => {
        if (json.success) {
          const newTestimonialsSettings = json.data;
          if (!testimonialsSettings || !_.isEqual(testimonialsSettings, newTestimonialsSettings)) {
            setTestimonialsSettings(json.data);
            setInfoLoaded(infoLoaded => infoLoaded + 1);
            console.log("Testimonials Settings Fetched")
          }
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("teams_page_settings.info", { community_id: community_id }).then((json) => {
        if (json.success) {
          const newTeamsSettings = json.data;
          if (!teamsSettings || !_.isEqual(teamsSettings, newTeamsSettings)) {
            setTeamsSettings(json.data);
            setInfoLoaded(infoLoaded => infoLoaded + 1);
            console.log("Teams Settings Fetched")
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
    console.log("Fetch Finished");
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
        vendorsSettings,
        testimonialsSettings,
        teamsSettings,
        homeSettings,
        infoLoaded,
        fetchCommunityInfo }}>
      {children}
    </CommunityContext.Provider>
  );
};

// custom hook to get information from a single API call, takes a route and any arguments
// often used for details pages (ie. actions, events, vendors, testimonials, teams)
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

  return [data, isLoading];
}