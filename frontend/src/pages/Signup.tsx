import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CloseOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/slice/userAuth.slice";
import { useSnackbar } from "../context/SnackbarProvider";
import { AppDispatch } from "../redux/store";

interface SignupPropsType {
  onClose: () => void;
  setShowLoginModal: (modal: boolean) => void;
  setShowSignupModal: (modal: boolean) => void;
}

export default function Signup(props: SignupPropsType) {
  const [firstname, setFistname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { onClose, setShowLoginModal, setShowSignupModal } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { showMessage } = useSnackbar();

  const handleRegister = async () => {
    if (!firstname || !email || !password || !confirmPassword) {
      showMessage("All fields are required", "error");
      return;
    }

    const action = await dispatch(
      signupUser({ firstname, lastname, email, password })
    );

    if (signupUser.fulfilled.match(action)) {
      localStorage.setItem("token", action.payload.token);
      showMessage(action.payload.message, "success");
      return;
    }

    if (signupUser.rejected.match(action)) {
      const errorMsg =
        (action.payload as { error: string })?.error ||
        "Registration failed. Try again.";
      showMessage(errorMsg, "error");
    }
  };

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <Paper
        onClick={(e) => e.stopPropagation()}
        elevation={3}
        sx={{
          width: "90%",
          maxWidth: 450,
          p: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseOutlined />
        </IconButton>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: "#333" }}>
          Create Your Account
        </Typography>

        <TextField
          label="Firstname"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          onChange={(e) => setFistname(e.target.value)}
        />

        <TextField
          label="Lastname"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          onChange={(e) => setLastname(e.target.value)}
        />

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
          sx={{ mb: 2 }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          variant="outlined"
          sx={{ mb: 3 }}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          onClick={handleRegister}
        >
          Sign Up
        </Button>

        <Typography
          variant="body2"
          sx={{ mt: 2, color: "text.secondary", textAlign: "center" }}
        >
          Already have an account?{" "}
          <Box
            component="span"
            sx={{ color: "#0067a3b0", cursor: "pointer", fontWeight: 500 }}
            onClick={() => {
              setShowSignupModal(false);
              setShowLoginModal(true);
            }}
          >
            Log in
          </Box>
        </Typography>
      </Paper>
    </Box>
  );
}
