import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import FireNocIcon from "../../../../ui-atoms-local/Icons/FireNocIcon";
import MyApplicationIcon from "../../../../ui-atoms-local/Icons/MyApplicationIcon";
import { getRequiredDocData } from "../utils";
import get from "lodash/get";
import set from "lodash/set";
import { getRequiredDocuments } from "./requiredDocuments/reqDocs";
import { pbkdf2 } from "crypto";

const header = getCommonHeader(
  {
    labelName: "Press Master",
    labelKey: "ACTION_TEST_PRESS_MATSER"
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
      labelKey: "Create_PRESS_MASTER",
      labelName: "Create PRESS MASTER"
    },
    icon: <FireNocIcon />,
    route: "pressDetailsMasterCreate"
  },
  {
    label: {
      labelKey: "PRESS_MASTER_LIST",
      labelName: "PRESS MASTER LIST"
    },
    icon: <MyApplicationIcon />,
    route: "my-applications-press"
  }
];

const PRSCPSearchAndResult = {
  uiFramework: "material-ui",
  name: "pressDetailsHome",
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
