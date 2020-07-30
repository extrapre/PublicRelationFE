import {
    getCommonHeader,
    getLabel,
    getBreak
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { showHideAdhocPopup, resetFields, getRequiredDocData } from "../utils";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  import { pendingApprovals } from "./searchResource/pendingApprovals";
  import { committeeMasterGrid } from "./searchResource/committeeMasterGrid";
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
  import { getCommitieeGridData } from "./searchResource/citizenSearchFunctions";
  
  const hasButton = getQueryArg(window.location.href, "hasButton");
  let enableButton = true;
  enableButton = hasButton && hasButton === "false" ? false : true;
  
  const header = getCommonHeader({
    labelName: "Committee List",
    labelKey: "PR_COMMITTEE_LIST"
  });
  
 
  
  const NOCSearchAndResult = {
    uiFramework: "material-ui",
    name: "committeeGrid",
    beforeInitScreen: (action, state, dispatch) => {
      getCommitieeGridData(action, state, dispatch);
  
  
      const tenantId = getTenantId();
     
      
      return action;
    },
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Form",
        props: {
          className: "common-div-css",
          id: "committeeGrid"
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
        
          breakAfterSearch: getBreak(),
          
          committeeMasterGrid
        }
      },
      adhocDialog: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-pr",
        componentPath: "DialogContainer",
        props: {
          open: false,
          maxWidth: false,
          screenKey: "search"
        },
        children: {
          popup: {}
        }
      }
    }
  };
  
  export default NOCSearchAndResult;
  