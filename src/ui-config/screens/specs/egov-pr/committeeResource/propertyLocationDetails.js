import {
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getPattern,
  getSelectField,
  getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import { httpRequest } from "../../../../../ui-utils/api";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import "./index.css";

const showHideMapPopup = (state, dispatch) => {
  let toggle = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.mapsDialog.props.open",
    false
  );
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.mapsDialog",
      "props.open",
      !toggle
    )
  );
};



const getDetailsFromProperty = async (state, dispatch) => {
  try {
    const propertyId = get(
      state.screenConfiguration.preparedFinalObject,
      "FireNOCs[0].fireNOCDetails.propertyDetails.propertyId",
      ""
    );

    const tenantId = getTenantId();
    if (!tenantId) {
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "Please select city to search by property id !!",
            labelKey: "ERR_SELECT_CITY_TO_SEARCH_PROPERTY_ID"
          },
          "warning"
        )
      );
      return;
    }
    if (propertyId) {
      let payload = await httpRequest(
        "post",
        `/pt-services-v2/property/_search?tenantId=${tenantId}&ids=${propertyId}`,
        "_search",
        [],
        {}
      );
      if (
        payload &&
        payload.Properties &&
        payload.Properties.hasOwnProperty("length")
      ) {
        if (payload.Properties.length === 0) {
          dispatch(
            toggleSnackbar(
              true,
              {
                labelName: "Property is not found with this Property Id",
                labelKey: "ERR_PROPERTY_NOT_FOUND_WITH_PROPERTY_ID"
              },
              "info"
            )
          );
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardSecondStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocPropertyID",
              "props.value",
              ""
            )
          );
        } else {
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyMohalla",
              "props.value",
              {
                value: payload.Properties[0].address.locality.code,
                label: payload.Properties[0].address.locality.name
              }
            )
          );
          dispatch(
            prepareFinalObject(
              "FireNOCs[0].fireNOCDetails.propertyDetails.address",
              payload.Properties[0].address
            )
          );
          // dispatch(
          //   handleField(
          //     "apply",
          //     "components.div.children.formwizardSecondStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.children.cityDropdown",
          //     "props.value",
          //     payload.Properties[0].address.tenantId
          //   )
          // );
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const propertyLocationDetails = getCommonCard(
  {
    header: getCommonTitle(
      {
        labelName: "Event Details",
        labelKey: "NOC_EVENT_DETAILS_HEADER"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),

    propertyDetailsConatiner: getCommonContainer({
      EventTitle: getTextField({
        label: {
          labelName: "Event Title",
          labelKey: "NOC_EVENT_TITLE_LABEL"
        },
        placeholder: {
          labelName: "Enter Event Title",
          labelKey: "NOC_EVENT_TITLE_PLACEHOLDER"
        },
        
       
        jsonPath: "PublicRelation[0].CreateEventDetails.eventTitle"
      }),
      EventLocation: getTextField({
        label: {
          labelName: "Event Location",
          labelKey: "PR_EVENT_LOCATION_LABEL"
        },
        placeholder: {
          labelName: "Enter Event Location",
          labelKey: "PR_EVENT_LOCATION_PLACEHOLDER"
        },
        
       
        jsonPath: "PublicRelation[0].CreateEventDetails.eventLocation"
      }),
      sector: getTextField({
        label: {
          labelName: "Sector",
          labelKey: "PR_SECTOR_LABEL"
        },
        placeholder: {
          labelName: "Enter Sector",
          labelKey: "PR_SECTOR_PLACEHOLDER"
        },
        
       
        jsonPath: "PublicRelation[0].CreateEventDetails.sector"
      }),
      organizationDetail: {
        ...getSelectField({
          label: { labelName: "Organization Detail", labelKey: "NOC_ORGANIZATION_DETAIL_LABEL" },
          // localePrefix: {
          //   moduleName: "TENANT",
          //   masterName: "TENANTS"
          // },
          optionLabel: "name",
          placeholder: {
            labelName: "Select Organization Detail",
            labelKey: "NOC_ORGANIZATION_DETAIL_PLACEHOLDER"
          },
          //sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
          jsonPath: "PublicRelation[0].CreateEventDetails.organizationDetail",
          required: false,
          props: {
            className:"applicant-details-error",
            required: false
            // disabled: true
          }
        }),
      
      },
      typeOfEvent: {
        ...getSelectField({
          label: { labelName: "Type Of Event", labelKey: "NOC_TYPE_OF_EVENT_LABEL" },
          // localePrefix: {
          //   moduleName: "TENANT",
          //   masterName: "TENANTS"
          // },
          optionLabel: "name",
          placeholder: {
            labelName: "Select Type Of Event",
            labelKey: "NOC_TYPE_OF_EVENT_PLACEHOLDER"
          },
          //sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
          jsonPath: "PublicRelation[0].CreateEventDetails.typeOfEvent",
          required: false,
          props: {
            className:"applicant-details-error",
            required: false
            // disabled: true
          }
        }),
      
      },
      Eventbudjet: getTextField({
        label: {
          labelName: "Event Budjet",
          labelKey: "NOC_EVENT_BUDJET_LABEL"
        },
        placeholder: {
          labelName: "Enter Event Budjet",
          labelKey: "NOC_EVENT_BUDJET_PLACEHOLDER"
        },
        
       
        jsonPath: "PublicRelation[0].CreateEventDetails.budjet"
      }),
      commitiee: {
        ...getSelectField({
          label: { labelName: "Commitiee", labelKey: "NOC_COMMITIEE_LABEL" },
          // localePrefix: {
          //   moduleName: "TENANT",
          //   masterName: "TENANTS"
          // },
          optionLabel: "name",
          placeholder: {
            labelName: "Select Commitiee",
            labelKey: "NOC_COMMITIEE_PLACEHOLDER"
          },
          //sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
          jsonPath: "PublicRelation[0].CreateEventDetails.commitiee",
          required: false,
          props: {
            className:"applicant-details-error",
            required: false
            // disabled: true
          }
        }),
      
      },
      
    }),
    
  },
  {
    style: { overflow: "visible" }
  }
);
