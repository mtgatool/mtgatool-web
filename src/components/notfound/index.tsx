
import { WrapperOuter } from "../wrapper";
import "./notfound.css";
import Section from "../Section";
import notFoundImage from "../../assets/images/404.jpg";
import { reduxAction } from "../../redux/webRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function NotFound(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    reduxAction(dispatch, { type: "SET_BACK_IMAGE", arg: notFoundImage });
  }, [dispatch]);

  return (
    <WrapperOuter style={{ minHeight: "calc(100vh - 5px)", display: "flex" }}>
      <Section
        style={{ flexDirection: "column", margin: "auto", padding: "1em 3em" }}
      >
        <div className={"title-notfound"}>Uh, oh..</div>
        <div className={"subtitle-notfound"}>
          We have totally lost this page..
        </div>
        <div className={"subtitle-errorcode"}>HTTP 404</div>
      </Section>
    </WrapperOuter>
  );
}

export default NotFound;
