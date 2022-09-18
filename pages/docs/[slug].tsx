import { useRouter } from "next/router";
import Link from "next/link";

import { useState, useRef, useEffect, Fragment, createElement } from "react";


import styles from "../../styles/Docs.module.scss";

import docs from "../../resources/docs.yml";

import markdownToHtml from "../../lib/markdownToHtml";
import { getPostBySlug } from "../../lib/getPostBySlug";

const scrollToRef = (ref: any): void => {
  if (ref.current) {
    window.scrollTo(0, ref.current.offsetTop);
  }
};

function Heading({ children, ...props }: any): JSX.Element {
  const { level } = props;
  return createElement(`h${level}`, props, children);
}

const HeadRenderer = (props: any): JSX.Element => {
  const { nodeKey, children, level } = props;
  const linkRef = useRef(null);

  const id = children[0].replace(/\s+/g, "-").toLowerCase();
  const [op, setOp] = useState(0);

  const executeScroll = (): void => scrollToRef(linkRef);

  useEffect(() => {
    setTimeout(() => {
      if (location.hash === `#${id}`) {
        executeScroll();
      }
    }, 500);
  }, [id, linkRef]);

  return (
    <Fragment key={nodeKey}>
      <Heading
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        ref={linkRef}
        onMouseEnter={(): void => setOp(0.8)}
        onMouseLeave={(): void => setOp(0)}
      >
        {children}
        <a id={id} href={`#${id}`}>
          <div
            className={`anchor-link anchor-h${level}`}
            style={{ opacity: op }}
          />
        </a>
      </Heading>
    </Fragment>
  );
};

type Props = {
  data: string;
};

export default function Docs({ data }: Props) {
  const router = useRouter();

  return (
    <>
      <div className={styles.docsWrapperTop} />
      <div className={styles.docsWrapper}>
        <div className={styles.docsSidebar}>
          <div className={styles.docsSidebarContent}>
            {docs.docs.map((title: any) => {
              const sectionData = docs[title];
              const isActive = router.pathname === sectionData.pathname;

              if (docs[title].type === "section") {
                return (
                  <div
                    className={
                      styles.docsSectionLink +
                      (isActive ? " " + styles.docsSectionLinkActive : "")
                    }
                    key={`${title}-side`}
                  >
                    <Link href={`/docs/${title}`}>{sectionData.name}</Link>
                  </div>
                );
              }
              if (docs[title].type === "title") {
                return (
                  <div
                    className={styles.docsSectionTitle}
                    key={`${title}-side-title`}
                  >
                    {sectionData.name}
                  </div>
                );
              }
              return <></>;
            })}
          </div>
        </div>
        <div
          className={styles.docsMain}
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      </div>
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug);

  const content = await markdownToHtml(post || "introduction");

  return {
    props: {
      data: content,
    },
  };
}

export async function getStaticPaths() {
  const allDocs: string[] = docs.paths;

  return {
    paths: allDocs.map((post) => {
      return {
        params: {
          slug: post,
        },
      };
    }),
    fallback: false,
  };
}
