import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";

export const searchResults = {
  uiFramework: "custom-molecules",
  
  componentPath: "Table",
  visible: true,
  props: {
    
    columns: [
     
      {headerName: 'Make', field: 'make'},
        {headerName: 'Model', field: 'model'},
        {headerName: 'Price', field: 'price'}
    
    ],
  
  }
};



