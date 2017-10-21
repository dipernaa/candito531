import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import commonStyles from '../../styles/common';

class PasswordField extends Component {
  componentDidMount() {
    if (this.inputElement && this.props.autoFocus) {
      this.inputElement.focus();
    }
  }

  render() {
    const { input, meta: { touched, error, warning }, ...custom } = this.props;
    const errorMessage = touched && (error || warning);

    return (
      <TextField
        ref={(element) => {
          this.inputElmeent = element && element.input;
        }}
        errorText={errorMessage}
        inputStyle={commonStyles.input}
        errorStyle={commonStyles.inputError}
        type="password"
        {...input}
        {...custom}
      />
    );
  }
}

export default PasswordField;
