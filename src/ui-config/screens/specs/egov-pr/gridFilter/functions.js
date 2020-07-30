import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getEventFilterResults,getPressMasterFilterResults,getPressFilterResults,getTenderFilterResults} from "../../../../../ui-utils/commons";
import { convertEpochToDate, convertDateToEpoch } from "../../utils/index";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { validateFields, getTextToLocalMapping } from "../../utils";
import { getGridData } from "../searchResource/citizenSearchFunctions";
import { httpRequest } from "../../../../../ui-utils";
import { localStorageGet, getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import {  getUserInfo  } from "egov-ui-kit/utils/localStorageUtils";
import commonConfig from '../../../../../config/common';


import { checkForRole } from "../../../../../ui-utils/commons";


 
const convertTime =(time)=> {
  // Check correct time format and split into components
  
  //time=time+":00"
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)?$/) || [time];
  
  if (time.length > 1) { // If time format correct
  time = time.slice(1); // Remove full string match value
  time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
  time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
  }
  const truncTime=(str, length, ending)=> {
    if (length == null) {
      length = 20;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };
///eventFilter

export const searchEventApiCall = async (state, dispatch) => {

  let tenantId = getTenantId();
  let startDate=get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterEvent.fromDate"
  )
  let endDate=get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterEvent.toDate"
  )
  
  if((startDate!="" && endDate!="") && endDate<startDate)
  {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "From Date should be less than todate",
          labelKey: "ERR_FILL_FROM_DATE_<_TODATE"
        },
        "warning"
      )
    );
  }
  else{
let data= {"requestBody":{
  "tenantId":tenantId,
  "moduleCode":localStorageGet("modulecode"),
 "eventDetailUuid":"",
  "eventTitle":get(
  state.screenConfiguration.preparedFinalObject,
  "PublicRelation[0].filterEvent.eventTitle"
) || "",
 
  "eventStatus":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterEvent.Eventstatus"
  )==="ALL"?"":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterEvent.Eventstatus"
  ) || "",
  "status":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterEvent.Scedulestatus"
  )==="ALL"?"":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterEvent.Scedulestatus"
  ) || "",
  "startDate":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterEvent.fromDate"
  )|| "",
  "endDate":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterEvent.toDate"
  ) || "",
  "eventId":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterEvent.eventId"
  ) || "",
  "defaultGrid":false
}}

const response = await getEventFilterResults(data);
//alert(JSON.stringify(response))
let mdmsBody = {
  MdmsCriteria: {
    tenantId: commonConfig.tenantId,
    moduleDetails: [
      {
        moduleName: "RAINMAKER-PR",
        masterDetails: [{ name: "eventType" }, { name: "eventStatus" },{ name: "eventDocuments" },  { name: "eventSector" },, { name: "localityAreaName" }]
      },
     
      {
        moduleName: "tenant",
        masterDetails: [
          {
            name: "tenants"
          }
        ]
      },


      {
        moduleName: "tenant",
        masterDetails: [
          {
            name: "tenants"
          }
        ]
      },
      {
        moduleName: "common-masters",
        masterDetails: [
          {
            name: "Department"
          }
        ]
      },
    ]
  }
};
  let payload = null;
  payload = await httpRequest(
    "post",
    "/egov-mdms-service/v1/_search",
    "_search",
    [],
    mdmsBody
  );
  


  for(let i=0;i<payload.MdmsRes["common-masters"].Department.length;i++)
  {
    for(let j=0;j<response.ResponseBody.length;j++)
    {
if(response.ResponseBody[j].organizerDepartmentName===payload.MdmsRes["common-masters"].Department[i].code)
{
response.ResponseBody[j]['EmpName']=payload.MdmsRes["common-masters"].Department[i].name
}
    }

  }
  
  let data1 = response.ResponseBody.map(item => ({
    
    
          [getTextToLocalMapping("Event Id")]:
          item.eventId || "-",
          [getTextToLocalMapping("Event Title")]:
          truncTime(item.eventTitle) || "-",
          [getTextToLocalMapping("Organizer Department")]:
          item.EmpName|| "-",
          [getTextToLocalMapping("Organizer Employee")]:
          item.organizerUsernName || "-",
        [getTextToLocalMapping("Date & Time")]:item.startDate.split(" ")[0] +" "+convertTime(item.startTime)+" "+"To"+" "+item.endDate.split(" ")[0] +" "+convertTime(item.endTime) || "-",
       [getTextToLocalMapping("Schedule Status")]:
          item.status || "-",
          [getTextToLocalMapping("Event Status")]:
          item.eventStatus || "-",
          [getTextToLocalMapping("Event UUID")]:
          item.eventDetailUuid || "-",
         }));
        
         dispatch(
           handleField(
             "search",
             "components.div.children.searchResults",
             "props.data",
             data1
           )
         );
      
       
    //}
        }
};



export const searchLibraryApiCall = async (state, dispatch) => {
  
  let tenantId = getTenantId();
  let startDate=get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterLibraryEvent.fromDate"
  )
  let endDate=get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterLibraryEvent.toDate"
  )
  if((startDate!="" && endDate!="") && endDate<startDate)
  {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "From Date should be less than todate",
          labelKey: "ERR_FILL_FROM_DATE_<_TODATE"
        },
        "warning"
      )
    );
  }
  else{
  let data= {"requestBody":{
    
    "tenantId": tenantId,
    "moduleCode":localStorageGet("modulecode"),
    "status":"EXPIRED",
   "eventDetailUuid":"",
 
   "defaultGrid":false,
   
   "eventId":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterLibraryEvent.eventId"
  ) || "",
    "eventTitle":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterLibraryEvent.eventTitle"
  ) || "",
    
    "eventStatus":"PUBLISHED",
    
    "startDate":get(
      state.screenConfiguration.preparedFinalObject,
      "PublicRelation[0].filterLibraryEvent.fromDate"
    ) || "",
    "endDate":get(
      state.screenConfiguration.preparedFinalObject,
      "PublicRelation[0].filterLibraryEvent.toDate"
    ) || "",
    "eventId":get(
      state.screenConfiguration.preparedFinalObject,
      "PublicRelation[0].filterLibraryEvent.eventId"
    ) || "",
  }}
  
  const response = await getEventFilterResults(data);
  //alert(JSON.stringify(response))
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        {
          moduleName: "RAINMAKER-PR",
          masterDetails: [{ name: "eventType" }, { name: "eventStatus" },{ name: "eventDocuments" },  { name: "eventSector" },, { name: "localityAreaName" }]
        },
       
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants"
            }
          ]
        },
  
  
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants"
            }
          ]
        },
        {
          moduleName: "common-masters",
          masterDetails: [
            {
              name: "Department"
            }
          ]
        },
      ]
    }
  };
    let payload = null;
    payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    
  
  
    for(let i=0;i<payload.MdmsRes["common-masters"].Department.length;i++)
    {
      for(let j=0;j<response.ResponseBody.length;j++)
      {
  if(response.ResponseBody[j].organizerDepartmentName===payload.MdmsRes["common-masters"].Department[i].code)
  {
  response.ResponseBody[j]['EmpName']=payload.MdmsRes["common-masters"].Department[i].name
  }
      }
  
    }
    let data1 = response.ResponseBody.map(item => ({
    
        [getTextToLocalMapping("Event Id")]:
        item.eventId || "-",
        [getTextToLocalMapping("Event Title")]:
        truncTime(item.eventTitle) || "-",
        [getTextToLocalMapping("Organizer Department")]:
        item.EmpName|| "-",
        [getTextToLocalMapping("Organizer Employee")]:
        item.organizerUsernName || "-",
     [getTextToLocalMapping("Date & Time")]:item.startDate.split(" ")[0] +" "+convertTime(item.startTime)+" "+"To"+" "+item.endDate.split(" ")[0] +" "+convertTime(item.endTime) || "-",
       [  getTextToLocalMapping("Schedule Status")]:
        item.status || "-",
        [getTextToLocalMapping("Event Status")]:
        item.eventStatus || "-",
        [getTextToLocalMapping("Event UUID")]:
        item.eventDetailUuid || "-",
      

     
      
     }));
  //  alert(JSON.stringify(data))
     dispatch(
       handleField(
         "library-search",
         "components.div.children.searchResultsLibrary",
         "props.data",
         data1
       )
     );
        
         
      //}
    }  
  };
  
  

export const searchInviteApiCall = async (state, dispatch) => {
  
  let scheduledStatus=get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterInviteEvent.Scedulestatus"
  )

  let tenantId = getTenantId();
  let startDate=get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterInviteEvent.fromDate"
  )
  let endDate=get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterInviteEvent.toDate"
  )
  if((startDate!="" && endDate!="") && endDate<startDate)
  {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "From Date should be less than todate",
          labelKey: "ERR_FILL_FROM_DATE_<_TODATE"
        },
        "warning"
      )
    );
  }
  else{
let data= {"requestBody":{
  "tenantId":tenantId,
  "moduleCode":localStorageGet("modulecode"),
 "eventDetailUuid":"",
  "eventTitle":get(
  state.screenConfiguration.preparedFinalObject,
  "PublicRelation[0].filterInviteEvent.eventTitle"
),
  
"eventStatus":get(
  state.screenConfiguration.preparedFinalObject,
  "PublicRelation[0].filterInviteEvent.Eventstatus"
)==="ALL"?"":get(
  state.screenConfiguration.preparedFinalObject,
  "PublicRelation[0].filterInviteEvent.Eventstatus"
),
"status":get(
  state.screenConfiguration.preparedFinalObject,
  "PublicRelation[0].filterInviteEvent.Scedulestatus"
)==="ALL"?"":get(
  state.screenConfiguration.preparedFinalObject,
  "PublicRelation[0].filterInviteEvent.Scedulestatus"
),
  "startDate":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterInviteEvent.fromDate"
  ),
  "endDate":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterInviteEvent.toDate"
  ),
  "eventId":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterInviteEvent.eventId"
  ),
}}
const response = await getEventFilterResults(data);
let mdmsBody = {
  MdmsCriteria: {
    tenantId: commonConfig.tenantId,
    moduleDetails: [
      {
        moduleName: "RAINMAKER-PR",
        masterDetails: [{ name: "eventType" }, { name: "eventStatus" },{ name: "eventDocuments" },  { name: "eventSector" },, { name: "localityAreaName" }]
      },
     
      {
        moduleName: "tenant",
        masterDetails: [
          {
            name: "tenants"
          }
        ]
      },


      {
        moduleName: "tenant",
        masterDetails: [
          {
            name: "tenants"
          }
        ]
      },
      {
        moduleName: "common-masters",
        masterDetails: [
          {
            name: "Department"
          }
        ]
      },
    ]
  }
};
  let payload = null;
  payload = await httpRequest(
    "post",
    "/egov-mdms-service/v1/_search",
    "_search",
    [],
    mdmsBody
  );
  


  for(let i=0;i<payload.MdmsRes["common-masters"].Department.length;i++)
  {
    for(let j=0;j<response.ResponseBody.length;j++)
    {
if(response.ResponseBody[j].organizerDepartmentName===payload.MdmsRes["common-masters"].Department[i].code)
{
response.ResponseBody[j]['EmpName']=payload.MdmsRes["common-masters"].Department[i].name
}
    }

  }
  
  	const eventarray = response.ResponseBody.filter((el) => {
			return (el.status !== "EXPIRED" && el.eventStatus !== "CANCELLED");
	});	
  let data1 = eventarray.map(item => ({
  
    [getTextToLocalMapping("Event Id")]:
   item.eventId || "-",
   [getTextToLocalMapping("Event Title")]:
   truncTime(item.eventTitle) || "-",
   [getTextToLocalMapping("Organizer Department")]:
   item.EmpName|| "-",
   [getTextToLocalMapping("Organizer Employee")]:
   item.organizerUsernName || "-",
 [getTextToLocalMapping("Date & Time")]:item.startDate.split(" ")[0] +" "+convertTime(item.startTime)+" "+"To"+" "+item.endDate.split(" ")[0] +" "+convertTime(item.endTime) || "-",
[getTextToLocalMapping("Schedule Status")]:
   item.status || "-",
   [getTextToLocalMapping("Event Status")]:
   item.eventStatus || "-",
   [getTextToLocalMapping("Event UUID")]:
   item.eventDetailUuid || "-",
  }));
  
 
  dispatch(
    handleField(
      "eventList",
      "components.div.children.eventlistforinvitation",
      "props.data",
      data1
    )
  );
   // }
}
};


export const searchPressApiCall = async (state, dispatch) => {
 // alert('aaa')
let data= {"RequestBody":{ 
  "tenantId":getTenantId(),
  "pressNoteUuid":"",
  "moduleCode":localStorageGet("modulecode"),
  "filenumber":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterpress.fileNumber"
  ),
  "pressNoteSubject":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterpress.subject"
  ),
  "fromDate":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterpress.fromDate"
  ),
   "toDate":get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filterpress.toDate"
  )
  ,
  "defaultGrid":false
 }}
 let fromDate=get(
  state.screenConfiguration.preparedFinalObject,
  "PublicRelation[0].filterpress.fromDate"
);
let toDate=get(
  state.screenConfiguration.preparedFinalObject,
  "PublicRelation[0].filterpress.toDate"
);

 
 if(fromDate!==undefined && toDate!==undefined)
 {
  var date1 = new Date(fromDate);
  var date2 = new Date(toDate);
   if( fromDate<=toDate)
   {
const response = await getPressFilterResults(data);
let data1 = response.ResponseBody.map(item => ({
    [getTextToLocalMapping("Date")]:
    item.pressNoteDate || "-",
    [getTextToLocalMapping("File Number")]:
    item.fileNumber || "-",
    [getTextToLocalMapping("Subject")]:
    truncTime(item.pressNoteSubject) || "-",
    [getTextToLocalMapping("Press Note List UUID")]:
    item.pressNoteUuid || "-",
  
    
   }));
   dispatch(
     handleField(
       "pressNoteList",
       "components.div.children.searchResultsPressList",
       "props.data",
       data1
     )
   );
 }

else{
  dispatch(
    toggleSnackbar(
      true,
      {
        labelName: "From Date should be less than todate",
        labelKey: "ERR_FILL_FROM_DATE_<_TODATE"
      },
      "warning"
    )
  );
}
}
else{
 const response = await getPressFilterResults(data);
let data1 = response.ResponseBody.map(item => ({
    [getTextToLocalMapping("Date")]:
    item.pressNoteDate || "-",
    [getTextToLocalMapping("File Number")]:
    item.fileNumber || "-",
    [getTextToLocalMapping("Subject")]:
    truncTime(item.pressNoteSubject) || "-",
    [getTextToLocalMapping("Press Note List UUID")]:
    item.pressNoteUuid || "-",
  
    
   }));
   dispatch(
     handleField(
       "pressNoteList",
       "components.div.children.searchResultsPressList",
       "props.data",
       data1
     )
   );
}
  
};










export const searchTenderApiCall = async (state, dispatch) => {
  let startDate=get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filtertender.fromDate"
  )
  let endDate=get(
    state.screenConfiguration.preparedFinalObject,
    "PublicRelation[0].filtertender.toDate"
  )
  if((startDate!="" && endDate!="") && endDate<startDate)
  {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "From Date should be less than todate",
          labelKey: "ERR_FILL_FROM_DATE_<_TODATE"
        },
        "warning"
      )
    );
  }
  else{
  let data= {"RequestBody":{ 
    "tenantId":getTenantId(),
    "pressNoteUuid":"",
    "moduleCode":localStorageGet("modulecode"),
    "filenumber":get(
      state.screenConfiguration.preparedFinalObject,
      "PublicRelation[0].filtertender.fileNumber"
    ) ||"",
    "tenderSubject":get(
      state.screenConfiguration.preparedFinalObject,
      "PublicRelation[0].filtertender.subject"
    ) ||"",
    "fromDate":get(
      state.screenConfiguration.preparedFinalObject,
      "PublicRelation[0].filtertender.fromDate"
    ) ||"",
     "toDate":get(
      state.screenConfiguration.preparedFinalObject,
      "PublicRelation[0].filtertender.toDate"
    ) ||"",
   
    "tenderNoticeStatus":checkForRole(JSON.parse(getUserInfo()).roles, 'DEPARTMENTUSER')?"CREATED":"",
    "tenderNoticeUuid":"",
    "tenderNoticeId":get(
      state.screenConfiguration.preparedFinalObject,
      "PublicRelation[0].filtertender.tenderId"
    ) ||"",
    
  
   }}
  
  const response = await getTenderFilterResults(data);
  
    
  
  
    
  let data1= response.ResponseBody.map(item => ({
    [getTextToLocalMapping("Tender Notice ID")]:item.tenderNoticeId || "-",
    [getTextToLocalMapping("Date")]:item.tenderDate.split(" ")[0] || "-",
    [getTextToLocalMapping("File Number")]:item.fileNumber || "-",
    [getTextToLocalMapping("Subject")]:truncTime(item.tenderSubject)|| "-",
    [getTextToLocalMapping("Department User")]:item.createdByName || "-",
    [getTextToLocalMapping("tenderNoticeUuid")]:item.tenderNoticeUuid || "-",
    [getTextToLocalMapping("tenderNoticeStatus")]:item.tenderNoticeStatus || "-"
    
    
  }));
 
  dispatch(
    handleField(
      "TenderSearch",
      "components.div.children.publishTenderSearchResults",
      "props.data",
      data1
    )
  );
}
};






export const searchPressMasterApiCall = async (state, dispatch) => {
  
  
let data= {
  "RequestBody":{ 
    "tenantId":getTenantId(),
    "pressMasterUuid": "",
    "personnelName":get(
      state.screenConfiguration.preparedFinalObject,
      "PublicRelation[0].filterpressMaster.personnelname"
    ),
    "publicationName":get(
      state.screenConfiguration.preparedFinalObject,
      "PublicRelation[0].filterpressMaster.publicationname"
    ),
    "pressType": get(
      state.screenConfiguration.preparedFinalObject,
      "PublicRelation[0].filterpressMaster.typeofpress"
    )==="ALL"?"":get(
      state.screenConfiguration.preparedFinalObject,
      "PublicRelation[0].filterpressMaster.typeofpress"
    ),
    "moduleCode":localStorageGet("modulecode")
   },
}

const response = await getPressMasterFilterResults(data);
//alert(JSON.stringify(response))

let data1 = response.ResponseBody.map(item => ({
  [getTextToLocalMapping("Press Id")]:
  item.pressMasterUuid || "-",
  [getTextToLocalMapping("Publication name")]:
  truncTime(item.publicationName) || "-",
  [getTextToLocalMapping("Type of the press")]:
  item.pressType || "-",
  [getTextToLocalMapping("Personnel Name")]:
  truncTime(item.personnelName) || "-",
  

  [getTextToLocalMapping("Email Id")]:
  item.email || "-",
[getTextToLocalMapping("Mobile No")]:item.mobile || "-",


 }));

 dispatch(
   handleField(
     "pressGrid",
     "components.div.children.pressGrid",
     "props.data",
     data1
   )
 );


  


  
   
  
};







