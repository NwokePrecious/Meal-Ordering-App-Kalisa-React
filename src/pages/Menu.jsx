import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Skeleton from "@mui/material/Skeleton";
import { debounce } from "lodash";

// Set up your Spoonacular API key here
const SPOONACULAR_API_KEY = "ef8fd38262b8497bbdb179652b70effc";
const SPOONACULAR_API_URL = "https://api.spoonacular.com/recipes/complexSearch";

function Menu() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(SPOONACULAR_API_URL, {
          params: {
            query: searchTerm || "main course",
            apiKey: SPOONACULAR_API_KEY,
            addRecipeInformation: true,
            number: 12,
          },
        });
        setMeals(response.data.results);
      } catch (error) {
        console.error("Error fetching meals:", error);
        toast.error("Failed to load menu items");
      }
      setLoading(false);
    };

    fetchData();
  }, [searchTerm]);

  const addToCart = (meal) => {
    const currentCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (currentCart.some((item) => item.idMeal === meal.id)) {
      toast.info(`${meal.title} is already in the cart!`);
      return;
    }

    const updatedCart = [
      ...currentCart,
      {
        idMeal: meal.id,
        strMeal: meal.title,
        price: meal.pricePerServing / 100,
      },
    ];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    toast.success(`${meal.title} added to cart!`);
  };

  const toggleFavorite = (meal) => {
    const updatedFavorites = favorites.some((fav) => fav.id === meal.id)
      ? favorites.filter((fav) => fav.id !== meal.id)
      : [...favorites, meal];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleSearchChange = debounce(
    (e) => setSearchTerm(e.target.value),
    500
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", color: "black", textAlign: "center" }}
      >
        Today's Menu
      </Typography>

      <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
        <TextField
          label="Search meals"
          variant="outlined"
          onChange={handleSearchChange}
          sx={{
            maxWidth: 400,
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />
      </Box>

      {loading ? (
        <Grid container spacing={3}>
          {[...Array(12)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <Skeleton variant="rectangular" height={300} animation="wave" />
                <CardContent>
                  <Skeleton height={40} width="80%" animation="wave" />
                  <Skeleton height={20} width="60%" animation="wave" />
                  <Skeleton height={40} width="100%" animation="wave" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : meals.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
          No meals found
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {meals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  ":hover": { boxShadow: 6, transform: "scale(1.02)" },
                  transition: "all 0.3s ease-in-out",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={meal.image}
                    alt={meal.title}
                    sx={{
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      transition: "opacity 0.3s ease",
                      ":hover": { opacity: 0.85 },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      py: 1,
                      px: 2,
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                    }}
                  >
                    <Typography variant="body2">{meal.title}</Typography>
                  </Box>
                </Box>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h6"
                      sx={{ fontWeight: "medium", color: "black" }}
                    >
                      {meal.title}
                    </Typography>
                    <IconButton
                      color={
                        favorites.some((fav) => fav.id === meal.id)
                          ? "secondary"
                          : "default"
                      }
                      onClick={() => toggleFavorite(meal)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    {meal.pricePerServing
                      ? (meal.pricePerServing / 100).toFixed(2)
                      : "N/A"}{" "}
                    € per serving
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={() => addToCart(meal)}
                    fullWidth
                    sx={{
                      backgroundColor: "black",
                      color: "gold",
                      fontWeight: "bold",
                      ":hover": { backgroundColor: "gold", color: "black" },
                      mt: 2,
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Menu;
