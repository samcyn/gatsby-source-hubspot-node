import React from 'react';
import type { PageProps } from 'gatsby';

import { Props as TableContentProps } from '@components/AppTableOfContents';
import ContentMarkUp from '@components/ContentMarkUp';

const DocMarkUp: React.FC<PageProps<unknown, Queries.GetAllDocumentsQuery['allMdx']['nodes'][0]>> = ({
  pageContext,
  children,
}) => {
  const { frontmatter, tableOfContents } = pageContext;
  const { title, tail, summary } = frontmatter;

  const contents = tableOfContents.items as TableContentProps['contents'];
  return (
    <ContentMarkUp title={title} tail={tail} summary={summary} contents={contents}>
      {children}
    </ContentMarkUp>
  );
};

export default DocMarkUp;
