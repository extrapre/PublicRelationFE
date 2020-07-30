import React from "react";
import { getapplicationNumber } from "egov-ui-kit/utils/localStorageUtils";
import sampledata from "./sampledata.xls";
const styles = {
 // backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
  color: "rgba(255, 255, 255, 0.8700000047683716)",
  marginTop: "8px",
  //paddingLeft: "19px",
  paddingRight: "19px",
 // textAlign: "center",
  verticalAlign: "middle",
  lineHeight: "35px",
  fontSize: "16px"
};

function SampleDownload(props) {
	return <div style={styles}><a href={sampledata} download='sampledata.xls'style={{textDecoration: "underline", fontWeight: "100"}}>Sample Download</a></div>;
}

export default SampleDownload;
