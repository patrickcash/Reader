import React, { Component } from "react";
import { reduxForm, Field, propTypes } from "redux-form";
import { Link } from "react-router-dom";
import { required } from "redux-form-validators";

import { renderField, renderError } from "./utils/renderUtils";
import { loginUser } from "../../actions/auth";

class Login extends Component {
  static propTypes = {
    ...propTypes
  };

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <div className="row justify-content-center">
        <form className="col col-sm-4 card mt-5 p-2" onSubmit={handleSubmit}>
          <h4 className="text-md-center">Please Sign In</h4>
          <hr />

          <fieldset className="form-group">
            <Field
              name="username"
              label="Username"
              component={renderField}
              type="text"
              validate={[required({ message: "This field is required." })]}
            />
          </fieldset>

          <fieldset className="form-group">
            <Field
              name="password"
              label="Password"
              component={renderField}
              type="password"
              validate={[required({ message: "This field is required." })]}
            />
          </fieldset>

          <fieldset className="form-group">
            {renderError(error)}
            <button action="submit" className="btn btn-primary">
              Login
            </button>
          </fieldset>

          <p>
            Not registered? <Link to="/register">Sign Up Here!</Link>
          </p>
          <p />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "login",
  onSubmit: loginUser
})(Login);
