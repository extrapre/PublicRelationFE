
import {
  getLabel,
  dispatchMultipleFieldChangeAction
} from "egov-ui-framework/ui-config/screens/specs/utils";


import {
 getQueryArg
 } from "egov-ui-framework/ui-utils/commons";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import {
  getButtonVisibility,
  getCommonApplyFooter
  } from "../../utils";
import "./index.css";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
 import {resendinvitationpress} from "../../egov-pr/searchResource/citizenSearchFunctions"
  

export const redirectpressnotehome = async (state, dispatch) => {
  const eventuuId= getQueryArg(window.location.href, "eventuuId");
  const appendUrl =
  process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  const reviewUrl = `${appendUrl}/egov-pr/pressnotesHome`;
      dispatch(setRoute(reviewUrl));
}

export const  pressnoteFooter = getCommonApplyFooter({

  
  resendbutton: {
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
        labelName: "RESEND PRESS NOTE",
        labelKey: "PR_RESEND_PRESSNOTE_BUTTON"
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
      callBack: resendinvitationpress
    },
    visible: true
  },
  cancleButton: {
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
        labelName: "cancle",
        labelKey: "PR_COMMON_BUTTON_CANCLE"
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
      callBack: redirectpressnotehome
    },
    visible: true
  },
  
});


