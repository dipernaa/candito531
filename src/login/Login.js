import React, { Component } from 'react';
import { Card, CardActions, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Field, reduxForm } from 'redux-form';
import { PasswordField, TextField } from '../shared/form-fields';
import validators from '../shared/form-fields/validators';

export class Login extends Component {
  submitForm = (data) => {
    const { email, password } = data;
    this.props.onSubmit({
      email,
      password
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div style={styles.page}>
        <Card style={styles.card}>
          <form onSubmit={handleSubmit(this.submitForm)}>
            <CardText>
              <Field
                component={TextField}
                fullWidth
                floatingLabelText="Email"
                name="email"
                validate={[validators.required, validators.email]}
              />
              <br />
              <Field
                component={PasswordField}
                fullWidth
                floatingLabelText="Password"
                name="password"
                validate={[validators.required]}
              />
            </CardText>
            <br />
            <CardActions>
              <FlatButton
                label="Login"
                primary
                type="submit"
              />
            </CardActions>
          </form>
        </Card>
      </div>
    );
  }
}

const styles = {
  card: {
    margin: 'auto',
    maxWidth: 600,
    minWidth: 300,
    padding: 48,
    position: 'relative',
    textAlign: 'center',
    width: '90%'
  },
  page: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100vh'
  }
};

export default reduxForm({
  destroyOnUnmount: false,
  form: 'loginForm'
})(Login);
