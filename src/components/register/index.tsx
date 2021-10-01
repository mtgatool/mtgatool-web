import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { sha1 } from "tool-db";
import { WrapperInner, WrapperOuter } from "../wrapper";
import "./register.css";
import { reduxAction } from "../../redux/webRedux";

function signup(username: string, password: string): Promise<any> {
  return window.toolDb.signUp(username, password).then((msg) => {
    console.log(msg);
    return new Promise((resolve) => {
      window.toolDb
        .signIn(username, password)
        .then(() => window.toolDb.putData("userids", {}, true))
        .then(() => window.toolDb.putData("decksIndex", {}, true))
        .then(() => window.toolDb.putData("matchesIndex", [], true))
        .then(() => resolve(msg));
    });
  });
}

function Register(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    reduxAction(dispatch, { type: "SET_BACK_IMAGE", arg: "" });
  }, [dispatch]);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    pass: "",
    passc: "",
    recaptcha: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const handleUsernameChange = (event: any): void => {
    setFormData({ ...formData, username: event.target.value });
  };

  const handlePassChange = (event: any): void => {
    setFormData({ ...formData, pass: event.target.value });
  };

  const handlePassConfirmationChange = (event: any): void => {
    setFormData({ ...formData, passc: event.target.value });
  };

  const onSubmit = (event: any): void => {
    // Submit the form
    if (formData.username.length < 5) {
      setErrorMessage("Username must be at least 5 characters long");
    } else if (formData.pass !== formData.passc) {
      setErrorMessage("Passwords must match");
    } else if (formData.pass.length < 8) {
      setErrorMessage("Passwords must contain at least 8 characters.");
    } else {
      setErrorMessage("");
      signup(formData.username, sha1(formData.pass))
        .then(() => {
          setErrorMessage("Sign up sucessful!");
        })
        .catch((err) => setErrorMessage(err.message));
    }
    event.preventDefault();
  };

  return (
    <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
      <WrapperInner>
        <div className="form-authenticate">
          <div className="form-icon" />
          <form onSubmit={onSubmit} id="registerform" method="POST">
            <label className="form-label">Username</label>
            <div className="form-input-container">
              <input
                onChange={handleUsernameChange}
                type="username"
                id="signup_username"
                autoComplete="off"
              />
            </div>
            <label className="form-label">Password</label>
            <div className="form-input-container">
              <input
                onChange={handlePassChange}
                type="password"
                id="signup_pass"
                autoComplete="off"
              />
            </div>
            <label className="form-label">Confirm Password</label>
            <div
              style={{ paddingBottom: "20px" }}
              className="form-input-container"
            >
              <input
                onChange={handlePassConfirmationChange}
                type="password"
                id="signup_passconf"
                autoComplete="off"
              />
            </div>
            <button className="form-button" type="submit" id="submit">
              Signup
            </button>
            <div className="form-error">{errorMessage}</div>
          </form>
        </div>
      </WrapperInner>
    </WrapperOuter>
  );
}

export default Register;
