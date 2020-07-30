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
  
  
  export const eventDescription = getCommonCard({
    header: getCommonTitle(
      {
        labelName: "Event Description",
        labelKey: "EVENT_DESCRIPTION_HEADER"
      },
      
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    break: getBreak(),
    propertyDetailsConatiner: getCommonContainer({
        DescriptionOfEvent: getTextField({
        label: {
          labelName: "Description Of Event",
          labelKey: "NOC_DESCRIPTION_OF_EVENT_LABEL"
        },
        placeholder: {
          labelName: "Description Of Event",
          labelKey: "NOC_DESCRIPTION_OF_EVENT_PLACEHOLDER"
        },
       
        jsonPath: "PublicRelation[0].CreateEventDetails.DescriptionOfEvent"
      }),
     
    })
  });
  