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
  
 
 
 
  
 
 
 
  
  export const eventDetails = getCommonCard({
    header: getCommonTitle(
      {
        labelName: "Event Social Media Links",
        labelKey: "EVENT_SOCIAL_MEDIA_LINKS_HEADER"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    break: getBreak(),
    propertyDetailsConatiner: getCommonContainer({
        FacebookUrl: getTextField({
        label: {
          labelName: "Event Facebook Url",
          labelKey: "NOC_EVENT_FACEBOOK_URL_LABEL"
        },
        placeholder: {
            labelName: "Enter Event Facebook Url",
            labelKey: "NOC_EVENT_FACEBOOK_URL_PLACEHOLDER"
          },
        
       
        jsonPath: "PublicRelation[0].CreateEventDetails.facebookUrl"
      }),
      twitterUrl: getTextField({
        label: {
          labelName: "Event Twitter Link",
          labelKey: "NOC_EVENT_TWITTER_LINK_LABEL"
        },
        placeholder: {
            labelName: "Enter Event Twitter Link",
            labelKey: "NOC_EVENT_TWITTER_LINK_PLACEHOLDER"
          },
        
       
        jsonPath: "PublicRelation[0].CreateEventDetails.twitterUrl"
      }),
      instagram: getTextField({
        label: {
          labelName: "Event Instagram",
          labelKey: "NOC_Event_INSTAGRAM_LABEL"
        },
        placeholder: {
            labelName: "Enter Event Instagram",
            labelKey: "NOC_EVENT_INSTAGRAM_PLACEHOLDER"
          },
       
        jsonPath: "PublicRelation[0].CreateEventDetails.instagram"
      }),
     
    })
  });
  