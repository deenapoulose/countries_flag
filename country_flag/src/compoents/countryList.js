import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Alert } from "@mui/material";




const Country =()=>{
    const [countries,setCountries]=useState([])
    const[load,setLoad]=useState(false)
    const [error,setError]=useState(false)
    useEffect(() => {
        const getCountries = async () => {
          try {
            const response = await fetch("https://xcountries-backend.azurewebsites.net/all");
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setCountries(data);
          } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load country data.");
          } finally {
            setLoad(false);
          }
        };
    
        getCountries();
      }, []);
    
   return(
    <Container sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Country Flags
      </Typography>
      {load && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3} justifyContent="center" mt={2}>
        {countries.map((country) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={country.name}>
            <Card sx={{ maxWidth: 250, mx: "auto" }}>
              <CardMedia
                component="img"
                height="140"
                image={country.flag}
                alt={`Flag of ${country.name}`}
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  {country.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
   
}
export default Country;