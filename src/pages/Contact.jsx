import { useState } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all fields.");
      return;
    }

    // Display toast notification and reset form
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
    setSubmitted(true);

    // Hide confirmation message after a delay
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold",
          textAlign: "center",
          color: "black",
        }}
      >
        Contact Us
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              fullWidth
            />
            <TextField
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "black",
                color: "gold",
                fontWeight: "bold",
                ":hover": { backgroundColor: "gold", color: "black" },
              }}
            >
              Send Message
            </Button>
          </Box>
        </form>
        {submitted && (
          <Box
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: "black",
            }}
          >
            <CheckCircleOutlineIcon fontSize="small" />
            <Typography variant="body1">
              Thank you! Your message was sent.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Contact;
