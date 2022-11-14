import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Wrapper from '../../assets/wrappers/PricingWrapper.js';
import { useAppContext } from '../../context/appContext';

const PricingPage = () => {
  const { displayAlert, isLoading } = useAppContext();

  return (
    <Wrapper className="mainwrapper">
      <div className="Header">Try Copilot, free for 5 days 🎉</div>
      <Card
        className="pricing"
        sx={{
          width: '100%',
          maxWidth: '500px',
          border: 'none',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.15)',
          borderRadius: '10px',
          height: '100%',
          '&:hover': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <CardContent>
          <form>
            <div className="form-center">
              <h4 className="type">For Teachers 🎓</h4>
            </div>
          </form>
          <div className="bodyText">
            <h5>Features</h5>
            <p>
              ✅ Unlock the power of AI in the classroom.
              <br />
              ✅ Access to 8 powerful tools.
              <br />✅ Unlimited Usage
            </p>
            <Button
              sx={{
                width: '100%',
                maxWidth: '100%',
              }}
              variant="contained"
              href="https://buy.stripe.com/aEUg2aagYbxp29a144"
            >
              Start Free Trial
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card
        sx={{
          width: '100%',
          maxWidth: '500px',
          border: 'none',
          borderRadius: '10px',
          height: '100%',
          '&:hover': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
          },
        }}
        className="pricing"
      >
        <CardContent>
          <form>
            <div className="form-center">
              <h4 className="type">For Schools 🏫</h4>
            </div>
          </form>
          <div className="bodyText">
            <h5>Features</h5>
            <p>
              ✅ Unlock the power of AI in the classroom.
              <br />
              ✅ Access to 8 powerful tools.
              <br />✅ Unlimited Usage
            </p>
            <Button
              sx={{
                width: '100%',
                maxWidth: '100%',
              }}
              variant="contained"
              href="#"
            >
              Contact us
            </Button>
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  );
};
export default PricingPage;
