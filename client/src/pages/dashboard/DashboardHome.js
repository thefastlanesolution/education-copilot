import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  text-align: center;
  margin-top: 10%;
`;

const DashboardHome = () => (
  <Header>
    <h1>Welcome to Copilot 👋</h1>
  </Header>
);

export default DashboardHome;
