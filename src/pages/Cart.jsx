import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const steps = [
    "Order Received",
    "Preparing",
    "Out for Delivery",
    "Delivered",
  ];

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const removeItemFromCart = (idMeal, itemName) => {
    const updatedCart = cartItems.filter((item) => item.idMeal !== idMeal);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    toast.info(`Removed "${itemName}" from cart`);
  };

  const handleFormSubmit = () => {
    if (!userName || !roomNumber) {
      toast.error("Please enter all required information.");
      return;
    }

    setOpenForm(false); // Close form modal
    setOrderStatus("Order Placed");

    // Clear cart after placing the order
    setCartItems([]);
    localStorage.removeItem("cartItems");

    // Start the order progression steps
    setActiveStep(0);
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep < steps.length) {
        setActiveStep(currentStep);
      } else {
        clearInterval(interval);
        setOrderStatus(null); // Reset status when complete
      }
    }, 4000); // Move to the next step every 4 seconds

    toast.success("Order placed successfully!");
  };

  const placeOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    setOpenForm(true); // Show form modal
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Box display="flex" alignItems="center" mb={4}>
        <ShoppingCartIcon color="primary" fontSize="large" />
        <Typography variant="h4" sx={{ ml: 1 }}>
          My Cart
        </Typography>
      </Box>

      {cartItems.length === 0 && !orderStatus ? (
        <Typography variant="h6" color="textSecondary">
          Looks like you haven’t added anything yet!
        </Typography>
      ) : (
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
          {cartItems.map((item) => (
            <Box
              key={item.idMeal}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderBottom: "1px solid #eee",
              }}
            >
              <Box>
                <Typography variant="h6">{item.strMeal}</Typography>
                <Typography color="textSecondary">
                  Price: {item.price.toFixed(2)}€
                </Typography>
              </Box>
              <IconButton
                aria-label="remove item"
                color="error"
                onClick={() => removeItemFromCart(item.idMeal, item.strMeal)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Total: {calculateTotal()}€</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={placeOrder}
              sx={{
                px: 4,
                backgroundColor: "black",
                color: "gold",
                fontWeight: "bold",
                ":hover": { backgroundColor: "gold", color: "black" },
              }}
            >
              Place Order
            </Button>
          </Box>
        </Paper>
      )}

      {/* Order Status Stepper */}
      {orderStatus && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Order Status
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      )}

      {/* Order Details Form Modal */}
      <Modal open={openForm} onClose={() => setOpenForm(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Enter Customer's Details
          </Typography>
          <TextField
            fullWidth
            label="Enter Your Name"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Hotel Room Number"
            variant="outlined"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleFormSubmit}
            sx={{
              backgroundColor: "black",
              color: "gold",
              fontWeight: "bold",
              ":hover": { backgroundColor: "gold", color: "black" },
            }}
          >
            Continue
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Cart;
