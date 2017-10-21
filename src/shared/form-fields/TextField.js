import React, { Component } from 'react';
import MuiTextField from 'material-ui/TextField';
import commonStyles from '../../styles/common';

class TextField extends Component {
  componentDidMount() {
    if (this.inputElement && this.props.autoFocus) {
      this.inputElement.focus();
    }
  }

  render() {
    const { input, meta: { touched, error, warning }, ...custom } = this.props;
    const errorMessage = touched && (error || warning);

    return (
      <MuiTextField
        ref={(element) => {
          this.inputElement = element && element.input;
        }}
        errorText={errorMessage}
        inputStyle={commonStyles.input}
        errorStyle={commonStyles.inputError}
        {...input}
        {...custom}
      />
    );
  }
}

export default TextField;
