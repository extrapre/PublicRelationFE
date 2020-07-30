import {
  getBreak,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue,
  getCommonCard,
  getCommonHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  sortByEpoch,
  getEpochForDate,
  getTextToLocalMapping,
  getfullwidthLabelWithValue
} from "../../utils";
import { gotoApplyWithStep,gotoApplyWithStepPressNote } from "../../utils/index";
import {
  getQueryArg,
  getTransformedLocale
} from "egov-ui-framework/ui-utils/commons";
import {searchResultsPressList} from "../../egov-pr/searchResource/searchResults";
import {  masterGrid, ResendPressInviteGrid} from "../searchResource/searchResults";
import { documentsSummary } from "./documentsSummary";


const test = value => {
  value = value ? value.split(".")[0] : "";
  return value;
};

const tenantId = getQueryArg(window.location.href, "tenantId");

const getHeader = label => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-pr",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label
    },
    type: "array"
  };
};


const pressNoteDetails =  getCommonGrayCard({
  propertyLocationContainer: getCommonContainer({
    pressNoteDate: getLabelWithValue(
    {
      labelName: "press note date",
      labelKey: "PR_PRESS_NOTE_DATE"
    },
    {
      jsonPath: "ResponseBody[0].pressNoteDate"
     
    }
  ),
  fileNumber: getLabelWithValue(
    {
      labelName: "press note file number",
      labelKey: "PR_PRESS_NOTE_FILE_NUMBER"
    },
    {
      jsonPath: "ResponseBody[0].fileNumber"
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }
  ),
  breaksub : getBreak(),
  pressNoteSubject: getLabelWithValue(
    {
      labelName: "PRESS NOTE SUBJECT",
      labelKey: "PR_PRESS_NOTE_SUBJECT"
    },
    {
      jsonPath: "ResponseBody[0].pressNoteSubject"
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }
  )


})
})
  
const pressNote = getCommonGrayCard({
  propertyLocationContainer: getCommonContainer({
  Tenderdetail: getfullwidthLabelWithValue(
          {
            labelName: "Note",
            labelKey: "PR_PRESS_NOTE"
          },         
          ),
  test: {
     uiFramework: "custom-molecules-local",
          moduleName: "egov-pr",
          componentPath: "HTMLContent",
          props: { label : "noteContent"}
  }, 
  
  gridDefination: {
      xs: 12,
      sm: 12
    }
  

})
})
 

const EmailTemplate = getCommonGrayCard({
  
  propertyLocationContainer: getCommonContainer({
  
        emailSubject: getfullwidthLabelWithValue(
          {
            labelName: "Email Subject",
            labelKey: "PR_PRESS_NOTE_EMAIL_SUBJECT"
          },
         ),
		 emailsubjecttext : {
     uiFramework: "custom-molecules-local",
          moduleName: "egov-pr",
          componentPath: "HTMLContent",
          props: { label : "noteSubject"}
  }, 
          breakAfterSearch: getBreak(),
           emailBody: getfullwidthLabelWithValue(
          {
            labelName: "Email body",
            labelKey: "PR_PRESS_NOTE_EMAIL_BODY"
          },
          ),
		  emailemailtext : {
     uiFramework: "custom-molecules-local",
          moduleName: "egov-pr",
          componentPath: "HTMLContent",
          props: { label : "noteEmailContent"}
		}
})
})
  

const SMSTemplate = getCommonGrayCard({
  propertyLocationContainer: getCommonContainer({
  
    SMSTemplate: getfullwidthLabelWithValue(
          {
            labelName: "SMS Template",
            labelKey: "PR_PRESS_NOTE_SMS_TEMPLATE"
          },         
          ),
	 smstext : {
     uiFramework: "custom-molecules-local",
          moduleName: "egov-pr",
          componentPath: "HTMLContent",
          props: { label : "notesmsContent"}
 	  }
})
})
  






export const pressnoteSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "7px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        
      },
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
        gridDefination: {
          xs: 4,
          align: "right"
        },
        children: {
          editIcon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: "edit"

         
            }
          
          },
          buttonLabel: getLabel({
            labelKey: "NOC_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            gotoApplyWithStepPressNote(state, dispatch, 0);
          }
        }
      }
    }
  },
  eventDetailsHeader: getHeader("Publication Details"),
  break: getBreak(),

  cardfifth: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
      grid:masterGrid
         }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "nocApplicationDetail",
      // prefixSourceJsonPath:
      //   "children.cardContent.children.applicantContainer.children",
      // afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  },
  detailHeader: getHeader("Press Note Details"),
  cardOne: pressNoteDetails,
  noteHeader: getHeader("Note"),
  cardTwo: pressNote,
  emailtemplateHeader: getHeader("Email Template"),
  cardThree: EmailTemplate,
  descriptionHeader: getHeader("SMS Template"),
  cardFour: SMSTemplate,
  
});



// export const masterGrid1 = getCommonGrayCard({
  
//   header: {
//     uiFramework: "custom-atoms",
//     componentPath: "Container",
//     props: {
//       style: { marginBottom: "7px" },
//       id: "pressNoteList"
//     },
//     children: {
//       header: {
//         gridDefination: {
//           xs: 8
//         },
//         searchResultsPressList,
//         ...getCommonSubHeader({
//           labelName: "press note Details",
//           labelKey: "PRESS_NOTE_DETAILS_HEADER"
//         })
//       },
//       editSection: {
//         componentPath: "Button",
//         props: {
//           color: "primary",
//           style: {
//             marginTop: "-10px",
//             marginRight: "-18px"
//           }
//         },
//         gridDefination: {
//           xs: 4,
//           align: "right"
//         },
//         children: {
//           editIcon: {
//             uiFramework: "custom-atoms",
//             componentPath: "Icon",
//             props: {
//               iconName: "edit"
//             }
//           },
//           buttonLabel: getLabel({
//             labelKey: "NOC_SUMMARY_EDIT"
//           })
//         },
//         onClickDefination: {
//           action: "condition",
//           callBack: (state, dispatch) => {
//             gotoApplyWithStep(state, dispatch, 0);
//           }
//         }
//       }
//     }
//   },
 
// });