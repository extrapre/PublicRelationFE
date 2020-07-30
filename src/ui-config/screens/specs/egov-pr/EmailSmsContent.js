import React from "react";
import { getCommonContainer, getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import MyApplicationIcon from "../../../../ui-atoms-local/Icons/MyApplicationIcon";
import { getRequiredDocData } from "../utils";
import get from "lodash/get";
import set from "lodash/set";
import { getRequiredDocuments } from "./requiredDocuments/reqDocs";
import { pbkdf2 } from "crypto";

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "EMAIL SMS COntent", //later use getFinancialYearDates
    labelKey: "EMAIL_SMS_CONTENT"
  })
 
});


const PRSCPSearchAndResult = {
  uiFramework: "material-ui",
  name: "EmailSmsContent",
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
        
        richTextEditor: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-pr",
          componentPath: "RichTextEditor",
          props: {}
        }

       
      }
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
};

export default PRSCPSearchAndResult;
