import {
    getCommonCard,
    getCommonContainer,
    getCommonParagraph,
    getCommonTitle,
    getDateField,
    getLabel,
    getPattern,
    getSelectField,
    getTextField
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
export const committeeMasterCreate = getCommonCard({
    subHeader: getCommonTitle({
      labelName: "Create Committee",
      labelKey: "PR_CREATE_COMMITTEE_HEADER"
    }),
    
    appStatusAndToFromDateContainer: getCommonContainer({
        name: {
            ...getTextField({
              label: {
                labelName: "Name",
                labelKey: "PR_PRESS_DETAILS_NAME"
              },
              placeholder: {
                labelName: "Name",
                labelKey: "PR_PRESS_DETAILS_NAME_PLACEHOLDER"
              },
              pattern: getPattern("VillageName"),
              errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
              required: true,
              jsonPath: "PRESSDETAILS.name"
            })
          }, 
		mobileNumber: getTextField({
            label: {
              labelName: "Mobile Number",
              labelKey: "PR_APPLICANT_MOBILE_NO_LABEL"
            },
            placeholder: {
              labelName: "Mobile Number",
              labelKey: "PR_APPLICANT_MOBILE_NO_LABEL"
            },
            required: true,
            props:{
              className:"applicant-details-error"
            },
                       pattern: getPattern("MobileNo"),
            errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
              jsonPath: "PRESSDETAILS.mobileNo",
           
            gridDefination: {
              xs: 12,
              sm: 12,
              md: 6
            }
          }),		  
          department: {
            ...getSelectField({
              label: {
                 labelName: "Department", 
                 labelKey: "COMMITTE_DEPARTMENT" 
                },
              optionLabel: "name",
              placeholder: {
                 labelName: "Department", 
                 labelKey: "COMMITTE_DEPARTMENT" 
              },          
              sourceJsonPath: "applyScreenMdmsData.egpm.department",
              jsonPath: "PRESSDETAILS.department",
              required: false,
              props: {
                className: "applicant-details-error",
                required: false
                
              },
      
            }),
          },
		  designation: {
            ...getSelectField({
              label: {
                 labelName: "Designation", 
                 labelKey: "COMMITTE_DESIGNATION" 
                },
              optionLabel: "name",
              placeholder: {
                 labelName: "Designation", 
                 labelKey: "COMMITTE_DESIGNATION" 
              },          
              sourceJsonPath: "applyScreenMdmsData.egpm.designation",
              jsonPath: "PRESSDETAILS.designation",
              required: false,
              props: {
                className: "applicant-details-error",
                required: false
               
              },
      
            }),
          },
          committeName: {
            ...getTextField({
              label: {
                labelName: "Committe Name",
                labelKey: "COMMITTE_NAME"
              },
              placeholder: {
               labelName: "Committe Name",
                labelKey: "COMMITTE_NAME"
              },
              pattern: getPattern("VillageName"),
              errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
              required: true,
              jsonPath: "PRESSDETAILS.committeName"
            })
          }, 
          
         
        
    }),
  
  
  });
  