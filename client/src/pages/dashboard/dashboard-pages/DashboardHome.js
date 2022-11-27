import React from 'react';
import { redirect, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import './DashboardHome.css';

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  text-align: center;
  margin-top: 10%;
`;

const DashboardHome = () => {
  return (
    <Header>
      <h1>
        Welcome to Copilot 🚀
        <br />
        <br />
        <div className="cta">
          <h3>
            <a
              target="_blank"
              href="https://www.facebook.com/groups/1429875590870786"
            >
              👉 Educators: Click here to join our Facebook group!
            </a>
          </h3>
        </div>
      </h1>
    </Header>
  );
};

export default DashboardHome;
