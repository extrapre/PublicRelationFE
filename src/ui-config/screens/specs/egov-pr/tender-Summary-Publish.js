import { getCommonCard, getCommonContainer, getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  getFileUrlFromAPI,
  getQueryArg,
  getTransformedLocale
} from "egov-ui-framework/ui-utils/commons";
import { documentsSummary } from "./summaryResource/tenderDocumentsSummary";
import { getTenantId, getapplicationNumber,localStorageGet,localStorageSet} from "egov-ui-kit/utils/localStorageUtils";
import { getSearchResultsforTenderView } from "./searchResource/citizenSearchFunctions";
import { tenderSummaryfooter } from './applyResource/tenderFooter';
import { ResendTenderInviteGrid } from './tenderResources/tenderDetails';
import { tenderPublishSummary } from "./summaryResource/tenderSummary";
import {
 getUserInfo
} from "egov-ui-kit/utils/localStorageUtils";
import set from "lodash/set";
import "../../../../customstyle.css";
import "./publishtender.css";
import { checkForRole } from "../../../../ui-utils/commons";

const titlebar = getCommonContainer({
  header: getCommonHeader({
    labelName: "Tender Notice Details",
    labelKey: "PR_TENDER_NOTICE_DETAILS"
  }),
  tenderNoticeId: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pr",
    componentPath: "TenderContainer",
    props: {
      number:getQueryArg(window.location.href, "tenderId"),
    }
  },


  
});


const screenConfig = {
  uiFramework: "material-ui",
  name: "tender-Summary-Publish",
  beforeInitScreen: (action, state, dispatch) => {
	localStorageSet("resendmodule", "TENDER");
  localStorageSet("eventifforinvitatoin",getQueryArg(window.location.href, "tenderuuId"));
  localStorageSet("ResendInvitelist", []);	
  localStorageSet("ResendInvitelistAll", []);	

			
	let payload = {
      "RequestBody": {
        "tenantId": getTenantId(),
        "moduleCode": localStorageGet("modulecode"),
       
        "tenderNoticeUuid": getQueryArg(window.location.href, "tenderuuId"),
        "tenderNoticeId": getQueryArg(window.location.href, "tenderId"),
        "fileNumber":"",
        "tenderSubject":"",
        "tenderNoticeStatus":"",
        "fromDate":"",
        "toDate":"",
         "defaultGrid":false
        
      }
    }
    getSearchResultsforTenderView(state, dispatch, payload)


    set(
      action,
      "screenConfig.components.div.children.body.children.cardContent.children.tenderPublishSummary.children.cardContent.children.header.children.editSection.visible",
      checkForRole(JSON.parse(getUserInfo()).roles, 'DEPARTMENTUSER') ||  getQueryArg(window.location.href, "Status")=="PUBLISHED"  ? false : true
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
              ...titlebar
            }
          }
        },
        body: getCommonCard({
          tenderPublishSummary: tenderPublishSummary,
          documentsSummary: documentsSummary,
        }),
		Resendbody:checkForRole(JSON.parse(getUserInfo()).roles, 'DEPARTMENTUSER') || getQueryArg(window.location.href, "Status")=="CREATED" ?{}: getCommonCard({
		   headerresend: getCommonHeader({
					labelName: "Invited Press List",
					labelKey: "PR_INVITED_PRESS_LIST"
      },
      {
        style: {
          marginBottom: 18,
        }
      }
      ),	
          ResendTenderInviteGrid:checkForRole(JSON.parse(getUserInfo()).roles, 'DEPARTMENTUSER') || getQueryArg(window.location.href, "Status")=="CREATED" ?{}: ResendTenderInviteGrid,
         
        }),
        
       tenderSummaryfooter:tenderSummaryfooter
      }
    }
  }
};

export default screenConfig;
