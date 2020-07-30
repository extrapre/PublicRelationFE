import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { Dialog, DialogContent } from "@material-ui/core";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import store from "ui-redux/store";

class InternalInviteContainer extends React.Component {
  handleClose = () => {
  
	 store.dispatch(
       handleField(
         "createInvite",	
		 "components.adhocDialoginternal.children.grid.children.cardContent.children.invireselgrid",
         "props.data",
         []
       )
     );
	 
    const { screenKey } = this.props;
    this.props.handleField(
      screenKey,
      `components.adhocDialoginternal`,
      "props.open",
      false
    );
  };
  componentDidMount(){
		//alert('Enter')
	}  
  render() {
    const { open, maxWidth, children } = this.props;
    return (
      <Dialog open={open} maxWidth={maxWidth} onClose={this.handleClose}>
		{/* <span class="material-icons" onClick={this.handleClose} style={{width:" 40px",position:"absolute",right:"0%",   marginTop: "25px", fontSize:"18px", cursor:"pointer"}}>
				X
		</span> */}
        <DialogContent children={children} />
      </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { screenConfiguration } = state;
  const { screenKey } = ownProps;
  const { screenConfig } = screenConfiguration;
  const open = get(
    screenConfig,
    `${screenKey}.components.adhocDialoginternal.props.open`
  );

  return {
    open,
    screenKey,
    screenConfig
  };
};

const mapDispatchToProps = dispatch => {
  return { handleField: (a, b, c, d) => dispatch(handleField(a, b, c, d)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalInviteContainer);
