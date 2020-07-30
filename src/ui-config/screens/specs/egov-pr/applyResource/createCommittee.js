import {
    getBreak,
    getCommonCard,
    getCommonContainer,
    getCommonGrayCard,
    getCommonTitle,
    getSelectField,
    getTextField,
    getPattern
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import {
    prepareFinalObject,
    handleScreenConfigurationFieldChange as handleField
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import get from "lodash/get";
  import "./index.css";
  
  let previousUoms = [];

  
  export const createCommittee = getCommonCard({
    header: getCommonTitle(
      {
        labelName: "Create Committee",
        labelKey: "PR_CREATE_COMMITTEE"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),


    
    break: getBreak(),
    propertyDetailsConatiner: getCommonContainer({
        committeeName: getTextField({
        label: {
          labelName: "Committee Name",
          labelKey: "PR_COMMITTEE_NAME"
        },
        placeholder: {
            labelName: "Committee Name",
          labelKey: "PR_COMMITTEE_NAME"
          },
        pattern:getPattern("TextValidation"),
          
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
          
        jsonPath: "PublicRelation[0].CreateCommitteeDetails.committeename",
		 required: true,
      }),

     
      
     
    })
  });
  