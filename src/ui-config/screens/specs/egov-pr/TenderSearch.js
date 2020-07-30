import {
    getCommonHeader,
    getLabel,
    getBreak
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
  import { showHideAdhocPopup, resetFields, getRequiredDocData } from "../utils";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  import { pendingApprovals } from "./searchResource/pendingApprovals";
  import { publishTenderSearchResults } from "./searchResource/searchResults";
  import { setBusinessServiceDataToLocalStorage } from "egov-ui-framework/ui-utils/commons";
  import {
    getTenantId,
    localStorageGet
  } from "egov-ui-kit/utils/localStorageUtils";
  import find from "lodash/find";
  import set from "lodash/set";
  import get from "lodash/get";
  import {
    prepareFinalObject,
    handleScreenConfigurationFieldChange as handleField
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { getRequiredDocuments } from "./requiredDocuments/reqDocs";
  import { getGridDataPublishTender } from "./searchResource/citizenSearchFunctions";
  import { TenderFilter } from "./gridFilter/Filter";
  
  const hasButton = getQueryArg(window.location.href, "hasButton");
  let enableButton = true;
  enableButton = hasButton && hasButton === "false" ? false : true;
  
  const header = getCommonHeader({
    labelName: "Tender Notice Details",
    labelKey: "PR_TENDER_NOTICE_DETAILS"
  });
  
  const pageResetAndChange = (state, dispatch) => {
    dispatch(
      prepareFinalObject("PublicRelations", [{ "PublicRelationDetails.PublicRelationType": "NEW" }])
    );
    
  };
  
  const PRSearchAndResult = {
    uiFramework: "material-ui",
    name: "TenderSearch",
    beforeInitScreen: (action, state, dispatch) => {

      dispatch(prepareFinalObject("PublicRelation[0].filterEvent", {}));
      dispatch(prepareFinalObject("PublicRelation[0].filterInviteEvent", {}));
      dispatch(prepareFinalObject("PublicRelation[0].filterpress", {}));
     dispatch(prepareFinalObject("PublicRelation[0].filtertender", {}));
      dispatch(prepareFinalObject("PublicRelation[0].filterpressMaster", {}));
      dispatch(prepareFinalObject("PublicRelation[0].filterLibraryEvent", {}));
      dispatch(prepareFinalObject("TimeseriesReport", {}));
      dispatch(prepareFinalObject("LocalityReport", {}));
      dispatch(prepareFinalObject("eventReport", {}));
  
      getGridDataPublishTender(action, state, dispatch);
  
  
      const tenantId = getTenantId();
      const BSqueryObject = [
        { key: "tenantId", value: tenantId },
        { key: "businessServices", value: "PRSCP" }
      ];
     
      getRequiredDocData(action, state, dispatch).then(() => {
        let documents = get(
          state,
          "screenConfiguration.preparedFinalObject.searchScreenMdmsData.PublicRelation.Documents",
          []
        );
        set(
          action,
          "screenConfig.components.adhocDialog.children.popup",
          getRequiredDocuments(documents)
        );
      });
      return action;
	  
    },
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Form",
        props: {
          className: "common-div-css",
          id: "TenderSearch"
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
              }
            }
          
  
            
          },
        
          TenderFilter,
          breakAfterSearch: getBreak(),
          publishTenderSearchResults
        }
      },
      adhocDialog: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-pr",
        componentPath: "DialogContainer",
        props: {
          open: false,
          maxWidth: false,
          screenKey: "TenderSearch"
        },
        children: {
          popup: {}
        }
      }
    }
  };
  
  export default PRSearchAndResult;
  