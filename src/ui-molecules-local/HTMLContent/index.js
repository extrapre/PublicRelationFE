import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { withStyles } from "@material-ui/core/styles";
import set from "lodash/set";
import {
  localStorageSet,
  localStorageGet
} from "egov-ui-kit/utils/localStorageUtils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
});

class HTMLContent extends Component {
  constructor(props) {
    super(props);

    this.modules = {
      toolbar: [
        false
      ]
    };

    // this.formats = [
      // false
    // ];

    //TO pre-populate the Text in editor.
    // this.state = {
      // comments: this.props.label === 'email' ? localStorage.getItem('EmailTemplate') : (this.props.label === 'sms' ? localStorage.getItem('smsTemplate') ?  this.props.label === 'subject' ? localStorage.getItem('EmailTemplatesubject') : "")
    // };
	
	if(this.props.label === 'email')
	{
		this.state = {
			comments:  localStorageGet('EmailTemplate')
		}	
	}
	if(this.props.label === 'sms')
	{
		this.state = {
			comments:  localStorageGet('smsTemplate')
		}	
	}
	if(this.props.label === 'subject')
	{
		this.state = {
			comments:  localStorageGet('EmailTemplatesubject')
		}	
	}
	if(this.props.label === 'pressnote')
	{
		this.state = {
			comments:  localStorageGet('pressnote')
		}	
	}
	if(this.props.label === 'tendernote')
	{
		this.state = {
			comments:  localStorageGet('tendernote')
		}	
	}
	// else
	// {
			// this.state = {
			// comments:  ""
		// }	
	// }	
  }
 
 
  render() {
    return (
      <div class="MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-xl-12">
	   <ReactQuill
		  theme="snow"	
          readOnly = "true"
		  className = "readonlyquill"
		  bounds = "#material-ui-cardContent > div:nth-child(3) > div"
          value={localStorageGet(this.props.label)}
        />
      </div>
    );
  }
}

export default withStyles(styles)(HTMLContent);

// const mapStateToProps = (state, ownprops) => {
//   const { jsonPath } = ownprops;

//   const fieldValue =
//     value === undefined ? get(preparedFinalObject, jsonPath) : value;

//   return { value: fieldValue };
// };

// export default connect(
//   mapStateToProps,
//   {}
// )(withStyles(styles)(RichTextEditor));
