import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import MyApplicationIcon from "../../../../ui-atoms-local/Icons/MyApplicationIcon";
import TodayIcon from "../../../../ui-atoms-local/Icons/TodayIcon";
import LibraryIcon from "../../../../ui-atoms-local/Icons/LibraryIcon"
import get from "lodash/get";
import set from "lodash/set";
import { getRequiredDocuments } from "./requiredDocuments/reqDocs";
import { pbkdf2 } from "crypto";

const header = getCommonHeader(
  {
    labelName: "Public Relation",
    labelKey: "PR_PUBLIC_RELATION"
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
      labelName: "Create Event",
      labelKey: "CREATE EVENT"
    },
    icon: <TodayIcon />,
    route: "apply"
  },
  {
    label: {
      labelName: "Manage Events",
      labelKey: "PR_MANAGE_EVENT"
    },
    icon: <MyApplicationIcon />,
    route: "search"
  },
  {
    label: {
      labelName: "Invite Guest",
      labelKey: "PR_INVITE_GUEST"
    },
    icon:<i
    viewBox="0 -8 35 42"
    color="primary"
    font-size="40px"
    class="material-icons module-page-icon">
   contactMail
  </i>,
    route: "committeeMaster"
  },
  {
    label: {
      labelKey: "Library",
      labelName: "LIBRARY"
    },
    icon: <LibraryIcon />,
    route: "committeeMaster"
  },

];

const PRSCPSearchAndResult = {
  uiFramework: "material-ui",
  name: "eventHome",
  beforeInitScreen: (action, state, dispatch) => {
   
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
