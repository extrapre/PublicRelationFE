import React, {Component} from 'react';
//import React from 'react'
import axios, { post } from 'axios';
import { httpRequest, baserequestURL } from "../../ui-utils";

import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getapplicationNumber,seteventid,seteventuuid, getapplicationType, getTenantId, getUserInfo, setapplicationNumber, lSRemoveItemlocal, lSRemoveItem, localStorageGet, setapplicationMode, localStorageSet } from "egov-ui-kit/utils/localStorageUtils";
class UploadExternalGuests extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
  console.log("submitttttttt");
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
		console.log("filesssssssssssssssss");
		
	console.log(this.state.file);
     // console.log(response.data);
    })
  }
  onChange(e) {
	console.log("filesssssssssssssssss");
	console.log(e.target.files[0]);
    this.setState({file:e.target.files[0]})
  }
  async fileUpload(file){
 
     const url = baserequestURL +'/prscp-services/v1/invitation/guest/_upload';
     //const url = 'http://192.168.12.124:8079/prscp-services/v1/invitation/guest/_upload';
     //const url = 'http://192.168.12.113:8079/prscp-services/v1/invitation/guest/_upload';
     
     const formData = new FormData();
   
    
    formData.append('uploadfile',file)
    formData.append('eventDetailUuid',localStorageGet("eventifforinvitatoin"))
    formData.append('eventGuestType',"External")
    formData.append('tenantId',getTenantId())
    formData.append('userUuid',"123")
    formData.append('moduleCode',localStorageGet("modulecode"))

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    post(url, formData,config).then(response => {
		console.log("responseeeeeeeeee");
		;
		console.log(response)
		if(response.data.ResponseInfo.status === "Success")
		{
			window.location.reload();
		}
		else if(response.Errors[0].code === "EVENTINVITATION_EXCEPTION")
		{
			alert("Invalid File format")
		}
		else
		{
			alert("Invalid File format")
		}
	
	}).catch(error => {
    alert("Invalid File")
  });
	
	
	
	// let queryObject = [];
  // var data = {
    // "tenantId": `${getTenantId()}`,
    // "RequestBody": {formData}

  // }

  // try {
    // const payload = await httpRequest(
      // "post",
      // " /prscp-services/invitation/guest/_upload",
      // "",
      // queryObject,
      // formData,
	  // config
    // );
   
	// console.log("Sampleeeeeeeeeeeeeeeeee");
	// console.log(payload);
	
	// if(payload.RequestInfo.status === "Success")
	// {
		// alert("File uploaded successfully");
	// }
	
   // return payload;
  // } catch (error) {
    // //  store.dispatch(toggleSnackbar(true, error.message, "error"));
  // }
  
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
       
        <input type="file" onChange={this.onChange} />
			<h3> </h3>
        <button type="submit"  className="MuiButtonBase-root-47 MuiButton-root-21 MuiButton-contained-32 MuiButton-containedPrimary-33 MuiButton-raised-35 MuiButton-raisedPrimary-36">SUBMIT</button>
      </form>
   )
  }
}


export default UploadExternalGuests;
