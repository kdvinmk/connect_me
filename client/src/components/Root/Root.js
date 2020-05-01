import React from "react";
import { Login } from "../index";
import HomePage from "../HomePage/HomePage";
import { connect } from "react-redux";
import NavBar from "../NavBar/NavBar";

function Root({ isAuthenticated }) {
  console.log(isAuthenticated);
  return (
    <div>
      <NavBar />
      {!isAuthenticated ? <Login /> : <HomePage />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Root);
