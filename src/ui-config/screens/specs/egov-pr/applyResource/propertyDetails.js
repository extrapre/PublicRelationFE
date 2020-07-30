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
import { localStorageGet, localStorageSet } from "egov-ui-kit/utils/localStorageUtils";
import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import "./index.css";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import set from "lodash/set";
import {
  getTodaysDateInYMD,
  getStartDateValue
  }  from "../../utils";
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
        labelKey: "PR_START_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter Start Date",
        labelKey: "PR_EVENT_START_DATE_PLACEHOLDER"
      },
      required: true,
      pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRelation[0].CreateEventDetails.startDate1",
      props: {
        inputProps: {
          min: getTodaysDateInYMD()
        }
      },
  beforeFieldChange: (action, state, dispatch) => {
      
        dispatch(
          handleField(
            "apply",
            "components.div.children.formwizardFirstStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.EndDate",
            "props.inputProps.min",
            action.value
          )
        );
       
			timevalidation(action, state, dispatch)
      
        },
       
      afterFieldChange: (action, state, dispatch) => {
        datevalidation(action, state, dispatch)
        


        }
    }),
    StartTime: getTimeField({
      label: {
        labelName: "Start Time",
        labelKey: "PR_START_TIME_LABEL"
      },
      placeholder: {
        labelName: "Enter Start Time",
        labelKey: "PR_EVENT_START_TIME_PLACEHOLDER"
      },
      required: true,
     // pattern: getPattern("Name"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRelation[0].CreateEventDetails.startTime",
	  beforeFieldChange: (action, state, dispatch) => {
			timevalidation(action, state, dispatch)
	   
        }
      
    }),
    EndDate: getDateField({
      label: {
        labelName: "End Date",
        labelKey: "PR_END_DATE_LABEL"
      },
     
      placeholder: {
        labelName: "Enter End Date",
        labelKey: "PR_EVENT_END_DATE_PLACEHOLDER"
      },
     
      required: true,
      pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRelation[0].CreateEventDetails.endDate1",
      props: {
        inputProps: {
          min: ''
        }
      },

     beforeFieldChange: (action, state, dispatch) => {
			timevalidation(action, state, dispatch)
	   
        }
    }),
    
    EndTime: getTimeField({
      label: {
        labelName: "End Time",
        labelKey: "PR_END_TIME_LABEL"
      },
     
      placeholder: {
        labelName: "Enter End Time",
        labelKey: "PR_EVENT_END_TIME_PLACEHOLDER"
      },
      required: true,
   
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "PublicRelation[0].CreateEventDetails.endTime",
	   beforeFieldChange: (action, state, dispatch) => {
			timevalidation(action, state, dispatch)
	   
        },
      props: {
        inputProps: {
        //  min: ''
        }
      }
    }),
  })
});


// Time validation
export const timevalidation =(action, state, dispatch) =>
{
	let startdate = get(	state,								"screenConfiguration.preparedFinalObject.PublicRelation[0].CreateEventDetails.startDate1",
								{}
							);
							
	    let enddate = get(state,								"screenConfiguration.preparedFinalObject.PublicRelation[0].CreateEventDetails.endDate1",
								{}
							);		
			
		 let starttime = get(state,								"screenConfiguration.preparedFinalObject.PublicRelation[0].CreateEventDetails.startTime",
								{}
							);		

		
		localStorageSet("EventTimeINvalid","no");
		if(startdate == enddate && starttime >= action.value)
		{
			localStorageSet("EventTimeINvalid","yes");
			dispatch(
              toggleSnackbar(
                true,
                { labelName: "Select correct time slot", labelKey: "PR_END_TIME_VALIDATION_MESSAGE" },
                "warning"
              )
            );
			
			setTimeout(function(){
			dispatch(
			  handleField(
				"apply",            "components.div.children.formwizardFirstStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.EndTime",
				"value",
				""
			  )
			);
			 }, 1000);
			 
    }
   
}


export const datevalidation =(action, state, dispatch) =>
{
	let startdate = get(	state,								"screenConfiguration.preparedFinalObject.PublicRelation[0].CreateEventDetails.startDate1",
								{}
							);
							
	    let enddate = get(state,								"screenConfiguration.preparedFinalObject.PublicRelation[0].CreateEventDetails.endDate1",
								{}
							);		
			
		

		
		
    if(startdate > enddate){
      dispatch(
        handleField(
          "apply",
          "components.div.children.formwizardFirstStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.EndDate",
          "props.value",
          startdate
        )
      );
     
     

    }
}