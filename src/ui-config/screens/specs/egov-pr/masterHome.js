import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import MyApplicationIcon from "../../../../ui-atoms-local/Icons/MyApplicationIcon";

import get from "lodash/get";
import set from "lodash/set";
import { getRequiredDocuments } from "./requiredDocuments/reqDocs";
import { pbkdf2 } from "crypto";
import { getQueryArg ,getFileUrlFromAPI} from "egov-ui-framework/ui-utils/commons";
import {  localStorageSet } from "egov-ui-kit/utils/localStorageUtils";


const header = getCommonHeader(
  {
    labelName: "Master",
    labelKey: "PR_MASTER_COMMITTEE"
  },
  {
    style: {
      padding: "20px",
    }
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);
const cardItems = [
  {
    label: {
      labelKey: "Committee",
      labelName: "Committee"
    },
    icon: <i
    viewBox="0 -8 35 42"
    color="primary"
    font-size="40px"
    class="material-icons module-page-icon" style={{fontSize:"50px"}}>
   forum
  </i>,
    route: "committeeMaster"
  },
  {
    label: {
      labelName: "Press Master",
      labelKey: "Press Master"
    },
    icon: <i
    viewBox="0 -8 35 42"
    color="primary"
    font-size="40px"
    class="material-icons module-page-icon" style={{fontSize:"50px"}}>
   menu_book
  </i>,
    route: "masterSubMenu"
  },
 

];
const PRSearchAndResult = {
  uiFramework: "material-ui",
  name: "libraryHome",
  beforeInitScreen: (action, state, dispatch) => {
   
    const modulecode = getQueryArg(
      window.location.href,
      "modulecode"
    );
  
    
	localStorageSet("modulecode",modulecode);
  
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applyCard: {
          uiFramework: "custom-molecules",
          componentPath: "LandingPage",
          props: {
            items: cardItems,
            history: {},
            module:"PR"  
          }
        },
       
      }
    },
   
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pr",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "home"
      },
      children: {
        popup: {}
      }
    }
  }
};


export default PRSearchAndResult;
