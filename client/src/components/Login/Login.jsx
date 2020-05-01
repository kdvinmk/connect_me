import React, { Component } from "react";
import { Container, Form, Input, Label, FormGroup, Button } from "reactstrap";
import { register, login } from "../../actions/authActions";
import { connect } from "react-redux";
import style from "./Login.module.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    signup: false,
  };

  handleSignUp = (e) => {
    e.preventDefault();
    this.setState({
      signup: !this.state.signup,
    });
    console.log(this.state.signup);
  };

  onChange = (e) => {
    const stateName = e.target.name;
    const stateValue = e.target.value;
    this.setState({ [stateName]: stateValue });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (e.target.name == "login") {
      const { email, password } = this.state;
      const obj = {
        email,
        password,
      };
      console.log(obj, e.target.name, this.props);
      this.props.login(obj);
    } else {
      const { name, email, password } = this.state;
      const obj = {
        name,
        email,
        password,
      };
      console.log(obj);
      this.props.register(obj);
    }
  };

  render() {
    // console.log(this.props);
    return (
      <div className={style.mainContainer}>
        {this.state.signup ? (
          <div className={style.loginContainer}>
            <Container style={{ margin: "10px 0" }}>
              <Form>
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Button size="sm" onClick={this.handleSignUp}>
                    Already have an account ? Login!
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Button block type="submit" onClick={this.onSubmit}>
                    Register
                  </Button>
                </FormGroup>
              </Form>
            </Container>
          </div>
        ) : (
          <div className={style.loginContainer}>
            <Container style={{ margin: "10px 0" }}>
              <Form>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Button size="sm" onClick={this.handleSignUp}>
                    Need a new account ? Sign up!
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Button
                    block
                    type="submit"
                    name="login"
                    onClick={this.onSubmit}
                  >
                    Login
                  </Button>
                </FormGroup>
              </Form>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { register, login })(Login);
