import React from "react";
import styled from "styled-components";

const Bag = ({ className, header, children, headerText }) => {
  return (
    <Container className={className}>
      {header && <Header className="header">{header}</Header>}
      {headerText && (
        <HeaderTextWrapper>
          <Title>{headerText}</Title>
        </HeaderTextWrapper>
      )}
      <Content className="content">{children}</Content>
    </Container>
  );
};

Bag.defaultProps = {
  header: undefined,
  headerText: undefined,
  children: "",
};

const Container = styled.div`
  padding: 35px;
  background-color: white;
  border-radius: 25px;

  @media (max-width: 400px) {
    padding: 25px;
  }
`;

const Content = styled.div``;

const Header = styled.div``;

const HeaderTextWrapper = styled.div`
  margin-bottom: 35px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 1.2em;
`;

export default Bag;
