import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import "./signin.css";

const Signin = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [name, setName] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signinEmail, setSigninEmail] = useState("");
  const [signupEmail, setSignupEmail] = useState("");

  const postSigninData = () => {
    fetch("/signin", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signinEmail,
        password: signinPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const postSignupData = () => {
    fetch("/signup", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email: signupEmail,
        password: signupPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
        } else {
          history.push("/signin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleForms = (event) => {
    document.body.classList.toggle("toggle-forms");
  };

  return (
    <div className="signin-container">
      <div className="flag signin" onClick={toggleForms}>
        <h1>Signin</h1>
      </div>
      <div className="flag signup" onClick={toggleForms}>
        <h1>Signup</h1>
      </div>
      <div className="signin-form">
        <div className="form">
          <div className="signin-email-input">
            <label htmlFor="email" id="">
              Email
            </label>
            <input
              onChange={(e) => setSigninEmail(e.target.value)}
              type="email"
              name="email"
              id="signinEmail"
              value={signinEmail}
              required
            />
          </div>
          <div className="signin-password-input">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setSigninPassword(e.target.value)}
              type="password"
              name="signinPassword"
              id="signinPassword"
              value={signinPassword}
              required
            />
          </div>
          <button onClick={() => postSigninData()}>Submit</button>
        </div>
      </div>
      <div className="signup-form">
        <div className="form">
          <div className="signup-name-input">
            <label htmlFor="name" id="">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              value={name}
              required
            />
          </div>
          <div className="signup-email-input">
            <label htmlFor="signupEmail" id="">
              Email
            </label>
            <input
              onChange={(e) => setSignupEmail(e.target.value)}
              type="email"
              name="signupEmail"
              id="signupEmail"
              value={signupEmail}
              required
            />
          </div>
          <div className="signup-password-input">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setSignupPassword(e.target.value)}
              type="password"
              name="signupPassword"
              id="signupPassword"
              value={signupPassword}
              required
            />
          </div>
          <button onClick={() => postSignupData()}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
