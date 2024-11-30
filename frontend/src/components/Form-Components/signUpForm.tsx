import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleIcon, FacebookIcon } from "./customIcons";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { register } from "../APICalls";
import { useNavigate } from "react-router-dom";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#644934",
    },
  },
});

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [firstnameError, setFirstnameError] = React.useState(false);
  const [firstnameErrorMessage, setFirstnameErrorMessage] = React.useState("");
  const [lastnameError, setLastnameError] = React.useState(false);
  const [lastnameErrorMessage, setLastnameErrorMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    const firstname = data.get("firstname")?.toString();
    const lastname = data.get("lastname")?.toString();

    if(!email || !password || !firstname || !lastname) { return; }
    const response = await register(firstname, lastname, email, password);
    
    if(!response.result)
    {
      setEmailError(true);
      setEmailErrorMessage("Email is already registered!");
      return;
    }
    localStorage.setItem("remember", rememberMe.toString());
    navigate("/products");
  };
  

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const firstname = document.getElementById("firstname") as HTMLInputElement;
    const lastname = document.getElementById("lastname") as HTMLInputElement;

    let isValid = true;

    if(!firstname.value){
      setFirstnameError(true);
      setFirstnameErrorMessage("Please enter your first name.");
      isValid = false;
    } else {
      setFirstnameError(false);
      setFirstnameErrorMessage("");
    }

    if(!lastname.value){
      setLastnameError(true);
      setLastnameErrorMessage("Please enter your last name.");
    } else {
      setLastnameError(false);
      setLastnameErrorMessage("");
    }

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              color: "black",
              textAlign: "left",
            }}
          >
            Create Your Account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
              textAlign: "left",
            }}
          >
            <FormControl>
              <FormLabel htmlFor="firstname">First Name</FormLabel>
              <TextField
                error={firstnameError}
                helperText={firstnameErrorMessage}
                id="firstname"
                type="text"
                name="firstname"
                placeholder="First Name"
                autoComplete="firstame"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
              </FormControl>
              <FormControl>
              <FormLabel htmlFor="lastname">Last Name</FormLabel>
              <TextField
                error={lastnameError}
                helperText={lastnameErrorMessage}
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Last Name"
                autoComplete="lastname"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="Must be at least 6 characters"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" onChange={(e: any) => setRememberMe(e.target.checked)}/>}
              label="Remember me"
            />
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign Up
            </Button>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign Up with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign Up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign Up with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign Up with Facebook
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link to="/login" variant="body2" sx={{ alignSelf: "center" }}>
                Log In
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </ThemeProvider>
  );
}
