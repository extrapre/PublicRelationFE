
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId, getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import set from "lodash/set";
import store from "redux/store";
import { httpRequest } from "./api";

const role_name = JSON.parse(getUserInfo()).roles[0].code

export const getTenderGridData = async () => {


  let queryObject = [];


  let requestBody = {
    "RequestBody": {
      "tenantId": getTenantId(),
      "tenderNoticeUuid": "",
      "tenderNoticeStatus": "CREATED",
    }
  }
  try {
    const payload = await httpRequest(
      "post",
      "/prscp-services/v1/tender/_get",
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
    //  store.dispatch(toggleSnackbar(true, error.message, "error"));
  }
};

export const getBillingGrid = async () => {

  let queryObject = [];
  let requestBody = {
    "RequestBody": {
      "tenantId": getTenantId(),
      "tenderNoticeUuid": "",
      "tenderNoticeStatus": "FORWARD",
    }
  }

  try {
    const payload = await httpRequest(
      "post",
      "/prscp-services/v1/tender/_get",
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
    //  store.dispatch(toggleSnackbar(true, error.message, "error"));
  }
};

export const getPublishTenderGrid = async () => {

  let queryObject = [];
  let requestBody = {
    "RequestBody": {
      "tenantId": getTenantId(),
      "tenderNoticeUuid": "",
      "tenderNoticeStatus": "CREATED",
    }
  }

  try {
    const payload = await httpRequest(
      "post",
      "/prscp-services/v1/tender/_get",
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
    //  store.dispatch(toggleSnackbar(true, error.message, "error"));
  }
};

export const createTender = async data => {
  
  try {
    const response = await httpRequest(
      "post",
      "/prscp-services/v1/tender/_create",
      "",
      [],
      data
    );
    //alert(JSON.stringify(response));
    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};

export const forwardTender = async data => {
  
  try {
    const response = await httpRequest(
      "post",
      "http://192.168.12.132:8079/prscp-services/v1/tender/_forward",
      "",
      [],
      data
    );
    //alert(JSON.stringify(response));
    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};

export const publishTender = async data => {
  
  try {
    const response = await httpRequest(
      "post",
      "http://192.168.12.132:8079/prscp-services/v1/tender/_publish",
      "",
      [],
      data
    );
    //alert(JSON.stringify(response));
    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};

export const getSearchResultsForTenderSummary = async data => {
  try {
    
    const response = await httpRequest(
      "post",
      "http://192.168.12.132:8079/prscp-services/v1/tender/_get",
      "",
      [],
      data
    );
   
    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};

export const getSearchResultsTender = async queryObject => {

 
  try {
    
    const response = await httpRequest(
      "post",
      "http://192.168.12.132:8079/prscp-services/v1/tender/_get",
      "",
      [],
      data
    );
    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};

export const furnishNocResponseTender = response => {
  // Handle applicant ownership dependent dropdowns
  let refurnishresponse = {};
  
  if (response.ResponseBody[0] !== null && response.ResponseBody[0] !== '') {
    let startdate = response.ResponseBody[0].tenderDate
    startdate = startdate.split(' ');
   
    set(refurnishresponse, "tenderDate", startdate);
    set(refurnishresponse, "fileNumber", response.ResponseBody[0].fileNumber);

    set(refurnishresponse, "tenderSubject", response.ResponseBody[0].tenderSubject);
    set(refurnishresponse, "noteContent", response.ResponseBody[0].noteContent);
    set(refurnishresponse, "tenderDocument", response.ResponseBody[0].tenderDocument);

    return refurnishresponse;
  }
};