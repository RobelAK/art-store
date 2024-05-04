import React from "react";
import { Container, Typography,} from "@mui/material";

const NotFound = () => {
  return (
    <Container sx={{ textAlign: "center", paddingTop: "200px" }}>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
    </Container>
  );
};

export default NotFound;
