import React from "react";
import { Navbar, Nav, NavLink, NavItem } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

const NavBar = ({ isAuthenticated, logout, user }) => {
  return (
    <div>
      <Navbar>
        {isAuthenticated ? (
          <Nav>
            <NavLink>Welcome, {user.user.name}</NavLink>
            <NavLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              Logout
            </NavLink>
          </Nav>
        ) : null}
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(NavBar);
