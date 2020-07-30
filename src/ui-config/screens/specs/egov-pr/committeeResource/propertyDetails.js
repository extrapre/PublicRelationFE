import {
  getBreak,
  getCommonCard,
  getCommonContainer,
  getCommonGrayCard,
  getCommonTitle,
  getSelectField,
  getTextField,
  getTimeField,
  getPattern,
  getDateField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import "./index.css";

let previousUoms = [];










export const propertyDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Event Date & Time",
      labelKey: "PR_EVENT_DATE_AND_TIME_HEADER"
    },
    
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  break: getBreak(),
  propertyDetailsConatiner: getCommonContainer({
    StartDate: getDateField({
      label: {
        labelName: "Start Date",
        labelKey: "NOC_START_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter Start Date",
        labelKey: "NOC_EVENT_START_DATE_PLACEHOLDER"
      },
     
      jsonPath: "PublicRelation[0].CreateEventDetails.startDate"
    }),
    EndDate: getDateField({
      label: {
        labelName: "End Date",
        labelKey: "NOC_END_DATE_LABEL"
      },
     
      placeholder: {
        labelName: "Enter End Date",
        labelKey: "NOC_EVENT_END_DATE_PLACEHOLDER"
      },
     
     
      jsonPath: "PublicRelation[0].CreateEventDetails.endDate"
    }),
    StartTime: getTimeField({
      label: {
        labelName: "Start Time",
        labelKey: "PR_START_TIME_LABEL"
      },
      placeholder: {
        labelName: "Enter Start Time",
        labelKey: "NOC_EVENT_START_TIME_PLACEHOLDER"
      },
     
      jsonPath: "PublicRelation[0].CreateEventDetails.startTime"
    }),
    EndTime: getTimeField({
      label: {
        labelName: "End Time",
        labelKey: "NOC_END_TIME_LABEL"
      },
     
      placeholder: {
        labelName: "Enter End Timee",
        labelKey: "NOC_EVENT_END_TIME_PLACEHOLDER"
      },
     
      jsonPath: "PublicRelation[0].CreateEventDetails.endTime"
    }),
  })
});
