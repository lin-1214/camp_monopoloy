import React from "react";
import { Container, Box } from "@mui/system";
import { Typography, Button, Grid } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
const PermissionDenied = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mx="auto"
      minHeight="100vh"
    >
      <Container align="center">
        <LockIcon style={{ color: "#006db3", fontSize: 60 }} />
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          You do not have permission to access this page.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" href="/">
              Back to Home
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" href="/login">
              Login
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PermissionDenied;
