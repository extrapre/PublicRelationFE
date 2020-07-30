import {
  getBreak,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { gotoApplyWithTender } from "../../utils/index";
import {
  sortByEpoch,
  getEpochForDate,
  getTextToLocalMapping,
  getfullwidthLabelWithValue
} from "../../utils";
export const tenderSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        ...getCommonSubHeader({
          labelName: "Tender Notice Details",
          labelKey: "PR_TENDER_NOTICE_DETAILS"//"TENDER_NOTICE_DETAILS_HEADER"
        })
      },
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
        gridDefination: {
          xs: 4,
          align: "right"
        },
        children: {
          editIcon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: "edit"
            }
          },
          buttonLabel: getLabel({
            labelName: "Edit",
            labelKey: "PR_TENDER_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            gotoApplyWithTender(state, dispatch, 0);
          }
        }
      }
    }
  },
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        applicantContainer: getCommonContainer({

          date: getLabelWithValue(
            {
              labelName: "Date",
              labelKey: "PR_TENDER_DETAILS_DATE"
            },
            {
              jsonPath: "tenderDetails[0].tenderDate",

            }
          ),
          fileNumber: getLabelWithValue(
            {
              labelName: "File Number",
              labelKey: "PR_TENDER_DETAILS_FILE_NUMBER"
            },
            {
              jsonPath: "tenderDetails[0].fileNumber",

            }
          )
        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "ResponseBody",
     
    },
    type: "array"
  },
  cardTwo: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        applicantContainer: getCommonContainer({
          subject: getLabelWithValue(
            {
              labelName: "Subject",
              labelKey: "PR_TENDER_DETAILS_SUBJECT"
            },
            {
              jsonPath: "tenderDetails[0].tenderSubject",
            }
          )
        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "ResponseBody",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 12
      }
     
    },
    type: "array"
  },
  header2: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        ...getCommonSubHeader({
          labelName: "Note",
          labelKey: "PR_TENDER_NOTICE_NOTE"
        })
      }
    }
  },
  cardThree: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        applicantContainer: getCommonContainer({

          note: getLabelWithValue(
            {
              labelName: "Tender Details",
              labelKey: "PR_TENDER_DETAILS"
            },
            {
              jsonPath: "tenderDetails[0].noteContent",
            }
          ),
        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "ResponseBody",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 12
      }
    
    },
    type: "array"
  }
});

export const tenderPublishSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        ...getCommonSubHeader({
          labelName: "Tender Notice Details",
          labelKey: "PR_TENDER_NOTICE_DETAILS_HEADER"
        })
      },
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
        gridDefination: {
          xs: 4,
          align: "right"
        },
        children: {
          editIcon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: "edit"
            }
          },
          buttonLabel: getLabel({
            labelName: "Edit",
            labelKey: "PR_TENDER_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            gotoApplyWithTender(state, dispatch, 0);
           
          }
        }
        
      }
    }
  },
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        applicantContainer: getCommonContainer({

          date: getLabelWithValue(
            {
              labelName: "Date",
              labelKey: "PR_TENDER_DETAILS_DATE"
            },
            {
              jsonPath: "tenderDetails[0].tenderDate",
              callBack: value => {
                return value===undefined?"":value.split(" ")[0];
              }
            },
           
          ),
          fileNumber: getLabelWithValue(
            {
              labelName: "File Number",
              labelKey: "PR_TENDER_DETAILS_FILE_NUMBER"
            },
            {
              jsonPath: "tenderDetails[0].fileNumber",
            }
          ),
          departmentUser: getLabelWithValue(
            {
              labelName: "Department User",
              labelKey: "PR_TENDER_DETAILS_DEPARTMENT_USER"
            },
            {
             jsonPath: "tenderDetails[0].userType",
            }
          )
        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "ResponseBody",
    
    },
    type: "array"
  },
  cardTwo: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        applicantContainer: getCommonContainer({
          subject: getLabelWithValue(
            {
              labelName: "Subject",
              labelKey: "PR_TENDER_DETAILS_SUBJECT"
            },
            {
              jsonPath: "tenderDetails[0].tenderSubject",
            }
          )
        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "ResponseBody",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 12
      }
      // prefixSourceJsonPath:
      //   "children.cardContent.children.applicantContainer.children",
      // afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  },
  // cardThree: {
  //   uiFramework: "custom-containers",
  //   componentPath: "MultiItem",
  //   props: {
  //     className: "applicant-summary",
  //     scheama: getCommonGrayCard({
  //       // applicantContainer: getCommonContainer({

  //       //   note: getLabelWithValue(
  //       //     {
  //       //       labelName: "Tender Details",
  //       //       labelKey: "PR_TENDER_DETAILS"
  //       //     },
           
  //           // {
  //             // jsonPath: "tenderDetails[0].noteContent",
  //           // }
  //         ),
  //        test: {
  //         uiFramework: "custom-molecules-local",
  //              moduleName: "egov-pr",
  //              componentPath: "HTMLContent",
  //              props: { label : "tendernote"}
  //      }, 
       
  //      gridDefination: {
  //          xs: 12,
  //          sm: 12
  //        }


        
  //     }),
  //     items: [],
  //     hasAddItem: false,
  //     isReviewPage: true,
  //     sourceJsonPath: "ResponseBody",
  //     gridDefination: {
  //       xs: 12,
  //       sm: 12,
  //       md: 12
  //     }
  //     // prefixSourceJsonPath:
  //     //   "children.cardContent.children.applicantContainer.children",
  //     // afterPrefixJsonPath: "children.value.children.key"
  //   },
  //   type: "array"
  // },
  // tendersubject: {
  //    uiFramework: "custom-molecules-local",
  //         moduleName: "egov-pr",
  //         componentPath: "HTMLContent",
  //         props: { label : "noteContent"}
  // }, 
  cardThree: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        applicantContainer: getCommonContainer({

          note: getLabelWithValue(
            {
              labelName: "Tender Details",
              labelKey: "PR_TENDER_DETAILS"
            },
           
            // {
              // jsonPath: "tenderDetails[0].noteContent",
            // }
          ),
        })



        
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "ResponseBody",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 12
      }
      // prefixSourceJsonPath:
      //   "children.cardContent.children.applicantContainer.children",
      // afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  },
  tendersubject: {
     uiFramework: "custom-molecules-local",
          moduleName: "egov-pr",
          componentPath: "HTMLContent",
          props: { label : "noteContent"}
  }, 
  
});

export const tenderBillingSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        ...getCommonSubHeader({
          labelName: "Tender Notice Details",
          labelKey: "PR_TENDER_NOTICE_DETAILS_HEADER"
        })
      },
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
        gridDefination: {
          xs: 4,
          align: "right"
        }

      }
    }
  },
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        applicantContainer: getCommonContainer({
          publication: getLabelWithValue(
            {
              labelName: "Publication Name",
              labelKey: "PR_TENDER_PUBLICATION_NAME"
            },
            {
              jsonPath: "tenderDetails[0].tenderDate",

            }
          ),
          date: getLabelWithValue(
            {
              labelName: "Date",
              labelKey: "PR_TENDER_DETAILS_DATE"
            },
            {
              jsonPath: "tenderDetails[0].tenderDate",

            }
          ),
          fileNumber: getLabelWithValue(
            {
              labelName: "File Number",
              labelKey: "PR_TENDER_DETAILS_FILE_NUMBER"
            },
            {
              jsonPath: "tenderDetails[0].tenderDate",

            }
          ),
          publicationsize: getLabelWithValue(
            {
              labelName: "Size of Publication",
              labelKey: "TENDER_PUBLICATION_SIZE"
            },
            {
              jsonPath: "tenderDetails[0].tenderDate",

            }
          ),
        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "ResponseBody",
      // prefixSourceJsonPath:
      //   "children.cardContent.children.applicantContainer.children",
      // afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  }
});

export const tenderBillingSubjectSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        }
      },
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
        gridDefination: {
          xs: 4,
          align: "right"
        }

      }
    }
  },
  cardTwo: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        applicantContainer: getCommonContainer({
          subject: getLabelWithValue(
            {
              labelName: "Subject",
              labelKey: "PR_TENDER_DETAILS_SUBJECT"
            },
            {
              jsonPath: "tenderDetails[0].tenderDate",

            }
          )
        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "ResponseBody",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 12
      }
     
    },
    type: "array"
  }
});

export const tenderBillingNoteSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        ...getCommonSubHeader({
          labelName: "Tender Note",
          labelKey: "PR_TENDER_NOTICE_NOTE"
        })
      },
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
        gridDefination: {
          xs: 4,
          align: "right"
        }

      }
    }
  },
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        applicantContainer: getCommonContainer({
          publication: getLabelWithValue(
            {
              labelName: "Tender Details",
              labelKey: "PR_TENDER_DETAILS"
            },
            {
              jsonPath: "tenderDetails[0].tenderDate",

            }
          )
        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "ResponseBody",
      },
    type: "array"
  }
});