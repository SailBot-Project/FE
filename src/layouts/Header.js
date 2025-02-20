import React from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";
import Logo from "./Logo";

const Header = () => {
  return (
    <Navbar color="primary" dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none">
          <Logo />
        </div>
        <NavbarBrand href="/">Sail-Bot</NavbarBrand>
        <Button color="primary" className=" d-lg-none">
          <i className="bi bi-list"></i>
        </Button>
      </div>
    </Navbar>
  );
};

export default Header;
