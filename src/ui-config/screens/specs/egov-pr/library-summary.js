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
import {localStorageGet} from "egov-ui-kit/utils/localStorageUtils";
import { documentsEventSummary,documentslibrarySummary,documentslibrarySummary1,documentslibrarySummary2,documentslibrarySummary3,documentslibrarySummary4,documentslibrarySummary5 } from "./summaryResource/documentsSummary";
import { librarysummaryFooter } from "./applyResource/librarysummaryFooter";
import { propertySummary } from "./summaryResource/propertySummary";
import { generateBill } from "../utils/index";
import { getTenantId ,geteventuuid} from "../../../../../../../packages/lib/egov-ui-kit/utils/localStorageUtils/index";
import {getSearchResultsView,getSearchResultsViewLibrary} from "../egov-pr/searchResource/citizenSearchFunctions";
import "./publishtender.css"
const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Library Details",
    labelKey: "PR_LIBRARY_DETAILS_HEADER"
  }),
  eventId: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pr",
    componentPath: "ApplicationNoContainer",
    props: {
      number: getQueryArg(window.location.href, "eventId")
    }

  },
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


const screenConfig = {
  uiFramework: "material-ui",
  name: "library-summary",
  beforeInitScreen: (action, state, dispatch) => {
  
    let payload={
      "requestBody":{
              "tenantId":getTenantId(),
              "eventDetailUuid": getQueryArg(window.location.href, "eventuuId") ,
              "scheduledStatus":"",
              "eventStatus":"PUBLISHED",
              "moduleCode": localStorageGet("modulecode"),
              
      }
      
            }
    getSearchResultsView(state, dispatch,payload)
    getSearchResultsViewLibrary(state, dispatch,payload)
    
    
// Hide edit buttons
set(
  action,
  "screenConfig.components.div.children.body.children.cardContent.children.documentsSummary.children.cardContent.children.header.children.editSection.visible",
  false
);
set(
  action,
  "screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.header.children.editSection.visible",
  false
);

set(
  action,
  "screenConfig.components.div.children.body.children.cardContent.children.documentslibrarySummary.children.cardContent.children.header.children.editSection.visible",
  false
);
set(
  action,
  "screenConfig.components.div.children.body.children.cardContent.children.documentslibrarySummary1.children.cardContent.children.header.children.editSection.visible",
  false
);
set(
  action,
  "screenConfig.components.div.children.body.children.cardContent.children.documentslibrarySummary2.children.cardContent.children.header.children.editSection.visible",
  false
);
set(
  action,
  "screenConfig.components.div.children.body.children.cardContent.children.documentslibrarySummary3.children.cardContent.children.header.children.editSection.visible",
  false
);
set(
  action,
  "screenConfig.components.div.children.body.children.cardContent.children.documentslibrarySummary4.children.cardContent.children.header.children.editSection.visible",
  false
);
set(
  action,
  "screenConfig.components.div.children.body.children.cardContent.children.documentslibrarySummary5.children.cardContent.children.header.children.editSection.visible",
  false
);
    
    prepareDocumentsView(state, dispatch);
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
         
        propertySummary: propertySummary,
         
           documentsSummary: documentsEventSummary,
           documentslibrarySummary:documentslibrarySummary,
           documentslibrarySummary1:documentslibrarySummary1,
           documentslibrarySummary2:documentslibrarySummary2,
           documentslibrarySummary3:documentslibrarySummary3,
           documentslibrarySummary4:documentslibrarySummary4,
           documentslibrarySummary5:documentslibrarySummary5
        }),
        librarysummaryFooter: librarysummaryFooter
      }
    }
  }
};

export default screenConfig;
