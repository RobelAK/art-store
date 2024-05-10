import { Box, Button, Card, CardContent, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const NAME_VALID = /^[a-zA-Z][a-zA-Z0-9-_/]{3,20}$/;
const PHONE_VALID = /^[0-9]{9}$/;

const Withdrawal = ({ totalPrice }) => {

const [fname, setFname] = useState("");
  const [validFname, setValidFname] = useState(false);

  const [lname, setLname] = useState("");
  const [validLname, setValidLname] = useState(false);

  const [phoneNo, setPhoneNo] = useState("");
  const [validPhoneNo, setValidPhoneNo] = useState(false);


useEffect(() => {
  const result = NAME_VALID.test(fname);
  console.log("FName validation: ", result);
  setValidFname(result);
}, [fname]);
useEffect(() => {
  const result = NAME_VALID.test(lname);
  console.log("LName validation: ", result);
  setValidLname(result);
}, [lname]);
useEffect(() => {
  const result = PHONE_VALID.test(phoneNo);
  console.log("Phone validation: ", result);
  setValidPhoneNo(result);
}, [phoneNo]);



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

        <Box component="form" >
          <Grid container rowSpacing={1}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Choose a Bank</InputLabel>
                <Select
                  label="Bank"
                  fullWidth
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
                onChange={(e) => setLname(e.target.value)}
                helperText={
                  !validLname &&
                  lname &&
                  "Name must start with letter, must be between 3 to 20 characters long and can't contain space"
                }
                error={!validLname && !!lname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                required
                fullWidth
                size="small"
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
                onChange={(e) => setPhoneNo(e.target.value)}
                InputProps={{
                  startAdornment: "+251",
                }}
                inputProps={{
                  maxLength: 9,
                }}
                helperText={
                  !validPhoneNo &&
                  phoneNo &&
                  "phone_no must contain 9 numbers"
                }
                error={!validPhoneNo && !!phoneNo}
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