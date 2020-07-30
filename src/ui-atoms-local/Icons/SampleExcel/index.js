import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import "../index.css";
//import manifest from "./manifest.txt";
class SampleExcel extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
			<a href="http://localhost:3006/manifest.txt" download="manifest.txt">Click to download manifest</a>        
		</div>
    );
  }
}

export default SampleExcel;
