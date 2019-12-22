/* eslint-disable react/prop-types */
import React from "react";
import { useRouteMatch } from "react-router-dom";
import crypto from "crypto";
import ReCAPTCHA from "react-google-recaptcha";
import { WrapperInner, WrapperOuter } from "../wrapper";
import regcss from "../register/register.css";
import keyArt from "../../images/key-art.jpg";

function ResetPassword(props) {
  const { setImage } = props;
  const [errorMessage, setErrorMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    email: "",
    pass: "",
    passc: "",
    recaptcha: ""
  });
  const tokenMatch = useRouteMatch("/resetpassword/:token");
  const recaptchaRef = React.createRef();

  const checkMode = () => {
    return (
      !tokenMatch || tokenMatch.params == null || tokenMatch.params.token == ""
    );
  };

  const doSubmit = () => {
    const shasum = crypto.createHash("sha1");
    shasum.update(formData.pass);
    const passHash = shasum.digest("hex");
    // Send request
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      // Handle response
      try {
        const response = JSON.parse(xhr.responseText);
        if (!response.ok && response.error) {
          setErrorMessage(response.error);
        } else {
          if (checkMode) {
            setErrorMessage("We sent you an email!");
          } else {
            setErrorMessage("Sucessfully changed your password!");
          }
        }
      } catch (e) {
        console.log(e, xhr.responseText);
        setErrorMessage("Error reading response.");
      }
    });
    xhr.open("POST", "https://mtgatool.com/reset.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (checkMode()) {
      xhr.send(
        `m=0&email=${formData.email}&g-recaptcha-response=${formData.recaptcha}`
      );
    } else {
      xhr.send(`m=1&tk=${tokenMatch.params.token}&newpass=${passHash}`);
    }
  };

  const handleEmailChange = event => {
    setFormData({ ...formData, email: event.target.value });
  };

  const handlePassChange = event => {
    setFormData({ ...formData, pass: event.target.value });
  };

  const handlePasscChange = event => {
    setFormData({ ...formData, passc: event.target.value });
  };

  const handleCaptchaChange = () => {
    setFormData({
      ...formData,
      recaptcha: recaptchaRef.current.getValue()
    });
  };

  const onSubmit = event => {
    // Submit the form
    const mode = checkMode();
    if (formData.pass !== formData.passc && !mode) {
      setErrorMessage("Passwords dont match");
    } else if (formData.pass.length < 8 && !mode) {
      setErrorMessage("Passwords must contain at least 8 characters.");
    } else {
      setErrorMessage("");
      doSubmit();
    }
    event.preventDefault();
  };

  React.useEffect(() => {
    setImage(keyArt);
  }, []);

  return (
    <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
      <WrapperInner>
        <div className={regcss["form-authenticate"]}>
          <div className={regcss["form-icon"]} />
          <form onSubmit={onSubmit} id="registerform" method="POST">
            {checkMode() ? (
              <>
                <label className={regcss["form-label"]}>Email</label>
                <div className={regcss["form-input-container"]}>
                  <input
                    onChange={handleEmailChange}
                    type="email"
                    id="signin_email"
                    autoComplete="off"
                  />
                </div>

                <ReCAPTCHA
                  ref={recaptchaRef}
                  onChange={handleCaptchaChange}
                  sitekey="6LesQnQUAAAAABMfGoGiJRgWJLYlBJI6_6sSKaDL"
                />
                <button
                  className={regcss["form-button"]}
                  type="submit"
                  id="submit"
                >
                  Reset Password
                </button>
              </>
            ) : (
              <>
                <label className={regcss["form-label"]}>New Password</label>
                <div className={regcss["form-input-container"]}>
                  <input
                    onChange={handlePassChange}
                    type="password"
                    id="signin_pass"
                    autoComplete="off"
                  />
                </div>
                <label className={regcss["form-label"]}>Confirm Password</label>
                <div
                  style={{ paddingBottom: "20px" }}
                  className={regcss["form-input-container"]}
                >
                  <input
                    onChange={handlePasscChange}
                    type="password"
                    id="signin_passconf"
                    autoComplete="off"
                  />
                </div>

                <button
                  className={regcss["form-button"]}
                  type="submit"
                  id="submit"
                >
                  Confirm
                </button>
              </>
            )}
            <div className={regcss["form-error"]}>{errorMessage}</div>
          </form>
        </div>
      </WrapperInner>
    </WrapperOuter>
  );
}

export default ResetPassword;
