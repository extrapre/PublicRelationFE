import {
  dispatchMultipleFieldChangeAction,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import get from "lodash/get";
import { getCommonApplyFooter, validateFields, validateFieldsForGenPress,getTextToLocalMapping } from "../../utils";
import "./index.css";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils";
import {
  createUpdateNocApplication,
  prepareDocumentsUploadData
,createPressNote,updatePressNote} from "../../../../../ui-utils/commons";

import { prepareFinalObject,  handleScreenConfigurationFieldChange as handleField  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "../../../../../../../../packages/lib/egov-ui-kit/utils/localStorageUtils/index";
import { localStorageGet} from "egov-ui-kit/utils/localStorageUtils";
import store from "../../../../../ui-redux/store";
import commonConfig from '../../../../../config/common';

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
//  let validatestepformflag = validatestepform(3)
  let email=localStorageGet("email")
//alert(isFormValid)
debugger
let isFormValid = validateFieldsForGenPress(
  "components.div.children.formwizardThirdStep.children.EmailSmsContent.children.cardContent.children",
  state,
  dispatch,
  "generatepressNote"
);
  let sms=get(state.screenConfiguration.preparedFinalObject, "pressnote.SMSContent")
// let isFormValid = validatestepformflag[0];
  //hasFieldToaster = validatestepformflag[1];
  if(isFormValid)
  {
if(email!=="<p><br></p>" && (sms.length>0 && sms.length<=180))
{
  let pressnoteuuId=getQueryArg(window.location.href, "pressnoteuuId");
  let pressdata=''
  
  if(pressnoteuuId){

  if( localStorageGet("PressNoteList")!== null){
		pressdata=JSON.parse(localStorageGet("PressNoteList"))
  }
  else{
	pressdata=JSON.parse(localStorageGet("PressNoteListAll"))
  
  }
 
  let arr=[]
  for(let i=0;i<pressdata.length;i++)
  {
  let obj= {
    "pressMasterUuid":pressdata[i]['Press master UUID'],  
  
  }
  arr.push(obj)
  }
  let pressnotedate=get(state.screenConfiguration.preparedFinalObject, "pressnote.date")
  pressnotedate=pressnotedate.split('-')

  let date= pressnotedate[2]+'/'+pressnotedate[1]+'/'+pressnotedate[0];
  let payload={
  "RequestBody":{

    "tenantId": getTenantId(),
    "pressNoteSubject":get(state.screenConfiguration.preparedFinalObject, "pressnote.pressSubject"),
    "pressNoteDate":date,
    "filenumber":get(state.screenConfiguration.preparedFinalObject, "pressnote.fileNumber"),
    // "noteContent":get(state.screenConfiguration.preparedFinalObject, "pressnote.pressnote"),
    "noteContent":localStorageGet("pressnote"),
    "smsContent":get(state.screenConfiguration.preparedFinalObject, "pressnote.SMSContent"),
    "emailContent":[ {
     "emailSubject":get(state.screenConfiguration.preparedFinalObject, "pressnote.subjectemail"),
     "emailBody":localStorageGet("email"),
        }],
    "moduleCode":localStorageGet("modulecode"),
    "templateType":"PRESS_RELEASE",
    "documentAttachment":[{"fileStoreId":get(state.screenConfiguration.preparedFinalObject, "documentsUploadRedux[0].documents[0].fileStoreId"),
    }],
   "moduleCode": localStorageGet("modulecode"),
  "publicationList":arr,
  "pressNoteUuid":get(state.screenConfiguration.preparedFinalObject, "pressnote.pressnote"),
  }
  }

 updatePressNote(dispatch,payload);
 
  }
  
  
  
  
  else{
    
    if(get(state.screenConfiguration.preparedFinalObject, "pressnote.subjectemail") !==  undefined && get(state.screenConfiguration.preparedFinalObject, "pressnote.subjectemail") !==  "")
    {
  
  
  let pressdata='';
  if(localStorageGet("PressNoteList")!== null){
		pressdata=JSON.parse(localStorageGet("PressNoteList"))
  }
  else{
	pressdata=JSON.parse(localStorageGet("PressNoteListAll"))
  
  }
  let arr=[]
  for(let i=0;i<pressdata.length;i++)
  {
    let obj= {
      "pressMasterUuid":pressdata[i]['Press master UUID'],
      
      
      }
      arr.push(obj)
      }
      let pressnotedate=get(state.screenConfiguration.preparedFinalObject, "pressnote.date")
      pressnotedate=pressnotedate.split('-')

     let date= pressnotedate[2]+'/'+pressnotedate[1]+'/'+pressnotedate[0];
      let payload={
      "RequestBody":{
    
        "tenantId": getTenantId(),
        "pressNoteSubject":get(state.screenConfiguration.preparedFinalObject, "pressnote.pressSubject"),
        "pressNoteDate":date,
        "filenumber":get(state.screenConfiguration.preparedFinalObject, "pressnote.fileNumber"),
        //"noteContent":get(state.screenConfiguration.preparedFinalObject, "pressnote.pressnote"),
        "noteContent":localStorageGet("pressnote"),
        "smsContent":get(state.screenConfiguration.preparedFinalObject, "pressnote.SMSContent"),
        "emailContent":[ {
         "emailSubject":get(state.screenConfiguration.preparedFinalObject, "pressnote.subjectemail"),
         "emailBody":localStorageGet("email"),
            }],
        "moduleCode":localStorageGet("modulecode"),
        "templateType":"PRESS_RELEASE",
        "documentAttachment":[{"fileStoreId":get(state.screenConfiguration.preparedFinalObject, "documentsUploadRedux[0].documents[0].fileStoreId"),
        }],
       "moduleCode": localStorageGet("modulecode"),
      "publicationList":arr
      }
      }
  createPressNote(dispatch,payload);
  
  }
  else{
    dispatch(
      toggleSnackbar(
        true,
        { labelName: "Please fill subject field!", labelKey: "PR_SUBJECT_FIELD_MANDATORY" },
        "warning"
      )
    );
  }}
}
else{
  dispatch(
    toggleSnackbar(
      true,
      { labelName: "Please fill all mandatory field!", labelKey: "PR_MANDATORY_FIELDS"

    },
      "warning"
    )
  );
}
}
else{
  dispatch(
    toggleSnackbar(
      true,
      { labelName: "Please fill all mandatory field!", labelKey: "PR_MANDATORY_FIELDS"

    },
      "warning"
    )
  );
}
  };
  
const moveToReview = (state, dispatch) => {
  
  const documentsFormat = Object.values(
    get(state.screenConfiguration.preparedFinalObject, "documentsUploadRedux")
  );

  let validateDocumentField = false;

  for (let i = 0; i < documentsFormat.length; i++) { 
    let isDocumentRequired = get(documentsFormat[i], "isDocumentRequired");
    let isDocumentTypeRequired = get(
      documentsFormat[i],
      "isDocumentTypeRequired"
    );

    let documents = get(documentsFormat[i], "documents");
    if (isDocumentRequired) {
      if (documents && documents.length > 0) {
        if (isDocumentTypeRequired) {
          if (get(documentsFormat[i], "dropdown.value")) {
            validateDocumentField = true;
          } else {
            dispatch(
              toggleSnackbar(
                true,
                { labelName: "Please select type of Document!", labelKey: "" },
                "warning"
              )
            );
            validateDocumentField = false;
            break;
          }
        } else {
          validateDocumentField = true;
        }
      } else {
        dispatch(
          toggleSnackbar(
            true,
            { labelName: "Please uplaod mandatory documents!", labelKey: "" },
            "warning"
          )
        );
        validateDocumentField = false;
        break;
      }
    } else {
      validateDocumentField = true;
    }
  }

  if (validateDocumentField) {
    setReviewPageRoute(state, dispatch);
  }
};

const getMdmsData = async (state, dispatch) => {
  
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        {
          moduleName: "RAINMAKER-PR",
          masterDetails: [{ name: "eventType" }, { name: "eventStatus" },{ name: "eventDocuments" }, { name: "eventSector" }]
        },
      ]
    }
  };
  try {
    let payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );

    dispatch(
      prepareFinalObject(
        "applyScreenMdmsData.PR.Documents",
        payload.MdmsRes.PR.Documents
      )
    );
    prepareDocumentsUploadData(state, dispatch);
  } catch (e) {
    console.log(e);
  }
};

const callBackForNext = async (state, dispatch) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["generatepressNote"],
    "components.div.children.stepper.props.activeStep",
    0
  );
 debugger
 
  let isFormValid = false;
  let hasFieldToaster = false;
  let isFirstCardValid = validateFields(
    "components.div.children.formwizardFirstStep.children.pressnotedetails.children.cardContent.children.appStatusAndToFromDateContainer.children",
    state,
    dispatch,
    "generatepressNote"
  );
  let isSecondCardValid = validateFields(
    "components.div.children.formwizardFirstStep.children.pressnotedata.children.cardContent.children.appStatusAndToFromDateContainer.children",
    state,
    dispatch,
    "generatepressNote"
  );
   isFormValid =isFirstCardValid & isSecondCardValid
  //  hasFieldToaster = validatestepformflag[1];
if(isFormValid===1)
{
  isFormValid=true
}
else if(isFormValid===0)
{
  isFormValid=false
}
  if (activeStep === 0) {
		 dispatch(
       handleField(
         "generatepressNote",
         "components.div.children.formwizardThirdStep.children.EmailSmsContent.children.cardContent.children.SMSContent",
         "props.value",
         localStorageGet("smsTemplate")
       )
     );
  
		let data1= localStorageGet("PressNoteList") === null ? JSON.parse( localStorageGet("PressNoteListAll")) : JSON.parse( localStorageGet("PressNoteList"))
		if(localStorageGet("PressNoteList")!=="[]")
    {
		if( isFormValid === true  && (localStorageGet("PressNoteList") !== null || localStorageGet("PressNoteListAll") !== null))
	{	
    
 
    

    let data1='';
    if(localStorageGet("PressNoteList")!== null){
      data1=JSON.parse(localStorageGet("PressNoteList"))
    }
    else{
      data1=JSON.parse(localStorageGet("PressNoteListAll"))
    
    }
		let data =data1.map(item => ({

      
      [getTextToLocalMapping("Publication Name")]:
      truncTime(item['Publication Name']) || "-",
      [ getTextToLocalMapping("Type of the Press")]:
      item['Type of the Press'] || "-",
      [ getTextToLocalMapping("Personnel Name")]:
      truncTime(item['Personnel Name']) || "-",
      [ getTextToLocalMapping("Email Id")]:
      item['Email Id'] || "-",
      [getTextToLocalMapping("Mobile Number")]:
      item['Mobile Number'] || "-",
      [getTextToLocalMapping("Press master UUID")]:
      item['Press master UUID'] || "-",
    
      
     }));

     dispatch(
      handleField(
        "generatepressNote",
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
else{
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
    if (get(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux.0.documents.0.fileStoreId", "")=="") {
      hasFieldToaster=true;
      isFormValid=false;
      } 

    if (isFormValid ) {
      let responseStatus = "success";
      if (activeStep === 1) {
        prepareDocumentsUploadData(state, dispatch, 'create_pressnote');
        
        
      } 
      
      responseStatus === "success" && changeStep(state, dispatch);
    } else if (hasFieldToaster) {
      let errorMessage = {
        labelName: "Please fill all mandatory fields and select atleast one Press!",
        labelKey: "PR_ERR_FILL_ALL_PRESS_MANDATORY_FIELDS_TOAST"
      };
      switch (activeStep) {
        case 1:
          errorMessage = {
             labelName: "Please fill all mandatory fields and select atleast one Press!",
        labelKey: "PR_ERR_FILL_ALL_PRESS_MANDATORY_FIELDS_TOAST"
          };
          break;
        case 2:
          errorMessage = {
            labelName:
               "Please check the Missing/Invalid field, then proceed!",
            labelKey: "PR_ERR_FILL_ALL_MANDATORY_FIELDS_TOAST"
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
    state.screenConfiguration.screenConfig["generatepressNote"],
    "components.div.children.stepper.props.activeStep",
    0
  );
 
  if (defaultActiveStep === -1) {
   
    activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
   
  } else {
    activeStep = defaultActiveStep;
  }

  const isPreviousButtonVisible = activeStep === 1 ? true : false;

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
      path: "components.div.children.pressapplyfooter.children.previousButton",
      property: "visible",
      value: isPreviousButtonVisible
    },
    {
      path: "components.div.children.pressapplyfooter.children.nextButton",
      property: "visible",
      value: isNextButtonVisible
    },
    {
      path: "components.div.children.pressapplyfooter.children.payButton",
      property: "visible",
      value: isPayButtonVisible
    },
    {
      path: "components.div.children.pressapplyfooter.children.cancleButton",
      property: "visible",
      value: iscancleButtonVisible
    }
  ];
  dispatchMultipleFieldChangeAction("generatepressNote", actionDefination, dispatch);
  renderSteps(activeStep, dispatch);
};

export const renderSteps = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0:
      dispatchMultipleFieldChangeAction(
        "generatepressNote",
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case 1:
      dispatchMultipleFieldChangeAction(
        "generatepressNote",
        getActionDefinationForStepper(
          "components.div.children.formwizardSecondStep"
        ),
        dispatch
      );
      break;
    case 2:
      dispatchMultipleFieldChangeAction(
        "generatepressNote",
        getActionDefinationForStepper(
          "components.div.children.formwizardThirdStep"
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        "generatepressNote",
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

export const redirectfunction = async (state, dispatch) => {
  const appendUrl =
  process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  const reviewUrl = `${appendUrl}/egov-pr/pressnotesHome`;
      dispatch(setRoute(reviewUrl));
}

export const callBackForPrevious = (state, dispatch) => {
  changeStep(state, dispatch, "previous");
};

export const pressapplyfooter = getCommonApplyFooter({
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
  visible:false

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
      callBack: callBackForSubmit
    },
visible:false
  },
 
});





export const validatestepform = (activeStep, isFormValid, hasFieldToaster) => {
  let allAreFilled = true;

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
  });

  document.getElementById("apply_form" + activeStep).querySelectorAll("input[type='hidden']").forEach(function (i) {
    if (i.value == i.placeholder) {
      i.focus();
      allAreFilled = false;
      i.parentNode.classList.add("MuiInput-error-853");
      i.parentNode.parentNode.parentNode.classList.add("MuiFormLabel-error-844");
      allAreFilled = false;
      isFormValid = false;
      hasFieldToaster = true;
    }
  });
  // 
  
  if(localStorageGet("PressNoteList")===null && localStorageGet("PressNoteListAll")===null)
	{    allAreFilled = false;
		allAreFilled = false;  
		isFormValid = false;
		hasFieldToaster = true;
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
}; 