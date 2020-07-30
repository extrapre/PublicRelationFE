import {
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getFileUrlFromAPI,
  getQueryArg,
  getTransformedLocale
} from "egov-ui-framework/ui-utils/commons";
import jp from "jsonpath";
import get from "lodash/get";
import set from "lodash/set";
import { documentsEventSummary } from "./summaryResource/documentsSummary";
import { footer,ApplySummaryfooter } from "./summaryResource/footer";
import { eventdetailsSummary } from "./summaryResource/eventdetailsSummary";
import {getSearchResultsView} from "../egov-pr/searchResource/citizenSearchFunctions"
import { localStorageGet } from "egov-ui-kit/utils/localStorageUtils";
import { getTenantId} from "egov-ui-kit/utils/localStorageUtils";
import {
  
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Manage Event",
    labelKey: "PR_MANAGE_EVENT_HEADER"
  }),
  eventId: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pr",
    componentPath: "ApplicationNoContainer",
    props: {
      number: getQueryArg(window.location.href, "eventId")
    }

  },
  status:getQueryArg(window.location.href, "eventstatus")==="CANCELLED"?getQueryArg(window.location.href, "status")==="null"?{}: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pr",
    componentPath: "StatusContainer",
    props: {
      number: "CANCELLED"
    }

  }:
   getQueryArg(window.location.href, "status")==="null"?{}: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pr",
    componentPath: "StatusContainer",
    props: {
      number: getQueryArg(window.location.href, "status")
    }

  }
  
});

const prepareDocumentsView = async (state, dispatch) => {
  
  let documentsPreview = [];
  let reduxDocuments = get(
    state,
    "screenConfiguration.preparedFinalObject.documentsUploadRedux",
    {}
  );
  jp.query(reduxDocuments, "$.*").forEach(doc => {
    if (doc.documents && doc.documents.length > 0) {
      documentsPreview.push({
        title: getTransformedLocale(doc.documentCode),
        name: doc.documents[0].fileName,
        fileStoreId: doc.documents[0].fileStoreId,
        linkText: "View"
      });
    }
  });
  let fileStoreIds = jp.query(documentsPreview, "$.*.fileStoreId");
  let fileUrls =
    fileStoreIds.length > 0 ? await getFileUrlFromAPI(fileStoreIds) : [];
  documentsPreview = documentsPreview.map(doc => {
    doc["link"] = fileUrls[doc.fileStoreId];
    return doc;
  });




        dispatch(prepareFinalObject("documentsPreview", documentsPreview));
    
}
const HideshowEdit = (action, Status, ) => {
  set(
    action,
    "screenConfig.components.div.children.footer.children.testButton.visible",
    Status === 'UPCOMING' ?  true  : false 
  );
  set(
    action,
    "screenConfig.components.div.children.footer.children.testButton.visible",
    Status === 'ONGOING' ?  true  : false 
  );
        
      
}
const setSearchResponse = async (state, action, dispatch, tenantId,payload) => {


  let response=await getSearchResultsView(state, dispatch,payload)
  

  dispatch(prepareFinalObject("EventSummary", get(response, "ResponseBody", [])));
  
  let Status = get(state, "screenConfiguration.preparedFinalObject.EventSummary[0].status", {});
  
  //


localStorageGet("shoWHideCancel")==="apply"?'':HideshowEdit(action, Status);



}  
const screenConfig = {
  uiFramework: "material-ui",
  name: "summary",
  beforeInitScreen: (action, state, dispatch) => {
  
  set(
    action,
    "screenConfig.components.div.children.body.children.cardContent.children.eventdetailsSummary.children.cardContent.children.header.children.editSection.visible",
    (getQueryArg(window.location.href, "status")==="EXPIRED" || getQueryArg(window.location.href, "eventstatus")==="CANCELLED" || getQueryArg(window.location.href, "status")==="ONGOING")===true ?false:true )

    
    set(
      action,
      "screenConfig.components.div.children.body.children.cardContent.children.documentsSummary.children.cardContent.children.header.children.editSection.visible",
      getQueryArg(window.location.href, "status")==="EXPIRED" || getQueryArg(window.location.href, "eventstatus")==="CANCELLED" || getQueryArg(window.location.href, "status")==="ONGOING" ?false:true )
    let payload={
      "requestBody":{
              "tenantId":getTenantId(),
              "eventDetailUuid":getQueryArg(window.location.href, "eventuuId")            ,
              "scheduledStatus":"",
              "eventStatus":getQueryArg(window.location.href, "eventstatus"),
              "moduleCode":localStorageGet("modulecode"),
              
      }
      
            }

  
   

    setSearchResponse(state, action, dispatch, getTenantId(),payload);
    
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              },
              ...header
            }
          }
        },
        body: getCommonCard({
         
          eventdetailsSummary: eventdetailsSummary,
         
           documentsSummary: documentsEventSummary
        }),
        footer: getQueryArg(window.location.href, "page")==="apply"?ApplySummaryfooter:footer
      }
    }
  }
};

export default screenConfig;
