import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CardContent,
  Grid,
  CardMedia,
  Card,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

const SalesList = () => {
  const [approvedorders, setApprovedOrders] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchArtTitle, setSearchArtTitle] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const parseData = (stringifiedData) => {
    try {
      return JSON.parse(stringifiedData);
    } catch (error) {
      console.error("Error parsing data:", error);
      return [];
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8081/sales/list");
      setApprovedOrders(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLocationSearch = () => {
    const filteredOrders = approvedorders.filter((item) =>
      item.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setApprovedOrders(filteredOrders);
  };

  const handleArtTitleSearch = () => {
    const filteredOrders = approvedorders.filter((item) =>
      parseData(item.data).some((art) =>
        art.art_title.toLowerCase().includes(searchArtTitle.toLowerCase())
      )
    );
    setApprovedOrders(filteredOrders);
  };


  return (
    <Box
      sx={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "80vh",
      }}
    >
      <Container>
        <Grid container spacing={[5, 0]}>
          <Grid item xs>
            <Box mb={2} display="flex" justifyContent="flex-end">
              <TextField
                id="search-location"
                label="Search Branch"
                variant="outlined"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleLocationSearch}
              >
                Search 
              </Button>
            </Box>
          </Grid>
          <Grid item xs>
            <Box mb={2} display="flex" justifyContent="flex-end">
              <TextField
                id="search-art-title"
                label="Search Art Title"
                variant="outlined"
                value={searchArtTitle}
                onChange={(e) => setSearchArtTitle(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleArtTitleSearch}
              >
                Search
              </Button>
            </Box>
          </Grid>
        </Grid>
        {approvedorders.map((item, i) => (
          <Card key={i} style={{ marginBottom: "5px" }}>
            <CardContent>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${item.name}-content`}
                  id={`panel${item.tx_ref}-header`}
                >
                  <Grid container spacing={[5, 0]}>
                    <Grid item xs>
                      <Typography variant="h6" marginRight="25px">
                        {item.id + " " + item.fname + " " + item.lname}
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6" marginRight="25px">
                        {item.location}
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6" marginRight="25px">
                        {new Date(item.datetime).toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>

                <AccordionDetails>
                  <div>
                    <Card style={{ marginBottom: "10px", padding: "10px" }}>
                      <Typography>First Name: {item.fname}</Typography>
                      <Typography>Last Name: {item.lname}</Typography>
                      <Typography>Email: {item.email}</Typography>
                      <Typography>
                        Phone_NO: +251 {item.phone_no}
                      </Typography>
                      <Typography>
                        Transaction number:{item.tx_ref}
                      </Typography>
                    </Card>
                    {parseData(item.data).map((art, index) => (
                      <Card key={index} style={{ marginBottom: "5px" ,padding: "1%", }}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <CardMedia
                              component="img"
                              alt="Artwork Preview"
                              height="auto"
                              src={`http://localhost:8081/images/${art.art}`}
                              sx={{
                                maxWidth: "100px",
                                aspectRatio: "4/5",
                                boxShadow:
                                  "0px 20px 40px rgba(0, 0, 0, 0.3)",
                                borderRadius: "4px",
                                padding: "0.1%",
                                transition:
                                  "max-width 0.3s ease-in-out",
                              }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <CardContent>
                              <Typography
                                sx={{ marginRight: "5px" }}
                                variant="subtitle1"
                              >
                                Title: {art.art_title}
                              </Typography>
                              <Typography
                                sx={{ marginRight: "5px" }}
                                variant="subtitle1"
                              >
                                Size: {art.size}
                              </Typography>
                              <Typography
                                sx={{ marginRight: "5px" }}
                                variant="subtitle1"
                              >
                                Quantity: {art.quantity}
                              </Typography>
                            </CardContent>
                          </Grid>
                        </Grid>
                      </Card>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
};

export default SalesList;
