import React, { createContext, useState, useEffect, useContext } from "react";
import _ from 'lodash'
import { apiCall } from "../../api/functions";

export const DashboardContext = createContext();

// export const useDashboardContext = () => {
//   return useContext(DashboardContext);
// };

export const DashboardProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [dashboardInfo, setDashboardInfo] = useState(null);
  const [householdsList, setHouseholdsList] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [userInfo, setUserInfo] = useState(0);
  const [infoLoaded, setInfoLoaded] = useState(0);

  const fetchDashboardInfo = async (email, callBackFn=null) => {
    await Promise.all([
      apiCall("users.info", { email: email}).then((json) => {
        if (json.success) {
          const newDashboardInfo = { ...json.data, email: email };
          if(!dashboardInfo || !_.isEqual(dashboardInfo, newDashboardInfo)) {
            setDashboardInfo({ ...json.data, email: email});
            setInfoLoaded(infoLoaded => infoLoaded + 1);
            console.log("User Info Fetched")
          }
        } else {
          console.log("User Info Failed");
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("users.actions.todo.list", { email: email}).then((json) => {
        if (json.success) {
          setTodoList(json.data);
          setInfoLoaded(infoLoaded => infoLoaded + 1);
          console.log("Todo List Fetched")
        } else {
          console.log("Action Todo List Failed");
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("users.actions.completed.list", { email: email}).then((json) => {
        if (json.success) {
          setCompletedList(json.data);
          setInfoLoaded(infoLoaded => infoLoaded + 1);
          console.log("Completed List Fetched")
        } else {
          console.log("Action Completed List Failed");
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("users.households.list", { email: email}).then((json) => {
        if (json.success) {
          setHouseholdsList(json.data);
          setInfoLoaded(infoLoaded => infoLoaded + 1);
          console.log("Households List Fetched")
        } else {
          console.log("Household List Failed");
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
      apiCall("users.events.list", { email: email}).then((json) => {
        if (json.success) {
          setEventsList(json.data);
          setInfoLoaded(infoLoaded => infoLoaded + 1);
          console.log("Events List Fetched")
        } else {
          console.log("Events List Failed");
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      }),
    ]).then(() => {
      setInfoLoaded(0);
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
        infoLoaded,
        fetchDashboardInfo }}>
      {children}
    </DashboardContext.Provider>
  );
};
