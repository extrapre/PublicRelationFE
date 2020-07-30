import {
    getCommonHeader,
    getLabel,
    getBreak
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { httpRequest } from "../../../../ui-utils";
  
  import { showHideAdhocPopup, resetFields, getRequiredDocData } from "../utils";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  import { pendingApprovals } from "./searchResource/pendingApprovals";
  import { searchResults } from "./searchResource/searchResults";
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
  
  import { LocalityWiseReport } from "./searchResource/Report";
  import { LocalityReportSearchResults } from "./searchResource/searchResults";
  import {  localStorageSet } from "egov-ui-kit/utils/localStorageUtils";
  import commonConfig from '../../../../config/common';
  
  const hasButton = getQueryArg(window.location.href, "hasButton");
  let enableButton = true;
  enableButton = hasButton && hasButton === "false" ? false : true;
  
  const header = getCommonHeader({
    labelName: " Locality Wise Report",
    labelKey: "PR_LOCALITY_WISE_REPORT"
  });
  
  const pageResetAndChange = (state, dispatch) => {
    dispatch(
      prepareFinalObject("PublicRelations", [{ "PublicRelationDetails.PublicRelationType": "NEW" }])
    );
    
  };
  const getMdmsData = async (action, state, dispatch) => {
    
    let tenantId =commonConfig.tenantId;
     
  
    let mdmsBody = {
      MdmsCriteria: {
        tenantId: tenantId,
        moduleDetails: [
          {
            moduleName: "RAINMAKER-PR",
            masterDetails: [{ name: "eventStatus" },{ name: "localityAreaName" }, { name: "eventScheduledStatus" }]
          },
    
  
          {
            moduleName: "tenant",
            masterDetails: [
              {
                name: "tenants"
              }
            ]
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
    
 let obj={}
 obj['name']="ALL"
 obj['code']="ALL"
 
  
 let obj1={}
 obj1['name']="Select Locality Name"
 
  let len=payload.MdmsRes["RAINMAKER-PR"].localityAreaName.length
  payload.MdmsRes["RAINMAKER-PR"].localityAreaName.unshift(obj)
  payload.MdmsRes["RAINMAKER-PR"].localityAreaName.push(obj1)
      dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
    } catch (e) {
      console.log(e);
    }
  };
  const NOCSearchAndResult = {
    uiFramework: "material-ui",
    name: "LocalityReports",
    beforeInitScreen: (action, state, dispatch) => {
      dispatch(prepareFinalObject("LocalityReport", {}));    
      
      dispatch(prepareFinalObject("eventReport", {}));
      dispatch(prepareFinalObject("TimeseriesReport", {}));
      dispatch(prepareFinalObject("PublicRelation[0].filterEvent", {}));
      dispatch(prepareFinalObject("PublicRelation[0].filterInviteEvent", {}));
      dispatch(prepareFinalObject("PublicRelation[0].filterpress", {}));
      dispatch(prepareFinalObject("PublicRelation[0].filtertender", {}));
      dispatch(prepareFinalObject("PublicRelation[0].filterpressMaster", {}));
      dispatch(prepareFinalObject("PublicRelation[0].filterLibraryEvent", {}));
 
  
  
      const tenantId = getTenantId();
  
      getMdmsData(action, state, dispatch)
  
      
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
      const modulecode = getQueryArg(
        window.location.href,
        "modulecode"
      );
    
      
    localStorageSet("modulecode",modulecode);
    
      return action;
    },
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Form",
        props: {
          className: "common-div-css",
         // id: "LocalityReports"
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
              }}
           
          },
          LocalityWiseReport,
         
          breakAfterSearch: getBreak(),
          LocalityReportSearchResults
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
  