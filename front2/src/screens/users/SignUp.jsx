import * as React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../utils/334.jpg';
import Logo from '../../utils/logo.png';
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

const Sign = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        width: "100%",

        position: "relative",
        backgroundColor: "#eee",
        height: "720px",
        overflow: "hidden",
        backgroundSize: 'cover',
        display: "Flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <section
        style={{
          borderRadius: "22.76px",
          boxShadow: 6,
          backgroundColor: "#fff",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "52.6363639831543px 38.41032028198242px",
          textAlign: "left",
          fontSize: "17.1px",
          color: "#000",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            boxShadow: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "28.45px 0px",
          }}
        >
          <Link to="/">
          <img
            style={{
              width: "364.2px",
              position: "relative",
              height: "93.9px",
              objectFit: "cover",
            }}
            alt=""
            src={Logo}
            
          />
          </Link>
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "15.65px 0px",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "22.76px 0px",
              }}
            >
              <TextField
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  alignSelf: "stretch",
                  fontFamily: "Inter",
                  fontSize: "17.1px",
                  color: "#6f6d6d",
                }}
                size='small'
                color="primary"
                label="Username*"
                required={true}
                variant="outlined"
                sx={{ "& .MuiInputBase-root": { height: "49.5px" } }}
              />
              <TextField
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  alignSelf: "stretch",
                  fontFamily: "Inter",
                  fontSize: "17.1px",
                  color: "#6f6d6d",
                }}
                color="primary"
                size='small'
                label="Email Address*"
                required={true}
                variant="outlined"
                sx={{ "& .MuiInputBase-root": { height: "49.5px" } }}
              />
              <TextField
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  alignSelf: "stretch",
                  fontFamily: "Inter",
                  fontSize: "17.1px",
                  color: "#6f6d6d",
                }}
                color="primary"
                label="Password*"
                required={true}
                size='small'
                variant="outlined"
                sx={{ "& .MuiInputBase-root": { height: "49.5px" } }}
              />
              <TextField
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  alignSelf: "stretch",
                  fontFamily: "Inter",
                  fontSize: "17.1px",
                  color: "#6f6d6d",
                }}
                color="primary"
                label="Confirm Password*"
                required={true}
                size='small'
                variant="outlined"
                sx={{ "& .MuiInputBase-root": { height: "49.5px" } }}
              />
              <FormControlLabel
                label="I Agree to the Terms and Conditions"
                control={<Checkbox color="primary" />}
              />
              <Button
                style={{ alignSelf: "stretch" }}
                disableElevation={true}
                color="primary"
                size='small'
                variant="contained"
                sx={{ borderRadius: "0px 0px 0px 0px" }}
              >
                SIGN UP
              </Button>
            </div>
            <a
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: "4.27px 0px",
                color: "inherit",
              }}
            >
              <a
                style={{
                  textDecoration: "none",
                  position: "relative",
                  color: "inherit",
                }}
              >
                Term and conditions
              </a>
              <Link to='/signin'
                style={{
                  textDecoration: "none",
                  position: "relative",
                  color: "inherit",
                }}
              >
                i alredy have an account
              </Link>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sign;