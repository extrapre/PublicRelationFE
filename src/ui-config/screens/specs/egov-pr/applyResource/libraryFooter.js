
import {
  getLabel,
  dispatchMultipleFieldChangeAction
} from "egov-ui-framework/ui-config/screens/specs/utils";

import jp from "jsonpath";
import get from "lodash/get";
import set from "lodash/set";
import store from "redux/store";
import { httpRequest } from "../../../../../ui-utils/api";
import { getTenantId,  setapplicationNumber, localStorageGet} from "egov-ui-kit/utils/localStorageUtils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import {role } from "../../../../../ui-utils/commonConfig";
import {
  getButtonVisibility,
  getCommonApplyFooter
  } from "../../utils";
import "./index.css";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";

export const uploadlibraryDocument = async (state, dispatch) => {
  
  let response = '';
  let flag=false;
 
 
  let file1 = get(
    state.screenConfiguration.preparedFinalObject,
    "documentsUploadRedux[0].documents[0].fileStoreId"
    
  )
  let file2 = get(
    state.screenConfiguration.preparedFinalObject,
    "documentsUploadRedux[1].documents[0].fileStoreId"
    
  )
  let file3 = get(
    state.screenConfiguration.preparedFinalObject,
    "documentsUploadRedux[2].documents[0].fileStoreId"
    
  )
  let file4 = get(
    state.screenConfiguration.preparedFinalObject,
    "documentsUploadRedux[3].documents[0].fileStoreId"
    
  )
  let file5 = get(
    state.screenConfiguration.preparedFinalObject,
    "documentsUploadRedux[4].documents[0].fileStoreId"
    
  )
  let file6 = get(
    state.screenConfiguration.preparedFinalObject,
    "documentsUploadRedux[5].documents[0].fileStoreId"
    
  )
  if(file1 || file2 || file3 || file4 || file5 || file6)
  {
  flag=true;
  
  }
let pay=[]
if(file1)
{
  let data= {
    "documentType":"EVENT.COMMUNICATION_DOCUMENTS",
    "documentId":[
     {
      "fileStoreId":file1
     }
    ]
   }
pay.push(data)
}
if(file2)
{
  let data= {
    "documentType":"EVENT.PRESS_NOTES_DOCUMENTS",
    "documentId":[
     {
      "fileStoreId":file2
     }
    ]

   }
   pay.push(data)

}if(file3)
{
  let data= {
    "documentType":"EVENT.ADVERTISEMENTS_DOCUMENTS",
    "documentId":[
     {
      "fileStoreId":file3
     }
    ]
   }
   pay.push(data)

}if(file4)
{
  let data= {
    "documentType":"EVENT.NEWS_CLIPPINGS_DOCUMENTS",
    "documentId":[
     {
      "fileStoreId":file4
     }
    ]
   }
   pay.push(data)

}if(file5)
{
  let data= {
    "documentType":"EVENT.PHOTO_GALLERY_DOCUMENTS",
    "documentId":[
     {
      "fileStoreId":file5
     }
    ]
   }
   pay.push(data)

}
if(file6)
{
  let data= {
    "documentType":"EVENT.AUDIO_VISUALS_DOCUMENTS",
    "documentId":[
     {
      "fileStoreId":file6
     }
    ]
   }
   pay.push(data)

}


if(flag){
  try {
    let payload1 ;

    
  let data = {
  
      "tenantId":getTenantId(),
      "eventDetailUuid": getQueryArg(window.location.href, "eventuuId"),
      "documentList":pay,
      "modulecode" : localStorageGet("modulecode")
  };
   
    let reduxDocuments = get(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux", {});
    // Set owners & other documents
    let ownerDocuments = [];
    let otherDocuments = [];
    let Remarks = "";

    jp.query(reduxDocuments, "$.*").forEach(doc => {
      if (doc.documents && doc.documents.length > 0) {
        if (doc.documentCode === "EVENT.COMMUNICATION_DOCUMENTS") {
          ownerDocuments = [
            ...ownerDocuments,
            {
              //tenantId: 'ch',
              documentType: doc.documentSubCode ? doc.documentSubCode : doc.documentCode,
              fileStoreId: doc.documents[0].fileStoreId
            }
          ];
        } else if (!doc.documentSubCode) {
          // SKIP BUILDING PLAN DOCS
          otherDocuments = [
            ...otherDocuments,
            {
              //tenantId: 'ch',
              documentType: doc.documentCode,
              fileStoreId: doc.documents[0].fileStoreId
            }
          ];
        }
      }
    });

        response = await httpRequest("post", "/prscp-services/v1/library/_upload", "", [], { RequestBody: data });
      if (response.ResponseInfo.status==="Success" || response.ResponseInfo.status==="success") {


        
        dispatch(prepareFinalObject("documentsUploadRedux[0]", {}));
        dispatch(prepareFinalObject("documentsUploadRedux[1]", {}));
        dispatch(prepareFinalObject("documentsUploadRedux[2]", {}));
        dispatch(prepareFinalObject("documentsUploadRedux[3]", {}));
        dispatch(prepareFinalObject("documentsUploadRedux[4]", {}));
        dispatch(prepareFinalObject("documentsUploadRedux[5]", {}));
        
        dispatch(toggleSnackbar(true, { 
          labelName: "uPloaded successfully",
          labelKey:"PR_LIBRARY_SUCCESS_MSGE"
         }, "success"));

         setTimeout(
         
         function() {
          const eventuuId= getQueryArg(window.location.href, "eventuuId");
          const eventId= getQueryArg(window.location.href, "eventId");
          const tenantId= getQueryArg(window.location.href, "tenantId");
            const appendUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
            const reviewUrl = `${appendUrl}/egov-pr/library-summary?eventId=${eventId}&eventuuId=${eventuuId}&tenantId=${tenantId}`;
          dispatch(setRoute(reviewUrl));
          }
          .bind(this),
          3000
      );
         

        dispatch(prepareFinalObject("PRSCP", response));

      
        return { status: "success", message: response };
      } else {
        return { status: "fail", message: response };
      }
     
  } catch (error) {
    dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));

    // Revert the changed pfo in case of request failure
    let PublicRelationData = get(
      state,
      "screenConfiguration.preparedFinalObject.PRSCP",
      []
    );
    // PublicRelationData = furnishNocResponse({ PublicRelations: PublicRelationData });
    dispatch(prepareFinalObject("PRSCP", PublicRelationData));

    return { status: "failure", message: error };
  }
}
else{
  dispatch(
    toggleSnackbar(
    true,
    { labelName: "Please uplaod AtLeat one document!", labelKey: "PR_LIBRARY_MANDATORY" },
    "warning"
    )
    );
}
};

export const redirectfunction = async (state, dispatch) => {
  const appendUrl =
  process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  let reviewUrl = '';
 if(localStorageGet("modulecode") == "PR")
 {
   reviewUrl = `${appendUrl}/egov-pr/home?modulecode=PR`;
 }
 else
 {
   reviewUrl = `${appendUrl}/egov-pr/home-scp?modulecode=SCP`;
 }
 
      dispatch(setRoute(reviewUrl));
}

export const libraryFooter = getCommonApplyFooter({

  

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
    visible: true
  },
  uploadButton: {
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
        labelName: "UPLOAD",
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
      callBack: uploadlibraryDocument
    },
    visible:true
  } 
});


