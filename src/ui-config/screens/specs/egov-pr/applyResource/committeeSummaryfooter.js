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
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";



// export const deleteCommittee = async (state, dispatch) => {



//   deleteCommiteemaster()
// }




export const callBackForNext = async (state, dispatch) => {
   const acknowledgementUrl =
      process.env.REACT_APP_SELF_RUNNING === "true"
        ? `committeeMaster`
        : `committeeMaster`;
    dispatch(setRoute(acknowledgementUrl));

};


export const committeeSummaryfooter = getCommonApplyFooter({

  cancelButton: {
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
      nextButtonLabel: getLabel({
        labelName: "CANCEL",
        labelKey: "PR_COMMON_BUTTON_CANCEL"
      })
    },
 
    visible: true,
 
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    },
  },

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
        labelKey: "PR_COMMON_BUTTON_SUBMIT"
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


