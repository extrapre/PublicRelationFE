import {
  getBreak,
  getCommonCard,
  getCommonParagraph,
  getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";

export const documentDetails = getCommonCard({
    documentList: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-pr",
    componentPath: "DocumentListContainer",
    required:true,
    props: {      
      buttonLabel: {
        labelName: "UPLOAD FILE",
        labelKey: "PR_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
      },
      description: "Only .jpg and .pdf files. 1MB max file size.",
      inputProps: {
        accept: ".quicktime,.ogg,.basic,.pdf,.png,.jpeg,.zip,.WAV,.wav,.AIFF, .aiff,.AU,.au,.PCM,.pcm,.BWF,.bwf,.mp3,.mpeg,.mp4,.M4P,.m4p,.m4v,.M4V, .MPG,.mpg,.mp2,.MP2,.MPE,.mpe,.MPV,.mpv,.MOV,.mov,.qt,.QT"
      },
      maxFileSize: 15000,

    },
    type: "array"
  } 

});

export const documentDetails1 = getCommonCard({
  documentList: {
  uiFramework: "custom-containers-local",
  moduleName: "egov-pr",
  componentPath: "DocumentListContainerCommunication",
  required:true,
  props: {      
    buttonLabel: {
      labelName: "UPLOAD FILE",
      labelKey: "PR_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
    },
    description: "Only .jpg and .pdf files. 1MB max file size.",
    inputProps: {
      accept: ".pdf,.png,.jpeg,.zip,.WAV,.wav,.AIFF, .aiff,.AU,.au,.PCM,.pcm,.BWF,.bwf,.mp3,.mpeg,.mp4,.M4P,.m4p,.m4v,.M4V, .MPG,.mpg,.mp2,.MP2,.MPE,.mpe,.MPV,.mpv,.MOV,.mov,.qt,.QT"
    },
    maxFileSize: 15000
  },
  type: "array"
} 

});
export const pressNotedocumentDetails = getCommonCard({
  subText: getCommonParagraph({
    labelName:
      "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload and 1MB max file size.",
    labelKey: "PR_EMAILDOCUMENT_DETAILS_SUBTEXT"
  }),
  break: getBreak(),
  documentList: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-pr",
    componentPath: "DocumentListContainer",
    required:true,
    props: {      
      buttonLabel: {
        labelName: "UPLOAD FILE",
        labelKey: "PR_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
      },
      description: "Only .jpg and .pdf files. 1MB max file size.",
      inputProps: {
        accept: ".pdf,.png,.jpeg"
      },
      maxFileSize: 2000
    },
    type: "array"
  } 

});



export const tenderDocumentDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Documents",
      labelKey: "PR_TENDER_DOCUMENT_DETAILS_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  subText: getCommonParagraph({
    labelName:
      "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
    labelKey: "NOC_DOCUMENT_DETAILS_SUBTEXT"
  }),
  break: getBreak(),
  documentList: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-pr",
    componentPath: "DocumentListContainer",
    required:true,
    props: {      
      buttonLabel: {
        labelName: "UPLOAD FILE",
        labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
      },
      description: "Only .jpg and .pdf files. 1MB max file size.",
      inputProps: {
        accept: ".pdf,.png,.jpeg,.zip,.WAV, .AIFF, .AU,.PCM,.BWF, .mp3,.mpeg"
      },
      maxFileSize: 1000
    },
    type: "array"
  } 

});

export const documentBillingDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Attach Bill",
      labelKey: "TENDER_PUBLISH_BILL_DOCUMENT"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  subText: getCommonParagraph({
    labelName:
      "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
    labelKey: "NOC_DOCUMENT_DETAILS_SUBTEXT"
  }),
  break: getBreak(),
  documentList: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-pr",
    componentPath: "DocumentListContainer",
    required:true,
    props: {      
      buttonLabel: {
        labelName: "UPLOAD FILE",
        labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
      },
      description: "Only .jpg and .pdf files. 1MB max file size.",
      inputProps: {
        accept: ".pdf,.png,.jpeg"
      },
      maxFileSize: 1000
    },
    type: "array"
  } 
});



// multiple ddocument 
export const MultipleDocumentDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Event Documents",
      labelKey: "PR_EVENT_DOCUMENTS"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  subText: getCommonParagraph({
    labelName:
      "Only image and .pdf files can be uploaded.Max file size 2MB each and 8 files can be uploaded.",
    labelKey: "PR_EVENTDOCUMENT_DETAILS_SUBTEXT"
  
  }),
  break: getBreak(),
  upload: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: {
        marginLeft: 8
      }
    },
    required: false,
    children: {
       uploadButton: {
        uiFramework: "custom-molecules",
        componentPath: "UploadMultipleFiles",
        props: {
          maxFiles: 8,
          jsonPath: "EventDocuments",
          inputProps: {
            //accept: ".pdf,.png,.jpeg,.zip,.WAV,.AIFF,.AU,.PCM,.BWF,.mp3,.mpeg,.mp4"
			 accept: ".pdf,.png,.jpeg"
          },
          buttonLabel: {
            labelName: "UPLOAD FILE",
			labelKey: "PR_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
          },
          maxFileSize: 2000,
          moduleName: "egov-pr",
          hasLocalization: false
        }
      }
    }
  }


});