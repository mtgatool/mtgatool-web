import "./footer.css";
/*
import logoDiscord from "../../assets/images/discord_logo.png";
import logoTwitter from "../../assets/images/twitter_logo.png";
import logoGithub from "../../assets/images/github_logo.png";
import logoPatreon from "../../assets/images/patreon_logo.png";
import logoArena from "../../assets/images/arena_logo.png";
*/
import logoTool from "../../assets/cssimages/icon-256.png";

interface FooterLinkProps {
  url: string;
  children: Element | string;
}

function FooterLink(props: FooterLinkProps): JSX.Element {
  const { url, children } = props;

  return (
    <a target="_blank" rel="noopener noreferrer" href={url}>
      {children}
    </a>
  );
}

function Footer(): JSX.Element {
  return (
    <div className="footer-main">
      <div className="footer-wrapper">
        <div className="footer-column">
          <img
            style={{ margin: "auto " }}
            alt="MTG Arena Tool"
            className="footer-logo"
            src={logoTool}
          />
        </div>
        <div className="footer-column">
          <div className="footer-column-title">MTG Arena Tool</div>
          <FooterLink url="mailto:mtgatool@gmail.com">Contact</FooterLink>
          <FooterLink url="https://mtgatool.com/database/">Database</FooterLink>
          <FooterLink url="https://mtgatool.com/docs/">
            Documentation
          </FooterLink>
          <FooterLink url="https://github.com/Manuel-777/MTG-Arena-Tool/releases">
            Releases
          </FooterLink>
        </div>
        <div className="footer-column">
          <div className="footer-column-title">Support us</div>
          <FooterLink url="https://www.paypal.me/ManuelEtchegaray/10">
            Donate
          </FooterLink>
          <FooterLink url="https://www.patreon.com/mtgatool">
            Patreon
          </FooterLink>
        </div>
        <div className="footer-column">
          <div className="footer-column-title">Developers</div>
          <FooterLink url="https://github.com/Manuel-777/MTG-Arena-Tool">
            App Github
          </FooterLink>
          <FooterLink url="https://github.com/mtgatool/mtgatool-web/">
            Website Github
          </FooterLink>
        </div>
        <div className="footer-column">
          <div className="footer-column-title">Places</div>
          <FooterLink url="https://discord.gg/K9bPkJy">Discord</FooterLink>
          <FooterLink url="https://twitter.com/MEtchegaray7">
            Twitter
          </FooterLink>
          <FooterLink url="https://magic.wizards.com/mtgarena">
            MTG: Arena
          </FooterLink>
        </div>
      </div>
      <div className="footer-wrapper">
        <div className="footer-text">
          Portions of MTG Arena Tool are unofficial Fan Content permitted under
          the Fan Content Policy.
          <br />
          The literal and graphical information presented on this site about
          Magic: The Gathering, including card images, the mana symbols, and
          Oracle text, is copyright Wizards of the Coast, LLC, a subsidiary of
          Hasbro, Inc. MTG Arena Tool is not produced by, endorsed by, supported
          by, or affiliated with Wizards of the Coast.
          <br />
          ©Wizards of the Coast LLC.
          <br />
          All other content ©2020 MTG Arena Tool.
        </div>
      </div>
    </div>
  );
}

export default Footer;
