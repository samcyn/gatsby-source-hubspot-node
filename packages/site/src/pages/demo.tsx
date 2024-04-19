import * as React from 'react';
import { graphql } from 'gatsby';
import type { HeadFC, PageProps } from 'gatsby';

import PageContent from '../docs/demo.mdx';
import ContentMarkUp from '../components/ContentMarkUp';
import { Props as TableContentProps } from '@components/AppTableOfContents';

const DashboardPage: React.FC<PageProps<Queries.DashboardPageQuery>> = ({
  data: {
    allPost: { nodes: posts },
    allContact: { nodes: contacts },
    repository: repo,
    mdx: { frontmatter, tableOfContents },
  },
}) => {
  const contents = (tableOfContents.items as TableContentProps['contents']) || [];
  return (
    <ContentMarkUp title={frontmatter.title} tail={frontmatter.tail} contents={contents} summary={repo.description}>
      <PageContent repo={repo} posts={posts} contacts={contacts} />
    </ContentMarkUp>
  );
};

export default DashboardPage;

export const Head: HeadFC = () => (
  <>
    <html lang="en" />
    <title>Demo Page</title>
    <meta name="author" content="Samson Iyanda"></meta>
    <meta name="description" content="site for gatsby source hubspot plugin documentation"></meta>
    <meta name="keywords" content="gatsby, gatsby plugin, reactjs, hubspot"></meta>
  </>
);

export const query = graphql`
  query DashboardPage {
    repository(name: { eq: "gatsby-source-hubspot-node" }) {
      description
      forks_count
      license {
        name
      }
      name
      open_issues
      stargazers_count
      html_url
      id
    }
    allContact(limit: 5) {
      nodes {
        id
        properties {
          firstname
          email
          lastname
          hs_object_id
        }
      }
    }
    allPost(limit: 5) {
      nodes {
        id
        name
        slug
        title
        author_name
        blog_author {
          avatar
        }
        post_summary
        featured_image {
          gatsbyImage(width: 400)
        }
      }
    }
    mdx(frontmatter: { slug: { eq: "demo" } }) {
      frontmatter {
        title
        tail
        slug
        date(fromNow: false)
        tableOfContentsDepth
      }
      tableOfContents
    }
  }
`;
