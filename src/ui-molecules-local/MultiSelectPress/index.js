import React, { Component } from 'react';
import ReactDOM from "react-dom";
//import  MultiSelectReact  from 'multi-select-react';
import get from "lodash/get";
import set from "lodash/set";
import "./styles.css";
import {
  localStorageGet,
  localStorageSet,
  getTenantId
} from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../ui-utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Multiselect } from "multiselect-react-dropdown";

const styles = theme => ({
  root: {
    margin: "16px 8px",
    backgroundColor: theme.palette.background.paper
  }
});

class MultiSelectPress extends Component {
  constructor(props) {
    super(props);
	
	console.log("propsssssssssssss");
	console.log(props);
    this.state = {
      plainArray: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
      // objectArray: [
        // { key: "Option 1", cat: "Group 1" },
        // { key: "Option 2", cat: "Group 1" },
        // { key: "Option 3", cat: "Group 1" },
        // { key: "Option 4", cat: "Group 2" },
        // { key: "Option 5", cat: "Group 2" },
        // { key: "Option 6", cat: "Group 2" },
        // { key: "Option 7", cat: "Group 2" }
      // ],
	  objectArray : [],
      selectedValues: []
    };
	
	
    this.style = {
      chips: {
        background: "#FE7A51"
      },
      searchBox: {
        border: "none",
        borderBottom: "1px solid blue",
        borderRadius: "0px",
      },
      multiselectContainer: {
        color: "#FE7A51"
      },    
	optionListContainer:{
		"position" : "relative !important",
		"z-index" : "99999"
	}
	};
    this.addItem = this.addItem.bind(this);
    this.GetPressnames = this.GetPressnames.bind(this);
  }
  
  componentDidMount(){
		this.GetPressnames().then(response => {
		//	alert("Get Press Names in module")
			console.log("responsssssssssssssssss");
			console.log(response);
	  });
  }
  
  
// Get Departments 
  GetPressnames = async () => {
  let tenantId = getTenantId();
  let mdmsBody = {
    "tenantId": tenantId,
    "moduleCode": localStorageGet("modulecode"),
    "pressMasterUuid": "",
    "personnelName":"",
    "publicationName":"",
    "pressType": ""

  };
  try {
    let payload = null;
	payload = await httpRequest("post", "/prscp-services/v1/press/_get", "_get", [], { RequestBody: mdmsBody });
    //dispatch(prepareFinalObject("applyScreenMdmsData.departments", payload));
	console.log("Payloadddddddddddddddd");
	console.log(payload);
	let optionvalues = []
	  payload.ResponseBody.map(function(item, index) {
			let temp= item
			optionvalues.push(temp)
		});
		
		console.log("optionvalues");
		console.log(optionvalues);
	  this.setState({
		objectArray : optionvalues
	  })
  } catch (e) {
    console.log(e);
  }
};
  
  
  
  
  addItem() {
    this.selectedValues.push({ key: "Option 3", cat: "Group 1" });
  }

	onSelect(selectedList, selectedItem) {
		//alert("selected")
		console.log(selectedList)
		console.log(selectedItem)
		localStorageSet("selectedPressList",JSON.stringify(selectedList))
	}
	 
	onRemove(selectedList, removedItem) {
		//alert("Removed")
		console.log(selectedList)
		console.log(removedItem)
		localStorageSet("selectedPressList",JSON.stringify(selectedList))
	}  

  render() {
    const { selectedValues } = this.state;
    return (
      <div className="App Selectpressbox col-md-12 col-sm-12 col-xs-12">
        
        {/* <div className="col-xs-12 "> */}
         
          <div className="examples">
            <Multiselect
              options={this.state.objectArray}
              closeIcon="close"
              displayValue="publicationName"
			  onSelect={this.onSelect} // Function will trigger on select event
			  onRemove={this.onRemove} // Function will trigger on remove event
			  style={this.style}
              selectedValues={selectedValues}
              avoidHighlightFirstOption
            />
            
          {/* </div> */}
        </div>
      </div>
    );
  }
 } 

 
export default withStyles(styles)(MultiSelectPress);
