// src/pages/Home.jsx
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";

function Home() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(/public/hotel3.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "white",
        fontFamily: '"Open Sans", sans-serif',
        overflow: "hidden",
      }}
    >
      {/* Small Kalista text at top */}
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          pt: 3,
          pb: 5,
          fontFamily: '"ABeeZee", sans-serif',
          fontSize: { xs: "2rem", md: "1.5rem" },
          fontStyle: "italic",
          textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
        }}
      >
        Kalista.
      </Typography>

      {/* Main content */}
      <Container
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          py: 4,
          fontFamily: '"Open Sans", sans-serif',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#ffd700",
            fontStyle: "italic",
            fontSize: { xs: "2rem", md: "3rem" },
            mb: 2,
            fontFamily: '"ABeeZee", sans-serif',
            textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
          }}
        >
          The pure taste of
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "6rem", md: "9rem" },
            mb: 3,
            fontWeight: "bold",
            fontFamily: '"ABeeZee", sans-serif',
            textShadow: "3px 3px 6px rgba(0,0,0,0.8)",
          }}
        >
          Kalista
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 6,
            color: "#f1f1f1",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
          }}
        >
          Enjoy a variety of delicious meals from our menu!
        </Typography>
      </Container>

      {/* Navigation menu at bottom with white border */}
      <Container maxWidth="md" sx={{ pb: 4 }}>
        <Box
          sx={{
            borderRadius: "45px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            padding: "8px",
            width: "fit-content",
            margin: "0 auto",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              px: 2,
              py: 1,
            }}
          >
            {["Menu", "Cart", "Contact Us"].map((text) => (
              <Button
                key={text}
                component={Link}
                to={`/${text.toLowerCase().replace(/\s+/g, "")}`}
                sx={{
                  color: "black",
                  "&:hover": {
                    color: "#ffd700",
                    transition: "color 0.3s ease",
                  },
                  textTransform: "none",
                  fontSize: "1rem",
                  fontFamily: '"Open Sans", sans-serif',
                }}
              >
                {text}
              </Button>
            ))}

            <Button
              component={Link}
              to="/menu"
              variant="contained"
              sx={{
                bgcolor: "black",
                borderRadius: "45px",
                color: "gold",
                px: 3,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  bgcolor: "gold",
                  color: "black",
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease",
                },
                fontFamily: '"Open Sans", sans-serif',
              }}
            >
              VIEW TODAY'S MENU
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
