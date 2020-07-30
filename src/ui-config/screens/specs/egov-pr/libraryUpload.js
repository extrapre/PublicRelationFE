import {
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getFileUrlFromAPI,

  getTransformedLocale,

} from "egov-ui-framework/ui-utils/commons";
import { libraryFooter } from "./applyResource/libraryFooter";
import { localStorageGet } from "egov-ui-kit/utils/localStorageUtils";

import jp from "jsonpath";
import get from "lodash/get";
import { documentDetails } from "./applyResource/documentDetails";
import set from "lodash/set";
import commonConfig from '../../../../config/common';

import { getTenantId, setapplicationType, lSRemoveItem, lSRemoveItemlocal, setapplicationNumber, getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../../../ui-utils";
import { useDebugValue } from "react";
export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: `UPLOAD LIBRARY`, //later use getFinancialYearDates
    labelKey: "PR_UPLOAD_LIBRARY"
  }),
 
});
export const prepareDocumentsUploadData = (state, dispatch, type) => {
  
  let documents = '';
  if (type == "doc") {
    documents = get(
      state,
      "screenConfiguration.preparedFinalObject.applyScreenMdmsData.RAINMAKER-PR.Documents",
      []
    );
  }
  

 
  else {
    documents = get(
      state,
      "screenConfiguration.preparedFinalObject.applyScreenMdmsData.RAINMAKER-PR.Documents",
      []
    );
  }
  documents = documents.filter(item => {
    return item.active;
  });
  let documentsContract = [];
  let tempDoc = {};
  documents.forEach(doc => {
    let card = {};
    card["code"] = doc.documentType;
    card["title"] = doc.documentType;
    card["cards"] = [];
    tempDoc[doc.documentType] = card;
  });

  documents.forEach(doc => {
    // Handle the case for multiple muildings
    if (doc.code === "COMMUNICATION_DOCUMENTS" && doc.hasMultipleRows && doc.options) {
      let buildingsData = get(state,
        "screenConfiguration.preparedFinalObject.PublicRelations[0].PublicRelationDetails.buildings",
        []
      );

      buildingsData.forEach(building => {
        let card = {};
        card["name"] = building.name;
        card["code"] = doc.code;
        card["title"] = doc.documentType;
        card["hasSubCards"] = true;
        card["subCards"] = [];
        doc.options.forEach(subDoc => {
          let subCard = {};
          subCard["name"] = subDoc.code;
          subCard["title"] = subDoc.documentType;
          subCard["required"] = subDoc.required ? true : false;
          card.subCards.push(subCard);
        });
        tempDoc[doc.documentType].cards.push(card);
      });
    }

    else {
      let card = {};
      card["name"] = doc.code;
      card["code"] = doc.code;
      card["title"] = doc.documentType;
      card["required"] = false;
      if (doc.hasDropdown && doc.dropdownData) {
        let dropdown = {};
        dropdown.label = "NOC_SELECT_DOC_DD_LABEL";
        dropdown.required = true;
        dropdown.menu = doc.dropdownData.filter(item => {
          return item.active;
        });
        dropdown.menu = dropdown.menu.map(item => {
          return { code: item.code, label: getTransformedLocale(item.code) };
        });
        card["dropdown"] = dropdown;
      }
      tempDoc[doc.documentType].cards.push(card);
    }
  });

  Object.keys(tempDoc).forEach(key => {
    documentsContract.push(tempDoc[key]);
  });

  dispatch(prepareFinalObject("documentsContract", documentsContract));
};
const getMdmsData = async (action, state, dispatch) => {
  let tenantId = commonConfig.tenantId;
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants"
            }
          ]
        },
      
        { moduleName: "RAINMAKER-PR", masterDetails: [{ name: "Documents" }] }
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

const screenConfig = {
  uiFramework: "material-ui",
  name: "libraryUpload",
  beforeInitScreen: (action, state, dispatch) => {
    set(state, "screenConfiguration.moduleName", localStorageGet("modulecode"));

    getMdmsData(action, state, dispatch).then(response => {
      dispatch(prepareFinalObject("libraryUpload", {}));


      // Set Documents Data (TEMP)
      prepareDocumentsUploadData(state, dispatch, 'doc');
    });
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
        documentDetails,
        libraryFooter
      }
    }
  }
};




export default screenConfig;
