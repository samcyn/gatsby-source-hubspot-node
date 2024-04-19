import React from 'react';
import { graphql } from 'gatsby';
import type { HeadFC, PageProps } from 'gatsby';

import PageContent from '../docs/index.mdx';
import ContentMarkUp from '@components/ContentMarkUp';
import { Props as TableContentProps } from '@components/AppTableOfContents';

const IndexPage: React.FC<PageProps<Queries.IndexPageQuery>> = ({ data }) => {
  const { frontmatter, tableOfContents } = data.mdx;

  const contents = tableOfContents.items as TableContentProps['contents'];
  return (
    <ContentMarkUp title={frontmatter.title} tail={frontmatter.tail} contents={contents} summary={frontmatter.summary}>
      <PageContent />
    </ContentMarkUp>
  );
};

export const query = graphql`
  query IndexPage {
    mdx(frontmatter: { slug: { eq: "hello-world" } }) {
      frontmatter {
        title
        tail
        slug
        summary
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
    <meta name="author" content="Samson Iyanda"></meta>
    <meta name="description" content="site for gatsby source hubspot plugin documentation"></meta>
    <meta name="keywords" content="gatsby, gatsby plugin, reactjs, hubspot"></meta>
  </>
);

export default IndexPage;
