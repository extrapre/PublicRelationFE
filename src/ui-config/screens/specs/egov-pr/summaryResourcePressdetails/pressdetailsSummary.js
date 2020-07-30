import {
  getBreak,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue,
  convertEpochToDate
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { gotoApplyWithStepPressMaster } from "../../utils/index";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";

//alert("pressDetailsSummary")
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
export const pressdetailsSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        ...getCommonSubHeader({
          labelName: "Press Master Details",
          labelKey: "PR_PRESS_MASTER_DATAILS"
        })
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
            labelName: "Edit",
            labelKey: "PR_EDIT_BUTTON"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            gotoApplyWithStepPressMaster(state, dispatch, 0);
          }
        }
      }
    }
  },
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        applicantContainer: getCommonContainer({
          publicationName: getLabelWithValue(
            {
              labelName: "Publication Name*",
                labelKey: "PR_PUBLICATION_NAME"
            },
            {
              jsonPath:"pressMasterDetails[0].publicationName",
              
              labelName: "Publication Name",
              labelKey: "PR_PUBLICATION_NAME"
            }
          ),
          typeOfThePress: getLabelWithValue(
            {
              labelName: "Type of the press*", 
                 labelKey: "PR_TYPE_OF_THE_PRESS" 
            },
             {
              jsonPath:"pressMasterDetails[0].pressType",
            //   // callBack: value => {
            //   //   return value.split(".")[1];
            //   // }
            labelName: "Type of the press", 
            labelKey: "PR_TYPE_OF_THE_PRESS"
             }
          ),
          
          names: getLabelWithValue(
            {
              labelName: "Names",
              labelKey: "PR_PRESS_DETAILS_PERSONNEL_NAME"
            },
            {
              jsonPath:
                "pressMasterDetails[0].personnelName",
              // callBack: value => {
              //   return value.split(".")[0];
              // }
              labelName: "Personnel Names",
              labelKey: "PR_PRESS_DETAILS_PERSONNEL__NAME"
            }
          ),
         
          emailId: getLabelWithValue(
            {
              labelName: "Email Id",
              labelKey: "PR_EMAIL_ID"
            },
            {
              jsonPath:"pressMasterDetails[0].email",
              
              labelName: "Email Id",
              labelKey: "PR_EMAIL_ID"
            },
            
          ),
          mobileNumber: getLabelWithValue(
            {
              labelName: "Mobile Number*",
              labelKey: "PR_MOBILE_NUMBER"
            },
            {
              jsonPath:"pressMasterDetails[0].mobile",
              
              labelName: "Mobile Number",
              labelKey: "PR_MOBILE_NUMBER"
            }
          ),
          
        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "nocApplicationDetail",
     
    },
    type: "array"
  }
});
