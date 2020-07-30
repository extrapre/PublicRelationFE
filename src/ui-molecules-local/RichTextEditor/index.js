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

class RichTextEditor extends Component {
  constructor(props) {
    super(props);

    this.modules = {
      toolbar: [
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["clean"]
      ]
    };

    this.formats = [
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "list",
      "bullet",
      "align",
      "color",
      "background"
    ];

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
	
	
	this.rteChange = this.rteChange.bind(this);
	this.setContentToState = this.setContentToState.bind(this);
  }

  componentDidMount(){
	this.rteChange();
	
  }
  rteChange = (content, delta, source, editor) => {
    //Save changes happing in editor to localstorage in form of rich text
	
	console.log("Delataaaaaaaaaaaaaaaaaaaaaaa")
	console.log(content)
	console.log(delta)
	console.log(source)
	console.log(editor)
	if(source == "user")
	{
		
		localStorageSet(this.props.label, editor.getHTML());
		let textcomment = editor.getHTML()
		console.log("aaaaaaaaaaaaaaa :", textcomment);
		this.seState = {
			comments:  textcomment
		}	
		localStorageSet(this.props.label, textcomment);
		console.log(editor.getHTML()); // rich text
		console.log(editor.getText()); // plain text
		console.log(editor.getLength()); // number of characters
		
		console.log(this.props)
	}	
  };

  setContentToState = (state, dispatch) => {
    //Get Rich text from local storage and set to jsonpath in prepareFinalObject
    //var richText = this.state.comments;
    //console.log("aaaaaaaaaaaaaaa :", richText);
	
	let richText = localStorageGet(this.props.label);
		console.log("bbbbbbbbb :", richText);
		this.setState = {
			comments:  richText
		}	
		
    // if (richText !== null && richText !== "") {
      // set(...state, "richTextEditor.htmlContent", richText);
      // set(prepareFinalObject("richTextEditor.htmlContent", richText));
    // }
  };

  render() {
    return (
      <div>
	  {(this.props.label === 'pressnote' || this.props.label === 'tendernote') ? 
        <ReactQuill
          theme="snow"
		  bounds = "#material-ui-cardContent > div:nth-child(3) > div"
          modules={this.modules}
          formats={this.formats}
          onChange={this.rteChange}
          onBlur={this.setContentToState}
          value={localStorageGet(this.props.label)}
        />
		:
		<ReactQuill
          theme="snow"
		  bounds = "#material-ui-cardContent > div:nth-child(3) > div"
          modules={this.modules}
          formats={this.formats}
          onChange={this.rteChange}
          onBlur={this.rteChange}
          value={localStorageGet(this.props.label) === null   ? this.state.comments : localStorageGet(this.props.label)}
        />
		}
      </div>
    );
  }
}

export default withStyles(styles)(RichTextEditor);

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
