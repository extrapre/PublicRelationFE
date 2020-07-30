import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import MyApplicationIcon from "../../../../ui-atoms-local/Icons/MyApplicationIcon";
import TodayIcon from "../../../../ui-atoms-local/Icons/TodayIcon";
import LibraryIcon from "../../../../ui-atoms-local/Icons/LibraryIcon"
import { getRequiredDocData } from "../utils";
import get from "lodash/get";
import set from "lodash/set";
import { getRequiredDocuments } from "./requiredDocuments/reqDocs";
import { pbkdf2 } from "crypto";
import {
  getLocalization,
  getTenantId,
  localStorageGet,
  getUserInfo
,localStorageSet} from "egov-ui-kit/utils/localStorageUtils";
import { getQueryArg ,getFileUrlFromAPI} from "egov-ui-framework/ui-utils/commons";
import { checkForRole } from "../../../../ui-utils/commons";

const header = getCommonHeader(
  {
    labelName: "Other Services",
    labelKey: "PR_OTHER_SERVICES",
    
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
let cardItems=[]
if(checkForRole(JSON.parse(getUserInfo()).roles, 'DEPARTMENTUSER'))
{
const cardList = [
  
  
  {
    label: {
      labelName: "Create Tender Notice",
      labelKey: "PR_CREATE_TENDER_NOTICE"
    },
    icon: <i
    viewBox="0 -8 35 42"
    color="primary"
    font-size="40px"
    class="material-icons module-page-icon" style={{fontSize:"50px"}}>
   menu_book
  </i>,
    route: "tenderMaster"
  },
  {
    label: {
      labelName: "Tender Notice Lisr",
      labelKey: "PR_TENDER_NOTICE_LIST"
    },
    icon: <i
    viewBox="0 -8 35 42"
    color="primary"
    font-size="40px"
    class="material-icons module-page-icon" style={{fontSize:"50px"}}>
   description
  </i>,
    route: "TenderSearch"
  },
  
]
cardItems = cardList

}
else{
  const cardList = [
    
    
    {
      label: {
        labelName: "Generate Press Note",
        labelKey: "PR_GENERATE_PRESS_NOTE"
      },
      icon: <i
      viewBox="0 -8 35 42"
      color="primary"
      font-size="40px"
      class="material-icons module-page-icon" style={{fontSize:"50px"}}>
     menu_book
    </i>,
      route: "pressnotesHome"
    },
    {
      label: {
        labelName: "Publish Tender Notice",
        labelKey: "PR_PUBLISH_TENDER_NOTICE"
      },
      icon: <i
      viewBox="0 -8 35 42"
      color="primary"
      font-size="40px"
      class="material-icons module-page-icon" style={{fontSize:"50px"}}>
     description
    </i>,
      route: "TenderSearch"
    },
    
  ]

  cardItems = cardList;
  

}
const PRSCPSearchAndResult = {
  uiFramework: "material-ui",
  name: "home",
  beforeInitScreen: (action, state, dispatch) => {
    getRequiredDocData(action, state, dispatch).then(() => {
      let documents = get(
        state,
        "screenConfiguration.preparedFinalObject.searchScreenMdmsData.PublicRelation.Documents",
        []
      );
      set(
        action,
        "screenConfig.components.adhocDialog.children.popup",
        getRequiredDocuments(documents)
      );
    });
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

export default PRSCPSearchAndResult;
