import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, CardMedia } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Card, CardContent, Grid } from "@mui/material";
import NavBranch from "../../components/Branch/NavBranch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ApprovedScreen() {
  const [approvedorders, setApprovedOrders] = useState([]);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      axios
        .post("http://localhost:8081/branch/approved", {
          branchName: user.name,
        })
        .then((res) => {
          setApprovedOrders(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const parseData = (stringifiedData) => {
    try {
      return JSON.parse(stringifiedData);
    } catch (error) {
      console.error("Error parsing data:", error);
      return [];
    }
  };
  const handlePrint = (imageName ,art_id ,user_id) => {
    axios
        .post("http://localhost:8081/seles" ,{art_id , user_id})
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));


    const url = `http://localhost:8081/images/${imageName}`;

    const img = new Image();
    img.src = url;

    const win = window.open();
    win.document.write("<html><head><title>Print</title>");
    win.document.write(
      "<style>@media print { @page { margin: 0; } body { margin: 0; }</style>"
    );
    win.document.write("</head><body>");
    win.document.write(
      '<img src="' + url + '" style="width:100%; height:auto;">'
    );
    win.document.write("</body></html>");
    win.document.close();

    setTimeout(() => {
      win.print();
    }, 1000);
  };
  const handleComplete = (orderID , user_id) => (event) => {
    event.stopPropagation();
    const isPrinted = window.confirm("Is this order printed?")
    if(isPrinted){
      axios
          .post("http://localhost:8081/print/complete" , {orderId: orderID , user_id})
          .then((res) => {
            console.log(res.data);
            toast.info(res.data, {
              onClose: () => {
                setApprovedOrders(approvedorders.filter((approvedorder) => approvedorder.id !== orderID));
              },
              autoClose: 2000,
              closeOnClick: true,
            });
          })
          .catch((err) => console.log(err));
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: "#d4d6d9",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <NavBranch />
      <Container>
        <Container sx={{ height: "100px" }}></Container>
        <Typography
          variant="h5"
          color={"GrayText"}
          component="div"
          gutterBottom
          fontFamily="sora,sans-serif"
          textAlign="center"
        >
          Approved Orders
        </Typography>

        {approvedorders.map((item, i) => (
          <Card key={i} style={{ marginBottom: "20px" }}>
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
                        {item.fname + " " + item.lname}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" onClick={handleComplete(item.id , item.user_id)}>Complete</Button>
                    </Grid>
                  </Grid>
                </AccordionSummary>

                <AccordionDetails>
                  <div>
                    <Card style={{ marginBottom: "10px", padding: "20px" }}>
                      <Typography>First Name: {item.fname}</Typography>
                      <Typography>Last Name: {item.lname}</Typography>
                      <Typography>Email: {item.email}</Typography>
                      <Typography>Phone_NO: +251 {item.phone_no}</Typography>
                      <Typography>Transaction number:{item.tx_ref}</Typography>
                    </Card>
                    {parseData(item.data).map((art, index) => (
                      <Card key={index} style={{ marginBottom: "10px" }}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <CardMedia
                              component="img"
                              alt="Artwork Preview"
                              height="auto"
                              src={`http://localhost:8081/images/${art.art}`}
                              sx={{
                                maxWidth: "150px",
                                aspectRatio: "4/5",
                                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.3)",
                                borderRadius: "4px",
                                padding: "0.1%",
                                transition: "max-width 0.3s ease-in-out",
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
                              <Button
                                variant="contained"
                                onClick={() => handlePrint(art.art , art.art_id ,art.user_id)}
                              >
                                Print
                              </Button>
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
        <ToastContainer></ToastContainer>
      </Container>
    </Box>
  );
}
