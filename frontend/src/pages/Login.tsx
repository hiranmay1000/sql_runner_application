import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slice/userAuth.slice";
import { AppDispatch } from "../redux/store";
import { useSnackbar } from "../context/SnackbarProvider";
import { CloseOutlined } from "@mui/icons-material";

interface LoginPropsType {
  onClose: () => void;
  setShowSignupModal: (modal: boolean) => void;
  setShowLoginModal: (modal: boolean) => void;
}

export default function Login(props: LoginPropsType) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { onClose, setShowSignupModal, setShowLoginModal } = props;
  const dispatch = useDispatch<AppDispatch>();
  const showMessage = useSnackbar().showMessage;

  const handleLogin = async () => {
    const action = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(action)) {
      localStorage.setItem("token", action.payload.token);
      showMessage(action.payload.message, "success");
    } else if (loginUser.rejected.match(action)) {
      showMessage(
        (action.payload as { error?: string })?.error || "Login failed",
        "error"
      );
    }
  };

  useEffect(() => {
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
          maxWidth: 400,
          p: 4,
          m: 3,
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
            onClick={() => {
              setShowLoginModal(false);
              setShowSignupModal(true);
            }}
          >
            Sign up
          </Box>
        </Typography>
      </Paper>
    </Box>
  );
}
