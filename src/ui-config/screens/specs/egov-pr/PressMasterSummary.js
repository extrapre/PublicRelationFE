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

  import { presssummaryfooter } from './applyResource/presssummaryfooter'
  import { nocSummary } from "./summaryResource/nocSummary";
  import { propertySummary } from "./summaryResource/propertySummary";
  import { generateBill } from "../utils/index";
  import { getTenantId ,geteventuuid} from "../../../../../../../packages/lib/egov-ui-kit/utils/localStorageUtils/index";
  import {getPressMasterSearchResultsView} from "../egov-pr/searchResource/citizenSearchFunctions"
  import {localStorageGet } from "egov-ui-kit/utils/localStorageUtils";
  import {
    pressdetailsSummary  
  } from "./summaryResourcePressdetails/pressdetailsSummary";
  const header = getCommonContainer({
    header: getCommonHeader({
      labelName: "Manage Press",
      labelKey: "PR_MANAGE_PRESS_HEADER"
    }),
  
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
    name: "PressMasterSummary",
    beforeInitScreen: (action, state, dispatch) => {
   
      let payload={
        "RequestBody":{ 
            "tenantId":getTenantId(),
            "pressMasterUuid":getQueryArg(window.location.href, "presstId"),
            "moduleCode":localStorageGet("modulecode")
           }
        
              }
      getPressMasterSearchResultsView(state, dispatch,payload)
      let uomsObject = get(
        state.screenConfiguration.preparedFinalObject,
        "PublicRelations[0].PublicRelationDetails.buildings[0].uomsMap"
      );
      if (uomsObject) {
        for (const [key, value] of Object.entries(uomsObject)) {
          let labelElement = getLabelWithValue(
            {
              labelName: key,
              labelKey: `NOC_PROPERTY_DETAILS_${key}_LABEL`
            },
            {
              jsonPath: `PublicRelations[0].PublicRelationDetails.buildings[0].uomsMap.${key}`
            }
          );
          set(
            action,
            `screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.propertyContainer.children.${key}`,
            labelElement
          );
        }
      }
  
     
      if (
        get(
          state.screenConfiguration.preparedFinalObject,
          "PublicRelations[0].PublicRelationDetails.applicantDetails.ownerShipType",
          ""
        ).startsWith("INSTITUTION")
      ) {
        set(
          action,
          "screenConfig.components.div.children.body.children.cardContent.children.applicantSummary.visible",
          false
        );
      } else {
        set(
          action,
          "screenConfig.components.div.children.body.children.cardContent.children.institutionSummary.visible",
          false
        );
      }
  
    //  generateBill(dispatch, applicationNumber, tenantId);
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
           
            pressdetailsSummary: pressdetailsSummary,
            
          }),
          footer: presssummaryfooter
        }
      }
    }
  };
  
  export default screenConfig;
  