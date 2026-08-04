import Head from "next/head";

export const SITE_URL = "https://mtgatool.com";
export const SITE_NAME = "MTG Arena Tool";

const DEFAULT_TITLE =
  "MTG Arena Tool - MTG Arena deck tracker and statistics manager";

const DEFAULT_DESCRIPTION =
  "MTG Arena Tool is a free deck tracker, collection browser and statistics manager for Magic: The Gathering Arena. Track your matches, see your winrates and explore what other players are brewing.";

const OG_IMAGE = `${SITE_URL}/images/og-card.jpg`;

interface SeoProps {
  /** Page name, e.g. "Release Notes". Omit on the home page. */
  title?: string;
  description?: string;
  /** Path with a leading slash, used for the canonical and og:url. */
  path?: string;
  /** Emit the SoftwareApplication block. Home page only, so it is not
      repeated on every page and diluted. */
  appSchema?: boolean;
}

const APPLICATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "GameApplication",
  operatingSystem: "Windows, macOS, Linux",
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  image: OG_IMAGE,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  isAccessibleForFree: true,
  license: "https://github.com/mtgatool/mtgatool-desktop/blob/master/LICENSE",
  sameAs: [
    "https://github.com/mtgatool/mtgatool-desktop",
    "https://twitter.com/mtgatool",
    "https://discord.gg/K9bPkJy",
    "https://www.patreon.com/cw/mtgatool",
  ],
};

/**
 * Every page renders this. It is the only place head metadata is set, because
 * next/head merges by name/property and splitting defaults between _app and
 * the pages made per-page overrides depend on render order.
 *
 * Open Graph tags use `property`, not `name` — Facebook, LinkedIn and Discord
 * ignore the `name` form, which is how they were previously written.
 */
export default function Seo(props: SeoProps): JSX.Element {
  const { title, description, path = "/", appSchema = false } = props;

  const fullTitle = title ? `${title} - ${SITE_NAME}` : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESCRIPTION;
  const url = `${SITE_URL}${path}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {/* Per page, so sub pages are indexed in their own right rather than
          all declaring the home page as their canonical. */}
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} — ${desc}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mtgatool" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {appSchema && (
        <script
          type="application/ld+json"
          // Serialised from an object literal, so there is no user input to
          // escape here.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(APPLICATION_SCHEMA),
          }}
        />
      )}
    </Head>
  );
}
