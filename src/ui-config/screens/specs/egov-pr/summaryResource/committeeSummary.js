import {
    getBreak,
    getCommonContainer,
    getCommonGrayCard,
    getCommonSubHeader,
    getLabel,
    getLabelWithValue,
    convertEpochToDate
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { gotoApplyWithStepPressMaster,gotoApplyWithStepCommitteeMaster } from "../../utils/index";
  import "./customStyle.css";
  import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";
  import { searchDepartmentEmployeesResults_committeeSummary,searchDepartmentEmployeesResults,searchDepartmentEmployeesResults_committee,searchDepartmentEmployeesResults1, searchInvitedEmployeesResults } from "../committeeResource/searchResults";
  
  
  export const committeeSummary = getCommonGrayCard({
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
            labelName: "COMMITTEE DETAILS",
            labelKey: "PR_COMMITTEE_DETAILS"
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
              labelKey: "PR_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              gotoApplyWithStepCommitteeMaster(state, dispatch, 0);
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
            names: getLabelWithValue(
              {
                labelName: "Committee Name",
                labelKey: "PR_COMMITTEE_NAME"
              },
              {
                jsonPath:"CommiteeGetData[0].committeeName",
               
                labelName: "Names",
                labelKey: "Names"
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
    },
    cardTwo: {
      uiFramework: "custom-containers",
      componentPath: "MultiItem",
      props: {
        className: "applicant-summary",
        scheama: getCommonGrayCard({
          applicantContainer: getCommonContainer({
            names: getLabelWithValue(
              {
                labelName: "Committee Member",
                labelKey: "PR_COMMITTEE_MEMBER"
              }),
       grid: searchDepartmentEmployeesResults_committeeSummary
          
           
           
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
  