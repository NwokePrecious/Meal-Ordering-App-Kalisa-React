// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            sx={{ color: "gold", fontWeight: "bold", fontSize: "1.2rem" }}
          >
            Kalista
          </Button>
        </Link>
        <Box sx={{ marginLeft: "auto", display: "flex", gap: 2 }}>
          <Link to="/menu" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "gold", fontWeight: "medium" }}>Menu</Button>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "gold", fontWeight: "medium" }}>Cart</Button>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "gold", fontWeight: "medium" }}>
              Contact Us
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
