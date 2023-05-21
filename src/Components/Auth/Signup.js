import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import list from "../Assets/Data/countries.json";import jwt_decode from "jwt-decode";
import swal from "sweetalert";
import TestimonialSlider from "../Testimonial/TestimonialSlider";
import { url } from "../Constants";


const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    fname: "",
    lname: "",
    email: props.email,
    password: "",
    phone: "",
    authcode: null,
    dest: "",
  });

  let history = useNavigate();
  const [sendOtp, setSendOtp] = useState(false);
  const [googleID, setGoogleID] = useState(0);
  const [signUpReq, setSignUpReq] = useState(false);
  const [errors, setErrors] = useState({});

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
          theme: "none",
          longtitle: true,
        }
      );
    };

    initGAuth();
  }, []);


  //for show password toggle_button
  
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




  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  //for manually submitting form
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateMail()) {
      try {
        const response = await fetch(
          `${url}/auth/signup/email/verify`,
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
              password: credentials.password,
              authcode: Number(credentials.authcode),
            }),
            mode: "cors",
            referrerPolicy: "origin-when-cross-origin",
          }
        );
        const json = await response.json();

        if (json.success === true) {
          swal({
            title: "Success!",
            text: "Account Created Successfully",
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



  //for Google submit
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
          title: "Success!",
          text: "Account Created Successfully",
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

  //for sending OTP
  const sendMail = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(
          `${url}/auth/signup/email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ email: credentials.email }),
            mode: "cors",
            referrerPolicy: "origin-when-cross-origin",
          }
        );
        const json = await response.json();

        if (json.success === true) {
          swal({
            title: "Good job!",
            text: json.message,
            icon: "success",
            button: "Ok!",
          });
          setSendOtp(true);
        } else {
          swal({
            title: "Try Again!",
            text: json.message,
            icon: "error",
            button: "Ok!",
          });
          setSendOtp(false);
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

  ///////////////////// validation code////////////////////////////////////////
  //////////////////////// validation code/////////////////////////////////////

  const validateMail = () => {
    let errors = {};
    let isValid = true;

    if (!credentials.authcode) {
      errors.authcode = "authcode is required";
      isValid = false;
    } else if (credentials.authcode?.length !== 6) {
      errors.authcode = "authcode must be of 6 characters";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!credentials.fname) {
      errors.fname = "First Name is required";
      isValid = false;
    } else if (credentials.fname?.length < 2) {
      errors.fname = "Name length atleast 2 char";
      isValid = false;
    }

    if (!credentials.lname) {
      errors.lname = "Last Name is required";
      isValid = false;
    } else if (credentials.lname?.length < 2) {
      errors.lname = "Name length atleast 2 char";
      isValid = false;
    }

    if (!credentials.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!credentials.phone) {
      errors.phone = "Phone is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(credentials.phone)) {
      errors.phone = "Invalid phone number";
      isValid = false;
    }

    if (!credentials.dest) {
      errors.dest = "Destination Name is required";
      isValid = false;
    } else if (credentials.dest?.length < 2) {
      errors.fname = "Destination Name length atleast 2 char";
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


  // //for varification code entry by box to box tried

  // const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
  // const inputRefs = useRef([]);

  // const handleInputChange = (index, event) => {
  //   const newValues = [...inputValues];
  //   newValues[index] = event.target.value;
  //   setInputValues(newValues);

  //   // focus on the next input when a value is entered
  //   if (event.target.value && index < inputValues.length - 1) {
  //     inputRefs.current[index + 1].focus();
  //   }
  // };

  // const handleInputKeyDown = (index, event) => {
  //   // move focus to previous input when backspace is pressed
  //   if (event.key === 'Backspace' && !inputValues[index] && index > 0) {
  //     inputRefs.current[index - 1].focus();
  //   }
  // };

  // const renderInputs = () => {
  //   const inputs = [];
  //   for (let i = 0; i < inputValues.length; i++) {
  //     inputs.push(
  //       <input
  //         key={i}
  //         ref={el => inputRefs.current[i] = el}
  //         className="form-control verification-input"
  //         type="Number"
  //         maxLength={1}
  //         value={inputValues[i]}
  //         onChange={event => handleInputChange(i, event)}
  //         onKeyDown={event => handleInputKeyDown(i, event)}
  //       />
  //     );
  //   }
  //   return inputs;
  // };

  return (
    <div className="container-fluid d-flex px-0">
      <section className="left-panel">
        <TestimonialSlider />
      </section>
      <section className="right-panel">
        <div className="logo mt-4 pt-4">
          <img
            src={require("../Assets/Media/Images/logo.png")}
            className="img-fluid logo-sm"
            alt="Rise Higher Education"
            title="Rise Higher Education"
          />
        </div>
        <div className="main-heading">Register</div>
        <div className="regular-text">
          Thank you for choosing to register with us!
          <br />
          {sendOtp === false
            ? "Please fill out the following form to create your account"
            : "Mail with verification code send to your email-ID"}
        </div>
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
                {errors.phone && (
                  <span style={{ color: "red", fontSize: "small" }}>
                    {errors.phone}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="inputState" className="form-label">
                  Study Destination<span className="required">*</span>
                </label>
                <input
                  list="data"
                  value={credentials.dest}
                  onChange={onChange}
                  placeholder="choose.."
                  className="form-select"
                  name="dest"
                />
                {errors.dest && (
                  <span style={{ color: "red", fontSize: "small" }}>
                    {errors.dest}
                  </span>
                )}

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
          ) : sendOtp === false ? (
            <form onSubmit={sendMail}>
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label htmlFor="exampleInputEmail1">
                      First Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      aria-label="First name"
                      value={credentials.fname}
                      onChange={onChange}
                      name="fname"
                    />
                    {errors.fname && (
                      <span style={{ color: "red", fontSize: "small" }}>
                        {errors.fname}
                      </span>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="exampleInputEmail1">
                      Last Name<span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      aria-label="Last name"
                      value={credentials.lname}
                      onChange={onChange}
                      name="lname"
                    />
                    {errors.lname && (
                      <span style={{ color: "red", fontSize: "small" }}>
                        {errors.lname}
                      </span>
                    )}
                  </div>
                </div>
              </div>
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
                {errors.phone && (
                  <span style={{ color: "red", fontSize: "small" }}>
                    {errors.phone}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="inputState" className="form-label">
                  Study Destination<span className="required">*</span>
                </label>
                <input
                  list="data"
                  value={credentials.dest}
                  onChange={onChange}
                  placeholder="choose.."
                  className="form-select"
                  name="dest"
                />
                {errors.dest && (
                  <span style={{ color: "red", fontSize: "small" }}>
                    {errors.dest}
                  </span>
                )}
                <datalist id="data">
                  {list.map((op, i) => (
                    <option>{op.name}</option>
                  ))}
                </datalist>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label htmlFor="exampleInputEmail1">
                      Email address<span className="required">*</span>
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
                  <div className="col">
                    <label htmlFor="exampleInputPassword1">
                      Password<span className="required">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword"
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
                </div>
                <div className="pt-3" />
                <div className="form-button">
                  <button type="submit" className="btn btn-primary">
                    Send Verification Code
                  </button>
                </div>
                <div className="small-text pt-3 pb-3 text-center">
                  Or continue with
                </div>
                <div className="social-buttons d-flex justify-content-between pb-3">
                  <button className="social-icon" id="googlebtn">
                    <i className="fa-brands fa-google fa-lg" />
                  </button>
                  <a href="/" className="social-icon">
                    <i className="fa-brands fa-linkedin fa-lg" />
                  </a>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Verification Code<span className="required">*</span>
                </label>
                <input
                  type="Number"
                  className="form-control"
                  id="exampleInputauthcode1"
                  aria-describedby="authcodeHelp"
                  placeholder="Enter authcode"
                  value={credentials.authcode}
                  onChange={onChange}
                  name="authcode"
                />
                {errors.authcode && (
                  <span style={{ color: "red", fontSize: "small" }}>
                    {errors.authcode}
                  </span>
                )}

                {/* <div>{renderInputs()}</div> */}
              </div>
              <div className="pt-3" />
              <div className="form-button">
                <button type="submit" className="btn btn-primary">
                  Verify OTP
                </button>
              </div>
              <div className="pt-3" />
            </form>
          )}
        </div>
        <div className="regular-text text-center">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </section>
    </div>
  );
};

export default Signup;
