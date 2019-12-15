/* eslint-disable react/prop-types */
import React from "react";
import css from "./footer.css";

import logoDiscord from "../../images/discord_logo.png";
import logoTwitter from "../../images/twitter_logo.png";
import logoGithub from "../../images/github_logo.png";
import logoPatreon from "../../images/patreon_logo.png";
import logoArena from "../../images/arena_logo.png";

function Footer() {
  return (
    <div className={css["footer-main"]}>
      <div className={css["footer-wrapper"]}>
        <FooterLink url="https://discord.gg/K9bPkJy" image={logoDiscord} />
        <FooterLink
          url="https://twitter.com/MEtchegaray7"
          image={logoTwitter}
        />
        <FooterLink
          url="https://github.com/Manuel-777/MTG-Arena-Tool"
          image={logoGithub}
        />
        <FooterLink
          url="https://www.patreon.com/mtgatool"
          image={logoPatreon}
        />
        <FooterLink
          url="https://magic.wizards.com/mtgarena"
          image={logoArena}
        />
      </div>
      <div className={css["footer-wrapper"]}>
        <div className={css["footer-text"]}>
          MTG Arena Tool is unofficial Fan Content permitted under the Fan
          Content Policy.
          <br></br>
          Not approved/endorsed by Wizards. Portions of the materials used are
          property of Wizards of the Coast.
          <br></br>
          ©Wizards of the Coast LLC.
        </div>
      </div>
    </div>
  );
}

function FooterLink(props) {
  const { url, image } = props;

  return (
    <>
      <a target="_blank" rel="noopener noreferrer" href={url}>
        <img alt="" className={css["footer-logo"]} src={image} />
      </a>
    </>
  );
}

export default Footer;
