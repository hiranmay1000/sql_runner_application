import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userLoginAPI } from "../services/sqlAuth";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await userLoginAPI(email, password);

      console.log("response", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f6fa",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "90%",
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: "#333" }}>
          Login to SQL Runner
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          sx={{ mb: 3 }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#0067a3b0",
            ":hover": { bgcolor: "#005785" },
            py: 1.2,
            borderRadius: 2,
          }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography
          variant="body2"
          sx={{ mt: 2, color: "text.secondary", textAlign: "center" }}
        >
          Don’t have an account?{" "}
          <Box
            component="span"
            sx={{ color: "#0067a3b0", cursor: "pointer", fontWeight: 500 }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Box>
        </Typography>
      </Paper>
    </Box>
  );
}
