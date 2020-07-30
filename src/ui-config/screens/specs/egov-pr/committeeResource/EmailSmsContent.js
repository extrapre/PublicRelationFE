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
  getPattern
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getDetailsForOwner } from "../../utils";
import get from "lodash/get";
import "./index.css";

const showComponent = (dispatch, componentJsonPath, display) => {
  let displayProps = display ? {} : { display: "none" };
  dispatch(
    handleField("apply", componentJsonPath, "props.style", displayProps)
  );
};



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
   
      selectpress: {
        ...getSelectField({
          label: {
            labelName: "Select Press",
            labelKey: "PR_Select_Press_LABEL"
          },
          placeholder: {
             labelName: "Select Press",
            labelKey: "PR_Select_Press_LABEL"
          },
          jsonPath:
            "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipMajorType",
        
         
          required: true,
          sourceJsonPath: "applyScreenMdmsData.DropdownsData.OwnershipCategory",
          gridDefination: {
            xs: 12,
            sm: 12,
            md: 6
          },
          props:{
            className:"applicant-details-error",
			multiselect:"multiselect"
          }
        }),
        beforeFieldChange: (action, state, dispatch) => {
          let path = action.componentJsonpath.replace(
            /.applicantType$/,
            ".applicantSubType"
          );
          let applicantType = get(
            state,
            "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.OwnerShipCategory",
            []
          );
          let applicantSubType = applicantType.filter(item => {
            return item.active && item.code.startsWith(action.value);
          });
         // dispatch(handleField("apply", path, "props.data", applicantSubType));
        }
      }
     
  })
});
