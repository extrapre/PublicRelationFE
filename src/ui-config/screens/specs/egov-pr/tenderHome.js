import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import MyApplicationIcon from "../../../../ui-atoms-local/Icons/MyApplicationIcon";
import { getRequiredDocData } from "../utils";
import get from "lodash/get";
import set from "lodash/set";
import { getRequiredDocuments } from "./requiredDocuments/reqDocs";

const header = getCommonHeader(
  {
    labelName: "Tender Notice",
    labelKey: "PR_TENDER_NOTICE"
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
      labelKey: "PR_CREATE_TENDER_NOTICE",
      labelName: "Create Tender Notice"
    },
    icon: <i
    viewBox="0 -8 35 42"
    color="primary"
    font-size="40px"
    class="material-icons module-page-icon" style={{fontSize:"50px"}}>
   description
  </i>,
    route: "tenderMaster"
  },
  
  
  {
    label: {
      labelKey: "PR_TENDER_NOTICE_LIST",
      labelName: "Tender Notice List"
    },
    icon: <MyApplicationIcon />,
    route: "tenderSearch"
  }
];

const PRSCPSearchAndResult = {
  uiFramework: "material-ui",
  name: "tenderHome",
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
