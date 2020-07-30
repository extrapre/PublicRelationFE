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
import { applicantSummary } from "./summaryResource/applicantSummary";
import { institutionSummary } from "./summaryResource/applicantSummary";
import { documentsSummary } from "./summaryResource/documentsSummary";
import { invitedocumentsSummary } from "./summaryResource/invitedocumentsSummary";
import { footer, eventInviteFooter } from "./summaryResource/footer";
import { propertySummary } from "./summaryResource/eventSummary";


const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Invite Guests",
    labelKey: "INVITE_GUESTS_FOR_EVENT_HEADER"
  })
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
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "inviteEventSummary",
  beforeInitScreen: (action, state, dispatch) => {
    let applicationNumber =
      getQueryArg(window.location.href, "applicationNumber") ||
      get(
        state.screenConfiguration.preparedFinalObject,
        "PublicRelations[0].PublicRelationDetails.applicationNumber"
      );
    let tenantId =
      getQueryArg(window.location.href, "tenantId") ||
      get(
        state.screenConfiguration.preparedFinalObject,
        "PublicRelations[0].tenantId"
      );

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

    // Set Institution/Applicant info card visibility
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

	set(
        action,	"screenConfig.inviteEventSummary.components.div.children.body.children.cardContent.children.documentsSummary.children.cardContent.children.header.children.editSection.visible",
        false
      );
   
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
         
        documentsSummary: invitedocumentsSummary
        }),
        footer: eventInviteFooter
      }
    }
  }
};

export default screenConfig;
