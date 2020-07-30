import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { DocumentTenderList } from "../../ui-molecules-local";
import { connect } from "react-redux";
import get from "lodash/get";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    padding: "8px 38px"
  },
  input: {
    display: "none !important"
  }
});

class DocumentListContainer extends Component {
  render() {
    const { ...rest } = this.props;
    return <DocumentTenderList {...rest} />;
  }
}

const mapStateToProps = state => {
  let documentsList = get(
    state,
    "screenConfiguration.preparedFinalObject.documentsContract",
    []
  );
  let popupdocumentsContract = get(
    state,
    "screenConfiguration.preparedFinalObject.popupdocumentsContract",
    []
  );
  return { documentsList, popupdocumentsContract};
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null
  )(DocumentListContainer)
);
