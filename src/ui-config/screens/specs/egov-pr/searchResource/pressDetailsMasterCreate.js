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
  
export const pressDetailsApplication = getCommonCard({
    subHeader: getCommonTitle({
        labelName: "Press Master Details",
        labelKey: "PR_PRESS_DETAILS"
    },
    {
      style: {
        marginBottom: 18,
      }
    }
    ),
    
    appStatusAndToFromDateContainer: getCommonContainer({
      publicationName: {
        ...getTextField({
          label: {
            labelName: "Publication Name",
            labelKey: "PR_PRESS_DETAILS_PUBLICATION_NAME"
          },
          placeholder: {
            labelName: "Publication Name",
            labelKey: "PR_PRESS_DETAILS_PUBLICATION_NAME"
          },
          pattern: getPattern("TextValidation"),
          errorMessage: "PR_PUBLICATION_NAME_INVALID",
          required: true,
          jsonPath: "PRESSDETAILS.publicationName"
        })
      }, 
      // typeOfThePress: {
      //   ...getSelectField({
          
      //     optionLabel: "name",
      //     optionValue: "name",
      //     label: {
      //       labelName: "Type of the press", 
      //       labelKey: "PR_PRESS_DETAILS_TYPE_OF_PRESS" 
      //      },
      //     placeholder: {
      //       labelName: "Type of the press",
      //       labelKey: "PR_PRESS_DETAILS_TYPE_OF_PRESS_PLACEHOLDER"
      //     },   
      //     errorMessage: "PR_TYPE_OF_PRESS_INVALID",       
      //     sourceJsonPath: "applyScreenMdmsData['RAINMAKER-PR'].pressType",
      //     jsonPath: "PRESSDETAILS.typeOfThePress",
      //     required: true,
      //     props: {
      //       className: "applicant-details-error",
      //       required: true
      //     },
  
      //   }),
      // },
      typeOfThePress: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-pr",
        componentPath: "AutosuggestContainer",
        jsonPath: "PRESSDETAILS.typeOfThePress",
              required: true,
     gridDefination: {
      xs: 12,
      sm: 6
    },
      props: {
      style: {
      width: "100%",
      cursor: "pointer"
      },
     
      className: "citizen-city-picker",
      label: {
        labelName: "Type of the press", 
        labelKey: "PR_PRESS_DETAILS_TYPE_OF_PRESS" 
       },
      placeholder: {
        labelName: "Type of the press",
        labelKey: "PR_PRESS_DETAILS_TYPE_OF_PRESS_PLACEHOLDER"
      },     
        sourceJsonPath: "applyScreenMdmsData['RAINMAKER-PR'].pressType",
        jsonPath: "PRESSDETAILS.typeOfThePress",
     
      labelsFromLocalisation: false,
      suggestions: [],
      fullwidth: true,
      required: true,
      inputLabelProps: {
        shrink: true
      },
      isMulti: false,
    labelName: "name",
     valueName: "name"
      },
    },
        name: {
            ...getTextField({
              label: {
                labelName: "Personnel Name",
                labelKey: "PR_PRESS_DETAILS_PERSONNEL_NAME"
              },
              placeholder: {
                labelName: "Personnel Name",
                labelKey: "PR_PRESS_DETAILS_PERSONNEL_NAME"
              },
              pattern: getPattern("TextValidation"),
              errorMessage: "PR_PERSONNEL_NAME_INVALID",
              required: true,
              jsonPath: "PRESSDETAILS.name"
            })
          },    
         
         
          emailId: getTextField({
            label: {
              labelName: "Email Id",
              labelKey: "PR_PRESS_DETAILS_EMAILID"
            },
            placeholder: {
              labelName: "Email Id",
              labelKey: "PR_PRESS_DETAILS_EMAILID"
            },
            pattern: getPattern("Email"),
            errorMessage: "PR_PRESS_EMAILID_INVALID",
            jsonPath:
              "PRESSDETAILS.emailId",
              required: true,
            gridDefination: {
              xs: 12,
              sm: 12,
              md: 6
            },
            props:{
              className:"applicant-details-error",
              required: true
            }
          }),
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
            errorMessage: "PR_APPLICANT_MOBILE_NO_INVALID",
             jsonPath: "PRESSDETAILS.mobileNo",
                      
            gridDefination: {
              xs: 12,
              sm: 12,
              md: 6
            }
          }),
        
    }),
  
  
  });
  