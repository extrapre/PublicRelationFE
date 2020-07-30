import get from "lodash/get";
import {
  getLabel,
  dispatchMultipleFieldChangeAction
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { applyTradeLicense } from "../../../../../ui-utils/commons";
import {
  getButtonVisibility,
  getCommonApplyFooter
  } from "../../utils";
import "./index.css";
import { createUpdateNocApplication } from "../../../../../ui-utils/commons";

export const callBackForNext = async (state, dispatch) => {
  let response = await createUpdateNocApplication(state, dispatch, "pressdetails_summary");
  if (get(response, "status", "") === "success") {
     const acknowledgementUrl =
      process.env.REACT_APP_SELF_RUNNING === "true"
        ? `/egov-ui-framework/pressdetails_summary/acknowledgement?purpose=pressdetails_summary&status=success&applicationNumber=${applicationNumber}&tenantId=${tenantId}`
        : `/pressGrid/acknowledgement?purpose=pressdetails_summary&status=success&applicationNumber=${applicationNumber}&tenantId=${tenantId}`;
    dispatch(setRoute(acknowledgementUrl));
  }
 
};


export const committeeMasterFooter = getCommonApplyFooter({
  payButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "SUBMIT",
        labelKey: "TL_COMMON_BUTTON_SUBMIT"
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    },
    visible: true
  }
});


