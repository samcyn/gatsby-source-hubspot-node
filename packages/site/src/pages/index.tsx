import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

const IndexPage: React.FC<PageProps> = () => {
  return <div>index</div>;
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Home Page</title>
    <meta name="author" content="Samson Iyanda"></meta>
    <meta name="description" content="site for gatsby source hubspot plugin documentation"></meta>
    <meta name="keywords" content="gatsby, gatsby plugin, reactjs, hubspot"></meta>
  </>
);
