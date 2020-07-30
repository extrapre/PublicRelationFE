import React, { Component } from "react";
import { MultiDownloadCard } from "egov-ui-framework/ui-molecules";
import { connect } from "react-redux";
import get from "lodash/get";
import "./index.scss";

class DownloadFileContainer extends Component {
  render() {
   // alert('pr')
    const { data, documentData, ...rest } = this.props;
	console.log("documentDataaaaaaaaaaa");
	console.log(documentData);
	console.log("dataaaaaaaaaaaaa");
  console.log(data);
  
    return (
      <div>
       { data.length>0 ?    
      <MultiDownloadCard data={data} documentData={documentData} {...rest} />
      : "Media Not Uploaded" }	 
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { screenConfiguration } = state;
  const data = ownProps.data
    ? ownProps.data
    : get(screenConfiguration.preparedFinalObject, ownProps.sourceJsonPath, []);
  return { data };
};

export default connect(
  mapStateToProps,
  null
)(DownloadFileContainer);
