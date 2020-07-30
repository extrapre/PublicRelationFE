import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import {
  sortByEpoch,
  getEpochForDate,
  getTextToLocalMapping
} from "../../utils";
import {
  getLocalization,
  getTenantId
} from "egov-ui-kit/utils/localStorageUtils";
import "./index.css";
import {
  getLocaleLabels,
  getTransformedLocalStorgaeLabels
} from "egov-ui-framework/ui-utils/commons";
const getLocalTextFromCode = localCode => {
  return JSON.parse(getLocalization("localization_en_IN")).find(
    item => item.code === localCode
  );
};


export const pressGrid = {
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
   data: [],
    columns: [
      
      {
        name: getTextToLocalMapping("Press Id"),
        options: {
          display: false,
          filter: false,
          display: "excluded",
        }
      },
      getTextToLocalMapping("Publication name"),
      getTextToLocalMapping("Type of the press"),
      getTextToLocalMapping("Personnel Name"),

      getTextToLocalMapping("Email Id"),
      getTextToLocalMapping("Mobile No"),
     
     
    ],
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      
      onRowClick: (row, index) => {
        onRowClick(row);
      }
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map(item => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};
const onRowClick = rowData => {
  const reviewUrl = `PressMasterSummary?presstId=${rowData[0]}&tenantId=`+getTenantId();
  
  
      window.location.href =reviewUrl;
     
  
};
