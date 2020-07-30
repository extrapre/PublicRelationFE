import {
  dispatchMultipleFieldChangeAction,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import get from "lodash/get";
import { getCommonApplyFooter, validateFields, getTextToLocalMapping,validateFieldsForGenPress } from "../../utils";
import "./index.css";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils";
import {
  createUpdateNocApplication,
  prepareDocumentsUploadData
,publishTenderNotice,updatePressNote} from "../../../../../ui-utils/commons";

import { prepareFinalObject,  handleScreenConfigurationFieldChange as handleField  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import {  localStorageGet} from "egov-ui-kit/utils/localStorageUtils";
import store from "../../../../../ui-redux/store";
const state = store.getState();

const truncTime=(str, length, ending)=> {
  if (length == null) {
    length = 20;
  }
  if (ending == null) {
    ending = '...';
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

const setReviewPageRoute = (state, dispatch) => {
	             let id=getQueryArg(window.location.href, "eventuuId")            

	if(id){
		  let tenantId = getTenantId()
  const appendUrl =
    process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  const reviewUrl = `${appendUrl}/egov-pr/summary?eventuuId=${id}&tenantId=${tenantId}`;
  dispatch(setRoute(reviewUrl));
	}
	else{
	
	
  let tenantId = getTenantId()
  const eventId = get(
    state,
    "screenConfiguration.preparedFinalObject.EVENT.ResponseBody.eventId"
  );
 
  const eventuuId = get(
    state,
    "screenConfiguration.preparedFinalObject.EVENT.ResponseBody.eventDetailUuid"
  );
 
  const appendUrl =
    process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  const reviewUrl = `${appendUrl}/egov-pr/summary?eventId=${eventId}&eventuuId=${eventuuId}&tenantId=${tenantId}`;
  dispatch(setRoute(reviewUrl));
	}
};


const callBackForSubmit = async (state, dispatch) => {
  let validatestepformflag = validatestepform(3)
  let email=localStorageGet("email")
  let sms=get(state.screenConfiguration.preparedFinalObject, "tender.SMSContent")
  // validatestepformflag[0];

 let isFormValid =false
  isFormValid = validateFieldsForGenPress(
  "components.div.children.formwizardThirdStep.children.EmailSmsContent.children.cardContent.children",
  state,
  dispatch,
  "publishTender"
);
 if(isFormValid)
 {
  if(email!=="<p><br></p>" && (sms.length>0 && sms.length<=180))
  {
  if(get(state.screenConfiguration.preparedFinalObject, "tender.subjectemail") !==  undefined && get(state.screenConfiguration.preparedFinalObject, "tender.subjectemail") !==  "")
  {

    
  
  
  let pressdata= localStorageGet("PressTenderList") === null ? JSON.parse(localStorageGet("PressTenderListAll")) : JSON.parse(localStorageGet("PressTenderList"))
  let arr=[]
  
  for(let i=0;i<pressdata.length;i++)
  {
    let obj= {
      "pressMasterUuid":pressdata[i]['Press master UUID'],
    }
      arr.push(obj)
      }
  
      let payload={
      "RequestBody":{
       
         "tenantId": getTenantId(),
           "tenderNoticeId":getQueryArg(window.location.href, "tenderId"),
           "templateType":"TENDER_NOTICE",
           "smsContent":get(state.screenConfiguration.preparedFinalObject, "tender.SMSContent"),
           "emailContent":[
                 {
                  "emailSubject":get(state.screenConfiguration.preparedFinalObject, "tender.subjectemail"),
                  "emailBody":localStorageGet("email"),
                 }
            ],
        "publicationSize":get(state.screenConfiguration.preparedFinalObject, "tender.publicationsize"),
        "tenderNoticeUuid":getQueryArg(window.location.href, "tenderuuId"),
       "moduleCode":localStorageGet("modulecode"),
        "publicationList":arr,
        "tenderNoticeStatus":"PUBLISHED"
      }
      }
  
  publishTenderNotice(dispatch,payload);
  
  }
    else{
      dispatch(
        toggleSnackbar(
          true,
          { labelName: "Please fill subject field!", labelKey: "PR_SUBJECT_FIELD_MANDATORY" },
          "warning"
        )
      );
    }
  }
  else{
    dispatch(
      toggleSnackbar(
        true,
        { labelName: "Please fill all mandatory field!", labelKey: "PR_MANDATORY_FIELDS" },
        "warning"
      )
    );
  }
  }
  else{
    dispatch(
      toggleSnackbar(
        true,
        { labelName: "Please fill all mandatory field!", labelKey: "PR_MANDATORY_FIELDS" },
        "warning"
      )
    );
  }
  };
  


  const callBackForNext = async (state, dispatch) => {
   


    let activeStep = get(
      state.screenConfiguration.screenConfig["publishTender"],
      "components.div.children.stepper.props.activeStep",
      0
    );
   
    let errorMessage = '';
  
    let isFormValid = false;
     let hasFieldToaster = false;
  
    // let validatestepformflag = validatestepform(activeStep)
    
    //   isFormValid = validatestepformflag[0];
    //   hasFieldToaster = validatestepformflag[1];
     // screenConfiguration.screenConfig.publishTender.
   //  screenConfiguration.screenConfig.publishTender.
   debugger
    isFormValid = validateFields(
    "components.div.children.formwizardFirstStep.children.tenderDetails.children.cardContent.children.appStatusAndToFromDateContainer.children",
    state,
    dispatch,
    "publishTender"
  );
  if(localStorageGet("PressTenderList") === null && localStorageGet("PressTenderListAll")===null){
    hasFieldToaster = true;
  }
  else{
    hasFieldToaster = false;
  }
    if (activeStep === 0) {
      dispatch(
        handleField(
        "publishTender",
        "components.div.children.formwizardThirdStep.children.EmailSmsContent.children.cardContent.children.SMSContent",
        "props.value",
        localStorageGet("smsTemplate")
        )
        );
      let data1= localStorageGet("PressTenderList") === null ? JSON.parse(localStorageGet("PressTenderListAll")) : JSON.parse( localStorageGet("PressTenderList"))
      
      if( isFormValid === true && hasFieldToaster == false)
    {	
      let data1=localStorageGet("PressTenderList") === null ? JSON.parse(localStorageGet("PressTenderListAll")) : JSON.parse( localStorageGet("PressTenderList"))
      let data =data1.map(item => ({
  
        
        [getTextToLocalMapping("Publication Name")]:
        truncTime(item['Publication Name']) || "-",
        [ getTextToLocalMapping("Type of the Press")]:
        item['Type of the Press'] || "-",
        [ getTextToLocalMapping("Personnel Name")]:
        truncTime(item['Personnel Name'])|| "-",
        [ getTextToLocalMapping("Email Id")]:
        item['Email Id'] || "-",
        [getTextToLocalMapping("Mobile Number")]:
        item['Mobile Number'] || "-",
        [getTextToLocalMapping("Press master UUID")]:
        item['Press master UUID'] || "-",
      
        
       }));
  
       dispatch(
        handleField(
          "publishTender",
          "components.div.children.formwizardSecondStep.children.searchGridSecondstep",
          "props.data",
          data
        ));
    
    
    changeStep(state, dispatch, 'next', activeStep);
    }
    else
    {
      dispatch(
        toggleSnackbar(
          true,
          {   labelName: "Please fill all mandatory fields and select atleast one Press!",
  labelKey: "PR_ERR_FILL_ALL_PRESS_MANDATORY_FIELDS_TOAST" },
          "warning"
        )
      );
    }
   }
  
  
  
    if (activeStep !== 2) {
      
  
      if (isFormValid) {
        let responseStatus = "success";
        if (activeStep === 1) {
      
          
          
        } 
        
        if( isFormValid === true && hasFieldToaster == false)
        {	
      responseStatus === "success" && changeStep(state, dispatch);
        }
        else
        {
          dispatch(
            toggleSnackbar(
              true,
              {   labelName: "Please fill all mandatory fields and select atleast one Press!",
      labelKey: "PR_ERR_FILL_ALL_PRESS_MANDATORY_FIELDS_TOAST" },
              "warning"
            )
          );
        }
      } else if (hasFieldToaster) {
       
  
  
  
  
       if(get(state.screenConfiguration.preparedFinalObject, "tender.publicationsize")==="")
       {
        hasFieldToaster=true;
       }
       else if(localStorageGet("PressTenderList") === null && localStorageGet("PressTenderListAll")===null){
        isFormValid = false;
          hasFieldToaster = true;
        }
        switch (activeStep) {
          case 1:
            errorMessage = {
              labelName:
                "Please check the Missing/Invalid field, then proceed!",
               
              labelKey: "PR_ERR_FILL_ALL_MANDATORY_FIELDS_TOAST1"
            };
            break;
          case 2:
            errorMessage = {
              labelName:
                 "Please check the Missing/Invalid field, then proceed!",
              labelKey: "PR_ERR_FILL_ALL_MANDATORY_FIELDS_TOAST"
            };
            break;
            default:
            errorMessage = {
              labelName:
                 "Please check the Missing/Invalid field, then proceed!",
              labelKey: "PR_ERR_FILL_ALL_PRESS_MANDATORY_FIELDS_TOAST"
            };
            break;
        }
        dispatch(toggleSnackbar(true, errorMessage, "warning"));
       
      }
    }
  };
  


export const changeStep = (
  state,
  dispatch,
  mode = "next",
  defaultActiveStep = -1
) => {


  
  
  let activeStep = get(
    state.screenConfiguration.screenConfig["publishTender"],
    "components.div.children.stepper.props.activeStep",
    0
  );
 
  if (defaultActiveStep === -1) {
   
    activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
   
  } else {
    activeStep = defaultActiveStep;
  }

  dispatch(
    handleField(
    "publishTender",
    "components.div.children.formwizardThirdStep.children.EmailSmsContent.children.cardContent.children.SMSContent",
    "props.value",
    localStorageGet("smsTemplate")
    )
    );
    
  const isPreviousButtonVisible = activeStep ===1 ? true : false;

  const isNextButtonVisible = activeStep < 2 ? true : false;
  const isPayButtonVisible = activeStep === 2 ? true : false;
  const iscancleButtonVisible = activeStep === 2 ? true : false;
  const actionDefination = [
    {
      path: "components.div.children.stepper.props",
      property: "activeStep",
      value: activeStep
    },
    {
      path: "components.div.children.tenderApplyfooter.children.previousButton",
      property: "visible",
      value: isPreviousButtonVisible
    },
    {
      path: "components.div.children.tenderApplyfooter.children.nextButton",
      property: "visible",
      value: isNextButtonVisible
    },
    {
      path: "components.div.children.tenderApplyfooter.children.payButton",
      property: "visible",
      value: isPayButtonVisible
    },
    {
      path: "components.div.children.tenderApplyfooter.children.cancleButton",
      property: "visible",
      value: iscancleButtonVisible
    }
  ];
  dispatchMultipleFieldChangeAction("publishTender", actionDefination, dispatch);
  renderSteps(activeStep, dispatch);
};

export const renderSteps = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0:
      dispatchMultipleFieldChangeAction(
        "publishTender",
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case 1:
      dispatchMultipleFieldChangeAction(
        "publishTender",
        getActionDefinationForStepper(
          "components.div.children.formwizardSecondStep"
        ),
        dispatch
      );
      break;
    case 2:
      dispatchMultipleFieldChangeAction(
        "publishTender",
        getActionDefinationForStepper(
          "components.div.children.formwizardThirdStep"
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        "publishTender",
        getActionDefinationForStepper(
          "components.div.children.formwizardFourthStep"
        ),
        dispatch
      );
  }
};

export const getActionDefinationForStepper = path => {
  const actionDefination = [
    {
      path: "components.div.children.formwizardFirstStep",
      property: "visible",
      value: true
    },
    {
      path: "components.div.children.formwizardSecondStep",
      property: "visible",
      value: false
    },
    {
      path: "components.div.children.formwizardThirdStep",
      property: "visible",
      value: false
    },
    {
      path: "components.div.children.formwizardFourthStep",
      property: "visible",
      value: false
    }

  ];
  for (var i = 0; i < actionDefination.length; i++) {
    actionDefination[i] = {
      ...actionDefination[i],
      value: false
    };
    if (path === actionDefination[i].path) {
      actionDefination[i] = {
        ...actionDefination[i],
        value: true
      };
    }
  }
  return actionDefination;
};

export const callBackForPrevious = (state, dispatch) => {
  changeStep(state, dispatch, "previous");
};

export const redirectfunction = async (state, dispatch) => {
  const appendUrl =
  process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  const reviewUrl = `${appendUrl}/egov-pr/TenderSearch`;
      dispatch(setRoute(reviewUrl));
}

export const tenderApplyfooter = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
       // minWidth: "200px",
        height: "48px",
        marginRight: "16px" 
      }
    },
    children: {
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_left"
        }
      },
      previousButtonLabel: getLabel({
        labelName: "Previous Step",
        labelKey: "PR_COMMON_BUTTON_PREV_STEP"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious
    },
    visible: false
  },
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
       // minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "Next Step",
        labelKey: "PR_COMMON_BUTTON_NXT_STEP"
      }),
      nextButtonIcon: {
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
    }
  },
  cancleButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
       
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "UPLOAD",
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
      callBack: redirectfunction
    },
    visible: false
  },
  payButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        //minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "Submit",
        labelKey: "PR_COMMON_BUTTON_PUBLISH"
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
      callBack: callBackForSubmit
    },
visible:false
  }
});




export const validatestepform = (activeStep, isFormValid, hasFieldToaster) => {
 
  let allAreFilled = true;
  if (activeStep == 0) {
 
    activeStep+=1;
    document.getElementById("apply_form" + activeStep).querySelectorAll("[required]").forEach(function (i) {
   
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


  } 
  if (allAreFilled == false) {
	
    isFormValid = false;
    hasFieldToaster = true;
  }
  else if(localStorageGet("PressTenderList") === null && localStorageGet("PressTenderListAll")===null){
	isFormValid = false;
    hasFieldToaster = true;
  }
  else {
    isFormValid = true;
    hasFieldToaster = false;
  }
  return [isFormValid, hasFieldToaster]
};