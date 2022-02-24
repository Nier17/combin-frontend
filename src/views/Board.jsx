import React, { useContext, useState, useEffect } from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import BoardHome from "./BoardHome";

const Board = () => {
  return (
    <>
      <Router>
        <GlobalStyles />
        <>
          <Container>
            <Switch>
              <Route path="/Home" component={BoardHome} />
              <Route path={["/home", "/"]} component={BoardHome} />
            </Switch>
          </Container>
        </>
      </Router>
    </>
  );
};

Board.defaultProps = {};

const GlobalStyles = createGlobalStyle`

  body {
    background-color: #f3f3f4;
  }

`;

const Container = styled.div`
  /* display: flex;
  flex-wrap: nowrap; */
  transition: all 1s;
`;
const Menu = styled.div`
  width: 100%;
  z-index: 999;
  background-color: white;
  position: sticky;
  top: 0px;
  height: 78px;

  padding: 0 15px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  box-shadow: 0px 0px 10px 2px rgb(0 0 0 / 5%);
`;
const MenuIconSVG = styled.div`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  padding: 10px 10px 10px 10px;
  margin: 10px 10px 10px 10px;
  fill: #284b63;
  background-color: rgb(40, 75, 99, 0.1);
  border-radius: 12px;
  cursor: pointer;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 35px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 400px) {
    padding: 15px;
  }

  ${(props) => {
    if (props.isHidden)
      return css`
        display: none;
      `;
  }}
`;

export default Board;
