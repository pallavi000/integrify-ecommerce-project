import React from "react";
// redux
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

// MUI
import {
  Alert,
  Box,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

// components
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";

// form stepper steps
const steps = ["Shipping Address", "Payment Details"];

function Checkout() {
  // cart items state
  const cart = useSelector((state: AppState) => state.cart.items);

  // active step
  const [activeStep, setActiveStep] = React.useState(0);

  // handle next step in stepper
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Container maxWidth="sm">
      {cart.length ? (
        <Box sx={{ width: "100%" }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <Box sx={{ paddingTop: "1.5rem" }}>
            {activeStep === 0 ? (
              <AddressForm handleNext={handleNext} />
            ) : (
              <PaymentForm handleNext={handleNext} />
            )}
          </Box>
        </Box>
      ) : (
        <Alert severity="error" sx={{ marginTop: "2rem" }}>
          No item added in your shopping cart!
        </Alert>
      )}
    </Container>
  );
}

export default Checkout;
