import {
  getBreak,
  getCommonCard,
  getCommonParagraph,
  getCommonTitle,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";

export const documentDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "External Guests",
      labelKey: "PR_EXTERNAL_GUESTS_EXCEL"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  subText: getCommonParagraph({
    labelName:
      "Only excel file can be uploaded. 2MB max file size.",
    labelKey: "PR_INVITE_DOCUMENT_DETAILS_SUBTEXT"
  }),
  break: getBreak(),
  documentList: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-noc",
    componentPath: "DocumentListContainer",
    props: {
      documents: [
        {
          name: "Identity Proof ",
          required: true,
          jsonPath: "noc.documents.identityProof",
          selector: {
            inputLabel: "Select Document",
            menuItems: [
              { value: "AADHAAR", label: "Aadhaar Card" },
              { value: "VOTERID", label: "Voter ID Card" },
              { value: "DRIVING", label: "Driving License" }
            ]
          }
        },
        {
          name: "Address Proof ",
          required: true,
          jsonPath: "noc.documents.addressProof",
          selector: {
            inputLabel: "Select Document",
            menuItems: [
              { value: "ELECTRICITYBILL", label: "Electricity Bill" },
              { value: "DL", label: "Driving License" },
              { value: "VOTERID", label: "Voter ID Card" }
            ]
          }
        },
        {
          name: "Site Plan ",
          jsonPath: "Trade[0].businessProof"
        },
        {
          name: "Ground Floor Plan ",
          jsonPath: "Trade[0].businessProof"
        },
        {
          name: "Owner's Checklist as per NBC ",
          jsonPath: "Trade[0].businessProof"
        },
        {
          name: "Copy of Provisional  ",
          jsonPath: "Trade[0].businessProof"
        }
      ],
      buttonLabel: {
        labelName: "UPLOAD FILE",
        labelKey: "PR_DOCUMENT_UPLOAD_FILE"
      },
       description: "Only .jpg and .pdf files. 2MB max file size.",
      inputProps: {
        accept: ".pdf,.png,.jpeg,.zip,WAV, AIFF, AU, PCM or BWF, mp3"
      },
      maxFileSize: 2000
    },
    type: "array"
  },
  break: getBreak(),
     downloadcard: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-pr",
          componentPath: "SampleDownload"
        },
  break: getBreak(),
  Submit: {
			componentPath: "Button",
			props: {
			  variant: "contained",
			  color: "primary",
			  style: {
			   // minWidth: "200px",
				height: "48px",
				marginRight: "45px"
			  }
			},
			break : getBreak(),
			children: {
			  nextButtonLabel: getLabel({
				labelName: "Submit",
				labelKey: "PR_SUBMIT_GUEST"
			  }),
			  nextButtonIcon: {
				uiFramework: "custom-atoms",
				componentPath: "Icon",
				props: {
				  iconName: "keyboard_arrow_right"
				}
			  }
			},
			onClickDefination: {
			  action: "condition",
			}
		}
});
