import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getTenantId ,localStorageGet,localStorageSet} from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../../../ui-utils";
import { tenderMasterCreate, tenderMSWordTemplate } from "./searchResource/tenderMaster"
import { tenderFooter } from "./applyResource/tenderFooter"
import { tenderDocumentDetails } from "./applyResource/tenderDocumentDetails";
import jp from "jsonpath";
import { getFileUrlFromAPI, getQueryArg } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import {  furnishResponseTender,getSearchResultsForTenderSummary,getSearchResultsForTenderSummary1 } from "../../../../ui-utils/commons";
import { prepareDocumentsUploadData } from "../../../../ui-utils/commons";
import "./publishtender.css";
import commonConfig from '../../../../config/common';

import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
const header = getCommonHeader({
  labelName: "Create Tender Notice",
  labelKey: "PR_CREATE_TENDER_NOTICE_HEADER"
});

export const prepareEditFlow = async (
  state,
  dispatch,
  tenderNoticeUuid,tenderNoticeId,
  tenantId
) => {


 if (tenderNoticeId) {

    let payload = {
      "RequestBody": {
        "tenantId": getTenantId(),
        "moduleCode": localStorageGet("modulecode"),
       
        "tenderNoticeUuid": getQueryArg(window.location.href, "tenderUuId"),
        "tenderNoticeId": getQueryArg(window.location.href, " "),
        "fileNumber":"",
        "tenderSubject":"",
        "tenderNoticeStatus":"",
        "fromDate":"",
        "toDate":"",
         "defaultGrid":true
        
      }
    }

    let response = await getSearchResultsForTenderSummary(payload);
    if (response.ResponseBody.length > 0) {
      let documentsPreview = [];
      
      let fileStoreIds1 = response.ResponseBody[0].tenderDocument
      documentsPreview.push({
      
      fileStoreId:fileStoreIds1[0].fileStoreId ,
      
      })
      
      let fileStoreIds = jp.query(documentsPreview, "$.*.fileStoreId");
      
      let fileUrls =
      fileStoreIds.length > 0 ? await getFileUrlFromAPI(fileStoreIds) : {};
      documentsPreview = documentsPreview.map(function (doc, index) {
      
      doc["fileUrl"] = fileUrls && fileUrls[doc.fileStoreId] && fileUrls[doc.fileStoreId].split(",")[0] || "";
      
      doc["fileName"] =
      (fileUrls[doc.fileStoreId] &&
      decodeURIComponent(
        fileUrls[doc.fileStoreId]
          .split(",")[0]
          .split("?")[0]
          .split("/")
          .pop()
          .slice(13)
      )) ||
      `Document - ${index + 1}`;
      
      return doc;
      });
      
        
      
    dispatch(prepareFinalObject("documentsUploadRedux[0].documents", documentsPreview));
      
      
      let Refurbishresponse = furnishResponseTender(response);
      dispatch(prepareFinalObject("tenderNotice", Refurbishresponse));
    }

   



  }
};

const getMdmsData = async (action, state, dispatch) => {
  let tenantId = commonConfig.tenantId;
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {
          moduleName: "RAINMAKER-PR",
          masterDetails: [{ name: "tenderDocuments" }]
        },
        {
          moduleName: "tenant",
          masterDetails: [{ name: "tenants" }]
        },
        {
          moduleName: "tenant",
          masterDetails: [{ name: "tenants" }]
        },
        {
          moduleName: "common-masters",
          masterDetails: [{ name: "Department" }]
        },
      ]
    }
  };
  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );

    dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
  } catch (e) {
    console.log(e);
  }
};

const tenderMaster = {
  uiFramework: "material-ui",
  name: "tenderMaster",
  beforeInitScreen: (action, state, dispatch) => {
    localStorageSet('tenderFilStore',"") 
    dispatch(prepareFinalObject("tenderNotice", {}));
    dispatch(prepareFinalObject("documentsUploadRedux[0]",{}));
    const tenantId = getTenantId()
    localStorageSet("tendernote", "");

    let tenderNoticeUuid= getQueryArg(window.location.href, "tenderuuId")
    let tenderNoticeId= getQueryArg(window.location.href, "tenderId")
    getMdmsData(action, state, dispatch).then(response => {
      
      prepareDocumentsUploadData(state, dispatch, "create_tender");
      prepareEditFlow(state, dispatch, tenderNoticeUuid,tenderNoticeId, tenantId);
    });
    
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "tenderMaster"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6
              },
              ...header
            },
          }
        },

        tenderMasterCreate,
        tenderMSWordTemplate,
        tenderDocumentDetails,
        tenderFooter
      }
    }
  }
};

export default tenderMaster;