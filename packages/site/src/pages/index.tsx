import React from 'react';
import { graphql, Link } from 'gatsby';
import type { HeadFC, PageProps } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import PageContent from '../docs/index.mdx';
import AppTableOfContents, { Props as TableContentProps } from '@components/AppTableOfContents';

const shortcodes = { Link };

const IndexPage: React.FC<PageProps<Queries.IndexPageQuery>> = ({ data }) => {
  const { frontmatter, tableOfContents } = data.mdx;

  const contents = tableOfContents.items as TableContentProps['contents'];
  return (
    <>
      <h1 className="text-dark text-4xl mt-[60px] mb-6 font-bold">{frontmatter.title}</h1>
      <div className="flex flex-col lg:flex-row items-start gap-16 w-full">
        <AppTableOfContents contents={contents} />
        <div className="overflow-hidden w-full">
          <MDXProvider components={shortcodes}>
            <PageContent />
          </MDXProvider>
        </div>
      </div>
    </>
  );
};

export const query = graphql`
  query IndexPage {
    mdx(frontmatter: { slug: { eq: "hello-world" } }) {
      frontmatter {
        title
        slug
        date(fromNow: false)
        tableOfContentsDepth
      }
      tableOfContents
    }
  }
`;

export const Head: HeadFC<Queries.IndexPageQuery> = ({ data }) => (
  <>
    <title>{data.mdx.frontmatter.title}</title>
  </>
);

export default IndexPage;
