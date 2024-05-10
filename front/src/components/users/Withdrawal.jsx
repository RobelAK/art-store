import { Box, Button, Card, CardContent, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

const NAME_VALID = /^[a-zA-Z][a-zA-Z0-9-_/]{3,20}$/;
const PHONE_VALID = /^[0-9]{9}$/;

const Withdrawal = ({ totalPrice }) => {

  const [bank, setBank] = useState("");
  const [Account_no, setAccNo] = useState("");
  const [fname, setFname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Phone_no, setPhoneNo] = useState("");
  const [user_id, setId] = useState("");
  const [validFname, setValidFname] = useState(false);
  const [validPhoneNo, setValidPhoneNo] = useState(false);
  const [validLastname, setValidLastname] = useState(false);
  const [error, setError] = useState("");



  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(atob(token.split(".")[1]));
    setId(user.id);
  }, []);



  const handleWithdraw = async (event) => {
    event.preventDefault();
    const value = {
      Phone_no: Phone_no,
        Account_no: Account_no,
        bank: bank,
        total_revenue: totalPrice,
        user_id: user_id,
        fname: fname,
        Lastname: Lastname,
    }

    if (!validFname || !validLastname || !validPhoneNo) {
      setError("Please fill out the form correctly");
      return;
    }
    try {
      axios
      .post("http://localhost:8081/withdraw", value)
      .then((res) => {
        console.log(res.data.Message);
      })
      .catch((error) => {
        console.error("Error updating user: ", error);
      });
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to withdraw. Please try again later.");
    }
  };


  useEffect(() => {
    const result = NAME_VALID.test(fname);
    console.log("FName validation: ", result);
    setValidFname(result);
  }, [fname]);
  useEffect(() => {
    const result = NAME_VALID.test(Lastname);
    console.log("LastName validation: ", result);
    setValidLastname(result);
  }, [Lastname]);
  useEffect(() => {
    const result = PHONE_VALID.test(Phone_no);
    console.log("Phone validation: ", result);
    setValidPhoneNo(result);
  }, [Phone_no]);



  return (
    <div><Container>
      <Card
        sx={{
          boxShadow: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "5px",
          padding: 5,
        }}
      >
        <Box sx={{ mt: 1 }}>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: "5px",
                }}
              >
                <Grid container direction={"row"}>
                  <Grid item xs={8}>
                    <Typography
                      variant="body2"
                      color="darkblue"
                      fontWeight="bold"
                      component="div"
                      fontFamily="Sora, sans-serif"
                    >
                      Total Revenue
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      color="darkblue"
                      fontWeight="bold"
                      component="div"
                      fontFamily="Sora, sans-serif"
                      textAlign="center"
                    >
                      {totalPrice} ETB
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container direction={"row"}>
                  <Grid item xs={8}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      component="div"
                      fontFamily="Sora, sans-serif"
                    >
                      Minimum Withdrawal Limit
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      component="div"
                      fontFamily="Sora, sans-serif"
                      textAlign="center"
                    >
                      10,000 ETB
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider
                orientation="horizontal"
                flexItem
                variant="middle"
                sx={{ backgroundColor: "black" }}
              />
            </Grid>
          </Grid>
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              fontFamily="Sora, sans-serif"
              textAlign="center"
            >
              Withdraw Your Money
            </Typography>
            <Typography
              variant="body2"
              component="div"
              fontFamily="Sora, sans-serif"
              textAlign="center"
            >
              Fill The Form Correctly
            </Typography>
          </CardContent>

          <Box component="form" onSubmit={handleWithdraw} >
            <Grid container rowSpacing={1}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Choose a Bank</InputLabel>
                  <Select
                    label="Bank"
                    fullWidth
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    required
                  >
                    <MenuItem value="Telebirr">Telebirr</MenuItem>
                    <MenuItem value="Commercial Bank of Ethiopia">Commercial Bank of Ethiopia</MenuItem>
                    <MenuItem value="Abissinya International Bank">Abissinya International Bank</MenuItem>
                    <MenuItem value="EBirr">EBirr</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  required
                  fullWidth
                  size="small"
                  id="first_name"
                  label="First Name"
                  name="first_name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  helperText={
                    !validFname &&
                    fname &&
                    "Name must start with letter, must be between 3 to 20 characters long and can't contain space"
                  }
                  error={!validFname && !!fname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  size="small"
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  value={Lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  helperText={
                    !validLastname &&
                    Lastname &&
                    "Name must start with letter, must be between 3 to 20 characters long and can't contain space"
                  }
                  error={!validLastname && !!Lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  size="small"
                  value={Account_no}
                  onChange={(e) => setAccNo(e.target.value)}
                  label="Account Number"
                  name="acc_no"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="tel"
                  required
                  fullWidth
                  size="small"
                  id="phone_number"
                  label="Phone Number"
                  name="phone_number"
                  value={Phone_no}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  InputProps={{
                    startAdornment: "+251",
                  }}
                  inputProps={{
                    maxLength: 9,
                  }}
                  helperText={
                    !validPhoneNo &&
                    Phone_no &&
                    "Phone_no must contain 9 numbers"
                  }
                  error={!validPhoneNo && !!Phone_no}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    marginTop: "10px",
                    bgcolor: "darkblue",
                    color: "white",
                  }}
                >
                  Withdraw
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
    </Container>
    </div>
  )
}

export default Withdrawal