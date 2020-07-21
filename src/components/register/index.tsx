/* eslint-disable react/prop-types */
import React from "react";
import crypto from "crypto";
import ReCAPTCHA from "react-google-recaptcha";
import { WrapperInner, WrapperOuter } from "../wrapper";
import css from "./register.css";
import keyArt from "../../assets/images/key-art.jpg";
import { ExportViewProps } from "../../web-types/shared";

function Register(props: ExportViewProps): JSX.Element {
  const { setImage } = props;
  const [errorMessage, setErrorMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    email: "",
    pass: "",
    passc: "",
    recaptcha: ""
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recaptchaRef = React.createRef<any>();

  const doSubmit = (): void => {
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
          setErrorMessage("Sucess! You may now log in.");
        }
      } catch (e) {
        console.log(e, xhr.responseText);
        setErrorMessage("Error reading response.");
      }
    });
    xhr.open("POST", "https://mtgatool.com/api/register.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(
      `password=${passHash}&email=${formData.email}&g-recaptcha-response=${formData.recaptcha}`
    );
  };

  const handleEmailChange = (event): void => {
    setFormData({ ...formData, email: event.target.value });
  };

  const handlePassChange = (event): void => {
    setFormData({ ...formData, pass: event.target.value });
  };

  const handlePasscChange = (event): void => {
    setFormData({ ...formData, passc: event.target.value });
  };

  const handleCaptchaChange = (): void => {
    setFormData({
      ...formData,
      recaptcha: recaptchaRef?.current?.getValue()
    });
  };

  const onSubmit = (event): void => {
    // Submit the form
    if (formData.pass !== formData.passc) {
      setErrorMessage("Passwords dont match");
    } else if (formData.pass.length < 8) {
      setErrorMessage("Passwords must contain at least 8 characters.");
    } else {
      setErrorMessage("");
      doSubmit();
    }
    event.preventDefault();
  };

  React.useEffect(() => {
    setImage(keyArt);
  }, [setImage]);

  return (
    <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
      <WrapperInner>
        <div className={css.formAuthenticate}>
          <div className={css.formIcon} />
          <form onSubmit={onSubmit} id="registerform" method="POST">
            <label className={css.formLabel}>Email</label>
            <div className={css.formInputContainer}>
              <input
                onChange={handleEmailChange}
                type="email"
                id="signin_email"
                autoComplete="off"
              />
            </div>
            <label className={css.formLabel}>Password</label>
            <div className={css.formInputContainer}>
              <input
                onChange={handlePassChange}
                type="password"
                id="signin_pass"
                autoComplete="off"
              />
            </div>
            <label className={css.formLabel}>Confirm Password</label>
            <div
              style={{ paddingBottom: "20px" }}
              className={css.formInputContainer}
            >
              <input
                onChange={handlePasscChange}
                type="password"
                id="signin_passconf"
                autoComplete="off"
              />
            </div>
            <ReCAPTCHA
              ref={recaptchaRef}
              onChange={handleCaptchaChange}
              sitekey="6LesQnQUAAAAABMfGoGiJRgWJLYlBJI6_6sSKaDL"
            />
            <button className={css.formButton} type="submit" id="submit">
              Register
            </button>
            <div className={css.formError}>{errorMessage}</div>
          </form>
        </div>
      </WrapperInner>
    </WrapperOuter>
  );
}

export default Register;
