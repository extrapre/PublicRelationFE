import {
  getBreak,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { gotoApplyWithStep, getlinkLabelWithValue } from "../../utils/index";
import {
  getQueryArg,
  getTransformedLocale
} from "egov-ui-framework/ui-utils/commons";
import "./index.css";
const test = value => {
  value = value ? value.split(".")[0] : "";
  return value;
};

const tenantId = getQueryArg(window.location.href, "tenantId");

const getHeader = label => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-noc",
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





const EventDetails =  getCommonContainer({
  eventType: getLabelWithValue(
    {
      labelName: "Enter Event Title",
      labelKey: "NOC_EVENT_TITLE_LABEL"
    },
    {
  
    }
  ),
  eventLocation: getLabelWithValue(
    {
      labelName: "Event Location",
      labelKey: "PR_EVENT_LOCATION_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
     
    }
  ),
  sector: getLabelWithValue(
    {
      labelName: "Sector",
      labelKey: "PR_SECTOR_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
      
    }
  ),
  organizationDetails: getLabelWithValue(
    {
      labelName: "Organization Details",
      labelKey: "ORGANIZATION_DETAILS_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
      
    }
  ),
  TypeOfEvent: getLabelWithValue(
    {
      labelName: "Type Of Event",
      labelKey: "TYPE_OF_EVENT_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
     
    }
  ),
  EventBudjet: getLabelWithValue(
    {
      labelName: "Event Budjet",
      labelKey: "EVENT_BUDJET_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
      
    }
  ),
  committiee: getLabelWithValue(
    {
      labelName: "Committiee",
      labelKey: "COMMITIEE_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
      
    }
  ),
  eventDescription: getLabelWithValue(
{
  labelName: "eventDescription",
  labelKey: "PR_EVENT_DESCRIPTION_LABEL"
},
{
  jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
  
}
)

})

  
const EventDataAndTime = getCommonContainer({
  
 startDate: getLabelWithValue(
    {
      labelName: "startDate",
      labelKey: "START_DATE_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber",
      callBack: value => {
        return value.split(" ")[0];
      }
    }
  ),
  endDate: getLabelWithValue(
    {
      labelName: "End Date",
      labelKey: "END_DATE_LABEL"
    },
    {
      jsonPath: "PublicRelations[0].provisionPublicRelationNumber",
      callBack: value => {
        return value.split(" ")[0];
      }
    }
  )
, startTime: getLabelWithValue(
{
  labelName: "startTime",
  labelKey: "PR_START_TIME_LABEL"
},
{
  jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
  
}
)
, endTime: getLabelWithValue(
{
  labelName: "endTime",
  labelKey: "END_TIME_LABEL"
},
{
  jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
 
}
)

})

 

const EventSocialMediaLinks = getCommonContainer({
  
        eventFacebookUrl: getlinkLabelWithValue(
          {
            labelName: "Event Facebook Url",
            labelKey: "EVENT_FACEBOOK_URL_LABEL"
          },
          {
            jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
            
          }
          ), eventTwitterUrl: getLabelWithValue(
          {
            labelName: "Event Twitter Url",
            labelKey: "EVENT_TWITTER_URL_LABEL"
          },
          {
            jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
            
          }
          ), eventInstagram: getLabelWithValue(
          {
            labelName: "Event Instagram",
            labelKey: "EVENT_INSTAGRAM_LABEL"
          },
          {
            jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
            
          }
          )

})

  

const EventDescription = getCommonContainer({
  
        eventDescription: getLabelWithValue(
          {
            labelName: "eventDescription",
            labelKey: "PR_EVENT_DESCRIPTION_LABEL"
          },
          {
            jsonPath: "PublicRelations[0].provisionPublicRelationNumber"
            
          }
          )
})

  






export const propertySummary = getCommonGrayCard({
  
  eventDetailsHeader: {
        gridDefination: {
          xs: 8
        },
		...getCommonSubHeader({
          labelName: "Event Details",
          labelKey: "PR_EVENT_DETAILS_HEADER"
        },
		 {
        style: {
          marginBottom: 18,
		  marginTop: 18
        }
      })
      },
  break: getBreak(),
  
  cardOne: EventDetails,
  break: getBreak(),
 
  dateTimeHeader: {
        gridDefination: {
          xs: 8
        },
		...getCommonSubHeader({
          labelName: "Event Date & Time",
          labelKey: "PR_EVENT_DATE_TIME_HEADER"
        },
		 {
        style: {
          marginBottom: 18,
		  marginTop: 18
        }
      })
      },
	  break: getBreak(),
	   cardTwo: EventDataAndTime,
  break: getBreak(),
   socialMediaHeader: {
        gridDefination: {
          xs: 8
        },
		...getCommonSubHeader({
          labelName: "Event Social Media Link",
          labelKey: "PR_EVENT_SOCIAL_LINK_HEADER"
        },
		 {
        style: {
          marginBottom: 18,
		  marginTop: 18
        }
      })
      },
	  break: getBreak(),
		cardThree: EventSocialMediaLinks,
   break: getBreak(),
  descriptionHeader: {
        gridDefination: {
          xs: 8
        },
		...getCommonSubHeader({
          labelName: "Event Description",
          labelKey: "PR_EVENT_DESCRIPTION_HEADER"
        },
		 {
        style: {
          marginBottom: 18,
		  marginTop: 18
        }
      })
      },
	  break: getBreak(),
	 
    cardFour: EventDescription,
	break: getBreak(),break: getBreak(),break: getBreak(),
});
