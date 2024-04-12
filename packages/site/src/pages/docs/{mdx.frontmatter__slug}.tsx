import React from 'react';
import { graphql, Link } from 'gatsby';
import type { HeadFC, PageProps } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import AppTableOfContents, { Props as TableContentProps } from '@components/AppTableOfContents';

const shortcodes = { Link };

const DocPage: React.FC<PageProps<Queries.DocPageQuery>> = ({ data, children }) => {
  const { frontmatter, tableOfContents } = data.mdx;

  const contents = tableOfContents.items as TableContentProps['contents'];

  return (
    <>
      <h1 className="text-dark text-4xl mt-[60px] mb-6 font-bold">{frontmatter.title}</h1>
      <div className="flex flex-col lg:flex-row items-start gap-16">
        <AppTableOfContents contents={contents} />
        <div className="overflow-hidden w-full">
          <MDXProvider components={shortcodes}>{children}</MDXProvider>
        </div>
      </div>
    </>
  );
};

export const query = graphql`
  query DocPage($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
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
