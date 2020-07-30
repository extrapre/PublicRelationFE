import {
  getBreak,
  getCommonCard,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonTitle,
  getSelectField,
  getTextField,
  getDateField,
  getPattern,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject, handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getDetailsForOwner, getTextToLocalMapping } from "../../utils";
import { GetEmployees, SearchCommitteeEmployees, InvitePress } from "../searchResource/citizenSearchFunctions";
import get from "lodash/get";
import "./index.css";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../../../../ui-utils";
import AutoComplete from 'material-ui/AutoComplete';
import {localStorageGet, localStorageSet} from "egov-ui-kit/utils/localStorageUtils";
//alert('vvvvvv')

const showComponent = (dispatch, componentJsonPath, display) => {
  let displayProps = display ? {} : { display: "none" };
  dispatch(
    handleField("apply", componentJsonPath, "props.style", displayProps)
  );
};

// const dept = async (action, state, dispatch) => {
	// return get( state, "applyScreenMdmsData.departments.MdmsRes.common-masters.Department",[])
// }	



export const applicantDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Internal Guests",
      labelKey: "PR_INTERNAL_GUESTS_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  break: getBreak(),
  applicantTypeContainer: getCommonContainer({
    applicantTypeSelection: getCommonContainer({
     header1: getCommonTitle(
    {
      labelName: "Select Department",
      labelKey: "PR_SELECT_DEPARTMENT_LABEL_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ), 
	  MultiSelect_committee: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-pr",
          componentPath: "MultiSelect",
          props: {
            optionvalue : []
          },
		  sourceJsonPath : "applyScreenMdmsData.departments.MdmsRes.common-masters.Department"
        },
		 GetEmployees: {
			componentPath: "Button",
			props: {
			  variant: "contained",
			  color: "primary",
			  style: {
			   // minWidth: "200px",
				height: "48px",
				marginRight: "45px"
			  }
			},
			children: {
			  nextButtonLabel: getLabel({
          labelName: "Search Employees",
          labelKey: "PR_SEARCH_EMPLOYEES_BUTTON"
			  }),
			  nextButtonIcon: {
				uiFramework: "custom-atoms",
				componentPath: "Icon",
				props: {
				  iconName: "keyboard_arrow_right"
				}
			  }
			},
			onClickDefination: {
			  action: "condition",
			  callBack: (state, dispatch) => {GetEmployees(state, dispatch) }
			}
		}
	  
    }),
   
  })
});




export const pressDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Press",
      labelKey: "PR_PRESS"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  break: getBreak(),
  pressContainer: getCommonContainer({
   
      // selectpress: {
        // ...getSelectField({
          // label: {
            // labelName: "Select Press",
            // labelKey: "PR_Select_Press_LABEL"
          // },
          // placeholder: {
             // labelName: "Select Press",
            // labelKey: "PR_Select_Press_LABEL"
          // },
          // jsonPath:
            // "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipMajorType",
        
          // // data: [
          // //   {
          // //     code: "Individual"
          // //   },
          // //   {
          // //     code: "Multiple"
          // //   },
          // //   {
          // //     code: "Institutional-Private"
          // //   }
          // // ],
          // required: true,
          // sourceJsonPath: "applyScreenMdmsData.DropdownsData.OwnershipCategory",
          // gridDefination: {
            // xs: 12,
            // sm: 12,
            // md: 8
          // },
          // props:{
            // className:"applicant-details-error",
			// multiselect:"multiselect"
          // }
        // }),
        // beforeFieldChange: (action, state, dispatch) => {
          // let path = action.componentJsonpath.replace(
            // /.applicantType$/,
            // ".applicantSubType"
          // );
          // let applicantType = get(
            // state,
            // "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.OwnerShipCategory",
            // []
          // );
          // let applicantSubType = applicantType.filter(item => {
            // return item.active && item.code.startsWith(action.value);
          // });
         // // dispatch(handleField("apply", path, "props.data", applicantSubType));
        // }
      // },
	  break : getBreak(),
	  selectmultipress : {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-pr",
          componentPath: "MultiSelectPress",
          props: {
            optionvalue : []
          },
		  //sourceJsonPath : "applyScreenMdmsData.departments.MdmsRes.common-masters.Department"
        },
	  GetEmployees: {
			componentPath: "Button",
			props: {
			  variant: "contained",
			  color: "primary",
			  style: {
			   // minWidth: "200px",
				height: "48px",
				marginRight: "45px"
			  }
			},
			
			 gridDefination: {
            xs: 4,
            sm: 4,
            md: 4
          },
			children: {
			  nextButtonLabel: getLabel({
				labelName: "Invite Press",
				labelKey: "PR_INVITE_PRESS_BUTTON"
			  }),
			  nextButtonIcon: {
				uiFramework: "custom-atoms",
				componentPath: "Icon",
				props: {
				  iconName: "keyboard_arrow_right"
				}
			  }
			},
			// onClickDefination: {
			//   action: "condition",
			//   callBack: (state, dispatch) => {InvitePress(state, dispatch) }
			// }
		}
     
  })
});


export const searchemployee = getCommonCard({
  SearchEmployee: {
    ...getTextField({
      label: {
        labelName: "Search Employee",
        labelKey: "PR_SEARCH_EMPLOYEE_"
      },
      placeholder: {
         labelName: "Search Employee",
        labelKey: "PR_SEARCH_EMPLOYEE_"
      },
	   gridDefination: {
            xs: 8,
            sm: 8,
            md: 4
          },
      required: false,
      pattern: getPattern("Name"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "CreateInvite.employeename",
    })
  },
  SearchEmployeebtn: {
			componentPath: "Button",
			props: {
			  variant: "contained",
			  color: "primary",
			  style: {
			   // minWidth: "200px",
				height: "48px",
				marginRight: "45px"
			  }
			},
			 gridDefination: {
            xs: 4,
            sm: 4,
            md: 4
          },
			children: {
			  nextButtonLabel: getLabel({
				labelName: "Search Employee",
				labelKey: "PR_SEARCH_EMPLOYEE_BUTTON"
			  }),
			  nextButtonIcon: {
				uiFramework: "custom-atoms",
				componentPath: "Icon",
				props: {
				  iconName: "keyboard_arrow_right"
				}
			  }
			},
			onClickDefination: {
			  action: "condition",
			  callBack: (state, dispatch) => {SearchCommitteeEmployees(state, dispatch) }
			}
		}
});  




export const EmailSmsContent = getCommonCard({
	 subjectemail: getCommonTitle(
    {
      labelName: "Subject",
      labelKey: "PR_EMAIL_Subject"
    },
    {
     style: {
        marginBottom: 20,
		marginTop: 20
      }
    }
  ),
  break: getBreak(),
   break: getBreak(),
  Emailsubject: {
     uiFramework: "custom-molecules-local",
          moduleName: "egov-pr",
          componentPath: "RichTextEditor",
          props: { label : "subject"}
  },
  break: getBreak(),	
	headeremail: getCommonTitle(
    {
      labelName: "Email Template",
      labelKey: "PR_EMAIL_TEMPLATE"
    },
    {
     style: {
        marginBottom: 20,
		marginTop: 20
      }
    }
  ),
  break: getBreak(),
   break: getBreak(),
  EmailContent: {
     uiFramework: "custom-molecules-local",
          moduleName: "egov-pr",
          componentPath: "RichTextEditor",
          props: { label : "email"}
  },
  break: getBreak(),
   break: getBreak(),
   headersms: getCommonTitle(
    {
      labelName: "SMS Template",
      labelKey: "PR_SMS_TEMPLATE"
    },
    {
      style: {
        marginBottom: 20,
		marginTop: 20
      }
    }
  ),
  break: getBreak(),
   break: getBreak(),
  SMSContent: {
     uiFramework: "custom-molecules-local",
          moduleName: "egov-pr",
          componentPath: "RichTextEditor",
          props: { label : "sms"}
  },
  break: getBreak(),
   break: getBreak(),
  
});  