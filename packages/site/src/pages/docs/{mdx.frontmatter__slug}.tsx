import React from 'react';
import { graphql } from 'gatsby';
import type { HeadFC, PageProps } from 'gatsby';

import { Props as TableContentProps } from '@components/AppTableOfContents';
import ContentMarkUp from '../../templates/ContentMarkUp';

const DocPage: React.FC<PageProps<Queries.DocPageQuery>> = ({ data, children }) => {
  const { frontmatter, tableOfContents } = data.mdx;

  const contents = tableOfContents.items as TableContentProps['contents'];

  return (
    <ContentMarkUp title={frontmatter.title} tail={frontmatter.tail} contents={contents} summary={frontmatter.summary}>
      {children}
    </ContentMarkUp>
  );
};

export const query = graphql`
  query DocPage($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        tail
        summary
        date(formatString: "MMMM D, YYYY")
      }
      tableOfContents
    }
  }
`;

export const Head: HeadFC<Queries.DocPageQuery> = ({ data }) => (
  <>
    <title>{data.mdx.frontmatter.title}</title>
  </>
);

export default DocPage;
