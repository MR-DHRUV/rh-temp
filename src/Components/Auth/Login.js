import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import list from "../Assets/Data/countries.json";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import swal from "sweetalert";
import TestimonialSlider from "../Testimonial/TestimonialSlider";
import { url } from "../Constants";


const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();
  const [googleID, setGoogleID] = useState(0);
  const [signUpReq, setSignUpReq] = useState(false);
  const [errors, setErrors] = useState({});

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(
          `${url}/auth/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            mode: "cors",
            referrerPolicy: "origin-when-cross-origin",
          }
        );
        const json = await response.json();

        if (json.success === true) {
          swal({
            title: "Welcome!",
            text: "Logged in Successfully",
            icon: "success",
            button: "Ok!",
          });
          await localStorage.setItem("token", json.authToken);
          history("/scholarship");
        } else {
          swal({
            title: "Try Again!",
            text: json.message,
            icon: "error",
            button: "Ok!",
          });
        }
      } catch (err) {
        swal({
          title: "Try Again!",
          text: "server routing error!",
          icon: "error",
          button: "Ok!",
        });
      }
    }
  };

  const handleCallbackResponse = async (response) => {
    // getting the jwt token and setting userObject as it response
    // console.log("JWT ID TOKEN: ", response.credential);
    var userObject = await jwt_decode(response.credential);

    setCredentials({
      email: userObject.email,
      fname: userObject.given_name,
      lname: userObject.family_name,
    });
    setGoogleID(userObject.sub);

    const res = await fetch(
      `${url}/oauth/google/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ googleId: userObject.sub }),
        mode: "cors",
        referrerPolicy: "origin-when-cross-origin",
      }
    );

    const json = await res.json();
    console.log(json);

    if (json.requireSignup === false) {
      await localStorage.setItem("token", json.authToken);
      history("/scholarship");
    } else {
      setSignUpReq(true);
    }
  };

  const handleGoogleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${url}/oauth/google/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            fname: credentials.fname,
            lname: credentials.lname,
            phone: credentials.phone,
            dest: credentials.dest,
            email: credentials.email,
            googleId: googleID,
          }),
          mode: "cors",
          referrerPolicy: "origin-when-cross-origin",
        }
      );
      const json = await response.json();

      if (json.success === true) {
        swal({
          title: "Welcome!",
          text: "Logged in Successfully",
          icon: "success",
          button: "Ok!",
        });
        await localStorage.setItem("token", json.authToken);
        history("/scholarship");
      } else {
        swal({
          title: "Try Again!",
          text: json.message,
          icon: "error",
          button: "Ok!",
        });
      }
    } catch (err) {
      swal({
        title: "Try Again!",
        text: "server routing error!",
        icon: "error",
        button: "Ok!",
      });
    }
  };

  function LinkedInPage() {
    const { linkedInLogin } = useLinkedIn({
      clientId: "863d7n1sff8fi9",
      redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
      onSuccess: (code) => {
        console.log(code);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history("/scholarship");
    }

    /* global google */
    const initGAuth = async () => {
      await google.accounts.id.initialize({
        client_id:
          "208870428930-ad67u1ss3cvahprbugg5bi0j848kl3ss.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });

      await google.accounts.id.renderButton(
        document.getElementById("googlebtn"),
        {
          theme: "outline",
          size: "large",
          longtitle: true,
        }
      );
    };

    initGAuth();
  }, []);

  //for password to show
  
  useEffect(() => {
    const ShowPasswordToggle = document.querySelector("[type='password']");
    const togglePasswordButton = document.getElementById("toggle-password");
    const passwordInput = document.querySelector("[type='password']");
    
    ShowPasswordToggle.onclick = function() {
      document.querySelector("[type='password']").classList.add("input-password");
      document.getElementById("toggle-password").classList.remove("d-none");
      const passwordInput = document.querySelector("[type='password']");
      const togglePasswordButton = document.getElementById("toggle-password");
      togglePasswordButton.addEventListener("click", togglePassword);
    };

    const togglePassword = () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordButton.setAttribute("aria-label", "Hide password.");
      } else {
        passwordInput.type = "password";
        togglePasswordButton.setAttribute(
          "aria-label",
          "Show password as plain text. " +
            "Warning: this will display your password on the screen."
        );
      }
    }
  }, []);

  /////////////////////////// form validation/////////////////////////////
  /////////////////////////// form validation/////////////////////////////

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!credentials.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!credentials.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (credentials.password?.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };


   /////////////////////////// form validation ended here/////////////////////////////
  /////////////////////////// form validation ended here/////////////////////////////

  return (
    <div className="container-fluid d-flex px-0">
      <section className="left-panel">
        <TestimonialSlider />
      </section>
      <section className="right-panel">
        <div className="logo">
          <img
            src={require("../Assets/Media/Images/logo.png")}
            className="img-fluid logo-sm"
            alt="Rise Higher Education"
            title="Rise Higher Education"
          />
        </div>
        <div className="main-heading">Welcome Back</div>
        <div className="regular-text">Please enter your details to login</div>
        <div className="sep" />
        <div className="page-form">
          {signUpReq === true ? (
            <form onSubmit={handleGoogleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Phone<span className="required">*</span>
                </label>
                <input
                  type="Number"
                  className="form-control"
                  id="exampleInputPhone"
                  aria-describedby="emailHelp"
                  placeholder="Enter phone number"
                  value={credentials.phone}
                  onChange={onChange}
                  name="phone"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputState" className="form-label">
                  Study Destination
                </label>
                <input
                  list="data"
                  value={credentials.dest}
                  onChange={onChange}
                  placeholder="choose.."
                  className="form-select"
                  name="dest"
                />
                <datalist id="data">
                  {list.map((op, i) => (
                    <option>{op.name}</option>
                  ))}
                </datalist>
              </div>
              <div className="form-group">
                <div className="pt-3" />
                <div className="form-button">
                  <button
                    disabled={credentials.phone?.length < 10}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <>
              {" "}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    Email<span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={credentials.email}
                    onChange={onChange}
                    name="email"
                  />
                  {errors.email && (
                    <span style={{ color: "red", fontSize: "small" }}>
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Password<span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={onChange}
                    name="password"
                  />
                  {errors.password && (
                    <span style={{ color: "red", fontSize: "small" }}>
                      {errors.password}
                    </span>
                  )}
                  <button
                    id="toggle-password"
                    type="button"
                    className="d-none"
                    aria-label="Show password as plain text. Warning: this will display your password on the screen."
                  />
                </div>
                <div className="form-settings d-flex justify-content-between">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Remember Me
                    </label>
                  </div>
                  <div>
                    <Link to="/forgotpassword">Forgot Password?</Link>
                  </div>
                </div>
                <div className="pt-3" />
                <div className="form-button">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
              <div className="small-text pt-3 pb-3 text-center">
                Or continue with
              </div>
              <div className="social-buttons d-flex justify-content-between pb-3">
                <a href="/" id="googlebtn" className="social-icon">
                  <i className="fa-brands fa-google fa-lg" />
                </a>
                <button className="social-icon">
                  <i className="fa-brands fa-linkedin fa-lg" />
                </button>
                {/* <a href="/" className="social-icon">
              <i className="fa-brands fa-apple fa-lg" />
            </a> */}
              </div>
              <div className="regular-text text-center">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Login;
