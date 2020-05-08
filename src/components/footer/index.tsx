/* eslint-disable react/prop-types */
import React from "react";
import css from "./footer.css";
/*
import logoDiscord from "../../images/discord_logo.png";
import logoTwitter from "../../images/twitter_logo.png";
import logoGithub from "../../images/github_logo.png";
import logoPatreon from "../../images/patreon_logo.png";
import logoArena from "../../images/arena_logo.png";
*/
import logoTool from "../../cssimages/icon-256.png";

function Footer(): JSX.Element {
  return (
    <div className={css.footerMain}>
      <div className={css.footerWrapper}>
        <div className={css.footerColumn}>
          <img
            style={{ margin: "auto " }}
            alt="MTG Arena Tool"
            className={css.footerLogo}
            src={logoTool}
          />
        </div>
        <div className={css.footerColumn}>
          <div className={css.footerColumnTitle}>MTG Arena Tool</div>
          <FooterLink url="mailto:mtgatool@gmail.com">Contact</FooterLink>
          <FooterLink url="https://mtgatool.com/database/">Database</FooterLink>
          <FooterLink url="./docs/">Documentation</FooterLink>
          <FooterLink url="https://github.com/Manuel-777/MTG-Arena-Tool/releases">
            Releases
          </FooterLink>
        </div>
        <div className={css.footerColumn}>
          <div className={css.footerColumnTitle}>Support us</div>
          <FooterLink url="https://www.paypal.me/ManuelEtchegaray/10">
            Donate
          </FooterLink>
          <FooterLink url="https://www.patreon.com/mtgatool">
            Patreon
          </FooterLink>
        </div>
        <div className={css.footerColumn}>
          <div className={css.footerColumnTitle}>Developers</div>
          <FooterLink url="https://github.com/Manuel-777/MTG-Arena-Tool">
            App Github
          </FooterLink>
          <FooterLink url="https://github.com/mtgatool/mtgatool-web/">
            Website Github
          </FooterLink>
        </div>
        <div className={css.footerColumn}>
          <div className={css.footerColumnTitle}>Places</div>
          <FooterLink url="https://discord.gg/K9bPkJy">Discord</FooterLink>
          <FooterLink url="https://twitter.com/MEtchegaray7">
            Twitter
          </FooterLink>
          <FooterLink url="https://magic.wizards.com/mtgarena">
            MTG: Arena
          </FooterLink>
        </div>
      </div>
      <div className={css.footerWrapper}>
        <div className={css.footerText}>
          Portions of MTG Arena Tool are unofficial Fan Content permitted under
          the Fan Content Policy.
          <br></br>
          The literal and graphical information presented on this site about
          Magic: The Gathering, including card images, the mana symbols, and
          Oracle text, is copyright Wizards of the Coast, LLC, a subsidiary of
          Hasbro, Inc. MTG Arena Tool is not produced by, endorsed by, supported
          by, or affiliated with Wizards of the Coast.
          <br></br>
          ©Wizards of the Coast LLC.
          <br></br>
          All other content ©2020 MTG Arena Tool.
        </div>
      </div>
    </div>
  );
}

interface FooterLinkProps { url: string; children: Element | string;}

function FooterLink(props: FooterLinkProps): JSX.Element {
  const { url, children } = props;

  return (
    <a target="_blank" rel="noopener noreferrer" href={url}>
      {children}
    </a>
  );
}

export default Footer;
