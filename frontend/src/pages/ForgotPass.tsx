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

interface ForgotPassPropsType {
  email: string;
  setEmail: (email: string) => void;
  onClose: () => void;
  setShowLoginModal: (modal: boolean) => void;
}

export default function ForgotPassword(props: ForgotPassPropsType) {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showOTPField, setShowOTPField] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState<number>(55);
  const [enableResendOTPBtn, setEnableResendOTPBtn] = useState<boolean>(false);

  const { email, setEmail, onClose, setShowLoginModal } = props;

  const handleSendOTP = () => {
    setShowOTPField(true);
    setShowLoginModal(false);
    setTimer(55);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
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

  useEffect(() => {
    if (timer === 0) setEnableResendOTPBtn(true);
    if (!showOTPField || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [showOTPField, timer]);

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
          Reset your password
        </Typography>

        <TextField
          label="Email"
          type="email"
          value={email}
          variant="outlined"
          sx={{ mb: 2 }}
          fullWidth
          required
          onChange={(e) => setEmail(e.target.value)}
          disabled={showOTPField}
        />

        {showOTPField && (
          <Box sx={{ width: "100%", mb: 3 }}>
            <Typography
              sx={{
                fontSize: "0.9rem",
                mb: 1,
                color: "text.secondary",
              }}
            >
              Enter 6-digit OTP
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  id={`otp-${index}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      fontSize: "1.2rem",
                      padding: "10px",
                    },
                  }}
                  sx={{
                    width: 45,
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#0067a3b0",
            ":hover": { bgcolor: "#005785" },
            py: 1.2,
            borderRadius: 2,
          }}
          onClick={handleSendOTP}
          disabled={showOTPField || enableResendOTPBtn}
        >
          {showOTPField
            ? `${timer === 0 ? "Resend OTP" : `Resend OTP(${timer})`}`
            : "Send OTP"}
        </Button>
      </Paper>
    </Box>
  );
}
