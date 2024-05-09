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
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ErrorIcon from '@mui/icons-material/Error';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BranchHome() {
  const [orders, setOrders] = useState([]);
  const [status,setStatus] = useState([])
  const [icon,setIcon] = useState([])

  const updateStatus = (index, value) => {
    const newStatus = [...status];
    newStatus[index] = value;
    setStatus(newStatus);
  };
  const updateIcon = (index, value) => {
    const newIcon = [...icon];
    newIcon[index] = value;
    setIcon(newIcon);
  };
  



  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      const user = JSON.parse(atob(token.split(".")[1]));
      axios
        .post("http://localhost:8081/branch",{branchName: user.name})
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  const handleCheckTransaction = (userid,tx_ref) => (event) => {
    event.stopPropagation();
    axios
      .post("http://localhost:8081/branch/verifypayment", { tx_ref })
      .then((res) => {
        console.log(res.data.data.status);
        updateStatus(userid,res.data.data.status)
        if(res.data.data.status == "success"){
          updateIcon(userid,<CheckCircleRoundedIcon color="success"/>)
        }
        if(res.data.data.status == "failed/cancelled"){
          updateIcon(userid,<ErrorIcon color="error"/>)
        }
        if(res.data.data.status == "pending"){
          updateIcon(userid,<HourglassBottomIcon color="warning"/>)
        }
      })
      .catch((err) => console.log(err));
  };
  const handleApprove = (userid, tx_ref)=> (event) =>{
    event.stopPropagation()
    // if()
      console.log(status[userid])
  }
  const handleDelete = (tx_ref) => (event) => {
    event.stopPropagation();
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      axios.post("http://localhost:8081/branch/delete", { tx_ref })
        .then((res) => {
          console.log(res.data);
          setOrders(orders.filter((order) => order.tx_ref !== tx_ref));
        })
        .catch((err) => console.log(err));
    }
  };


  const parseData = (stringifiedData) => {
    try {
      return JSON.parse(stringifiedData);
    } catch (error) {
      console.error("Error parsing data:", error);
      return [];
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#d4d6d9",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >

      <NavBranch/>
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
          Waiting Prints
        </Typography>

        {orders.map((item, i) => (
          <Card key={i} style={{ marginBottom: "20px" }}>
            <CardContent>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${item.name}-content`}
                  id={`panel${item.tx_ref}-header`}
                >
                  <Grid container spacing={[5,0]}>
                    <Grid item xs>
                    <Typography variant="h6" marginRight="25px">
                    {item.fname + " " + item.lname}
                  </Typography>
                    </Grid>
                    <Grid item>
                    <Typography>{status[item.user_id]}</Typography>
                    </Grid>
                    <Grid item xs>
                    <Typography>{icon[item.user_id]}</Typography>
                    </Grid>
                    <Grid item xs>
                  <Button
                    variant="contained"
                    onClick={handleCheckTransaction(item.user_id,item.tx_ref)}
                  >
                    Check payment
                  </Button>
                    </Grid>
                    <Grid item>
                  <Button
                    variant="contained"
                    onClick={handleApprove(item.user_id,item.tx_ref)}
                  >
                    Approve
                  </Button>
                    </Grid>
                    <Grid item >
                    <Button onClick={handleDelete(item.tx_ref)}><DeleteIcon/></Button>
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
}
