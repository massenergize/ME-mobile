import React, { createContext, useState, useEffect, useContext } from "react";
import { apiCall } from "../../api/functions";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  const fetchDashboardInfo = async (community_id, callBackFn=null) => {
    await Promise.all([
      apiCall("actions.list", { community_id: community_id }).then((json) => {
        if (json.success) {
          setTodoList(json.data);
          console.log("Actions Fetched")
        } else {
          console.log(json);
          if (callBackFn) callBackFn(null, json.error);
        }
      })
    ])
  }

  return (
    <DashboardContext.Provider value={{ todoList, fetchDashboardInfo }}>
      {children}
    </DashboardContext.Provider>
  );
};
