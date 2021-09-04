import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import AuthMenu from "@/components/AuthMenu";
import styled from "styled-components";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <BlogTitle>Blog de Chalo</BlogTitle>
        <AuthMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

const BlogTitle = styled.h3`
  flex-grow: 1;
`;
