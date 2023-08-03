import React, { createContext, useState, useEffect, useContext } from "react";
import _ from 'lodash'
import { apiCall } from "../../api/functions";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [dashboardInfo, setDashboardInfo] = useState([]);
  const [householdsList, setHouseholdsList] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [userInfo, setUserInfo] = useState(0);

  const fetchDashboardInfo = async (community_id, callBackFn=null) => {
    await Promise.all([
      apiCall("users.info", { community_id: community_id}).then((json) => {
        if (json.success) {
          setDashboardInfo(json.data);
          console.log("User Info Fetched")
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("users.actions.todo.list", { community_id: community_id}).then((json) => {
        if (json.success) {
          setTodoList(json.data);
          console.log("Todo List Fetched")
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("users.actions.completed.list", { community_id: community_id}).then((json) => {
        if (json.success) {
          setCompletedList(json.data);
          console.log("Completed List Fetched")
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("users.actions.hosueholds.list", { community_id: community_id}).then((json) => {
        if (json.success) {
          setHouseholdsList(json.data);
          console.log("Households List Fetched")
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("users.actions.events.list", { community_id: community_id}).then((json) => {
        if (json.success) {
          setEventsList(json.data);
          console.log("Events List Fetched")
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
    ]).then(() => {
      setUserInfo(0);
      if (callBackFn) callBackFn();
    });
    console.log("Fetch finished");
  };

  return (
    <DashboardContext.Provider 
      value={{ 
        todoList,
        completedList,
        todoList,
        dashboardInfo,
        householdsList,
        eventsList,
        userInfo,
        fetchDashboardInfo }}>
      {children}
    </DashboardContext.Provider>
  );
};
