import Image from 'next/image'

import icon256 from '../../public/cssimages/icon-256.png'

import styles from "../../styles/Footer.module.scss";

interface FooterLinkProps {
  url: string;
  children: JSX.Element | string;
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
    <footer className={styles.footerMain}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerColumn}>
          <Image
            alt="MTG Arena Tool"
            width={32}
            height={32}
            layout="fixed"
            src={icon256}
          />
        </div>
        <div className={styles.footerColumn}>
          <div className={styles.footerColumnTitle}>MTG Arena Tool</div>
          <FooterLink url="mailto:mtgatool@gmail.com">Contact</FooterLink>
          <FooterLink url="https://mtgatool.com/database/">Database</FooterLink>
          <FooterLink url="https://mtgatool.com/docs/">
            Documentation
          </FooterLink>
          <FooterLink url="https://github.com/mtgatool/mtgatool-desktop/releases">
            Releases
          </FooterLink>
        </div>
        <div className={styles.footerColumn}>
          <div className={styles.footerColumnTitle}>Support us</div>
          <FooterLink url="https://www.paypal.me/ManuelEtchegaray/10">
            Donate
          </FooterLink>
          <FooterLink url="https://www.patreon.com/mtgatool">
            Patreon
          </FooterLink>
        </div>
        <div className={styles.footerColumn}>
          <div className={styles.footerColumnTitle}>Developers</div>
          <FooterLink url="https://github.com/mtgatool/mtgatool-desktop/">
            App Github
          </FooterLink>
          <FooterLink url="https://github.com/mtgatool/mtgatool-web/">
            Website Github
          </FooterLink>
          <FooterLink url="https://github.com/mtgatool/mtgatool-metadata/">
            Metadata Github
          </FooterLink>
        </div>
        <div className={styles.footerColumn}>
          <div className={styles.footerColumnTitle}>Places</div>
          <FooterLink url="https://discord.gg/K9bPkJy">Discord</FooterLink>
          <FooterLink url="https://twitter.com/MEtchegaray7">
            Twitter
          </FooterLink>
          <FooterLink url="https://magic.wizards.com/mtgarena">
            MTG: Arena
          </FooterLink>
        </div>
      </div>
      <div className={styles.footerWrapper}>
        <div className={styles.footerText}>
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
          All other content ©{new Date().getFullYear()} MTG Arena Tool.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
