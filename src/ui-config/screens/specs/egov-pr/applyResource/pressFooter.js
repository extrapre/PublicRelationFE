import get from "lodash/get";
import set from "lodash/set";

import {
  getLabel,
  dispatchMultipleFieldChangeAction
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {  validateFields } from "../../utils";

import {


  
  getButtonVisibility,
  getCommonApplyFooter
  } from "../../utils";
import "./index.css";
import { createUpdateNocApplication,createPressmaster,updatePressmaster } from "../../../../../ui-utils/commons";
import { getTenantId } from "../../../../../../../../packages/lib/egov-ui-kit/utils/localStorageUtils/index";

import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  
   localStorageGet
 } from "egov-ui-kit/utils/localStorageUtils";
import {
  getQueryArg,
  getTransformedLocalStorgaeLabels,
  getLocaleLabels
} from "egov-ui-framework/ui-utils/commons";

const AddPresmaterData = (state, dispatch) => {

  

    let Ispresvalis = validateFields(
      "components.div.children.pressDetailsApplication.children.cardContent.children.appStatusAndToFromDateContainer.children",
      state,
      dispatch,
      'pressDetailsMasterCreate'
    );
  
    if(Ispresvalis)
    {
     let pressType=get(
        state.screenConfiguration.preparedFinalObject,
        "PRESSDETAILS.typeOfThePress"
      )
      
let pressid=getQueryArg(window.location.href, "presstId");
if(pressid){

  let payload={
    "RequestBody":{
    
      "tenantId":getTenantId(),
      "moduleCode": localStorageGet("modulecode"),
      "pressMasterUuid": pressid,
      "personnelName": get(
        state.screenConfiguration.preparedFinalObject,
        "PRESSDETAILS.name"
      )
,
      "pressType":pressType.label,
      "publicationName": get(
        state.screenConfiguration.preparedFinalObject,
        "PRESSDETAILS.publicationName"
      ),
      "email": get(
        state.screenConfiguration.preparedFinalObject,
        "PRESSDETAILS.emailId"
      ),
      "mobile": get(
        state.screenConfiguration.preparedFinalObject,
        "PRESSDETAILS.mobileNo"
      ),
      "isActive": true,
    }
    }
    

      updatePressmaster(dispatch,payload);
  
  }

else{
  let payload={
    "RequestBody":{
    
      "tenantId":getTenantId(),
      "moduleCode": localStorageGet("modulecode"),
      "pressMasterUuid": "",
      "personnelName": get(
        state.screenConfiguration.preparedFinalObject,
        "PRESSDETAILS.name"
      )
,
      "pressType":pressType.label,
      "publicationName": get(
        state.screenConfiguration.preparedFinalObject,
        "PRESSDETAILS.publicationName"
      ),
      "email": get(
        state.screenConfiguration.preparedFinalObject,
        "PRESSDETAILS.emailId"
      ),
      "mobile": get(
        state.screenConfiguration.preparedFinalObject,
        "PRESSDETAILS.mobileNo"
      ),
      "isActive": true,
    }
    }
    

      createPressmaster(state,dispatch,payload);
      
  }
}
else  {
  let errorMessage = {
    labelName: "Please fill all mandatory fields",
    labelKey: "PR_ERR_REQURIED_PRESS_TOAST"
  };
  dispatch(toggleSnackbar(true, errorMessage, "warning"));
}
}
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


export const pressFooter = getCommonApplyFooter({
 
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
        labelName: "Submit",
        labelKey: "PR_SUBMIT_BUTTON"
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
      callBack: AddPresmaterData
    },
    visible: true
  }
});


export const validatestepform = (activeStep, isFormValid, hasFieldToaster) => {
  
  activeStep=0
   let allAreFilled = true;
   if (activeStep == 0) {
     document.getElementById("pressDetailsMasterCreate").querySelectorAll("[required]").forEach(function (i) {
   
       if (!i.value) {
         i.focus();
         allAreFilled = false;
         i.parentNode.classList.add("MuiInput-error-853");
         i.parentNode.parentNode.classList.add("MuiFormLabel-error-844");
       }
       if (i.getAttribute("aria-invalid") === 'true' && allAreFilled) {
         i.parentNode.classList.add("MuiInput-error-853");
         i.parentNode.parentNode.classList.add("MuiFormLabel-error-844");
         allAreFilled = false;
         isFormValid = false;
         hasFieldToaster = true;
       }
     })
 
 
     document.getElementById("pressDetailsMasterCreate").querySelectorAll("input[type='hidden']").forEach(function (i) {
      
       if (i.value == i.placeholder) {
         i.focus();
         allAreFilled = false;
         i.parentNode.classList.add("MuiInput-error-853");
         i.parentNode.parentNode.parentNode.classList.add("MuiFormLabel-error-844");
         allAreFilled = false;
         isFormValid = false;
         hasFieldToaster = true;
       }
 
     })
   } 
   if (allAreFilled == false) {
  
     isFormValid = false;
     hasFieldToaster = true;
   }
   else {
     isFormValid = true;
     hasFieldToaster = false;
   }
   return [isFormValid, hasFieldToaster]
 }