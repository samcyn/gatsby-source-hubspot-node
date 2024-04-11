import * as React from 'react';
import { graphql } from 'gatsby';
import type { HeadFC, PageProps } from 'gatsby';

import AppCard from '@components/AppCard';
import AppTabs, { AppTab } from '@components/AppTabs';
import AppCardWithPhoto from '@components/AppCard/AppCardWithPhoto';
import AppCardWithContact from '@components/AppCard/AppCardWithContact';

const IndexPage: React.FC<PageProps<Queries.IndexPageQuery>> = ({
  data: {
    allPost: { nodes: posts },
    allContact: { nodes: contacts },
    repository: repo,
  },
}) => {
  return (
    <>
      <div className="mt-10 md:max-w-[500px] lg:max-w-[656px]">
        <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark dark:text-white mb-6">
          Gatsby Source <span className="text-primary">Hubspot Node Plugin v1.0.1</span>
        </p>
        <p className="text-sm md:text-xl text-gray-80 dark:text-gray-50">{repo.description}</p>
      </div>

      <AppCard className="p-4 mt-10 mb-10 bg-white dark:bg-gray-80 shadow-2xl">
        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 place-content-between md:place-items-center bg-brand-dgray dark:bg-dark shadow-sm rounded-md px-6 py-4 gap-4">
          <li className="flex justify-center md:justify-normal basis-full md:basis-auto">
            <div className="text-center">
              <p className="font-bold text-lg text-dark dark:text-gray-50">1.0.1</p>
              <p className="font-medium text-xs text-primary dark:text-gray-50">Version</p>
            </div>
          </li>
          <li className="flex justify-center md:justify-normal basis-full md:basis-auto">
            <div className="text-center">
              <p className="font-bold text-lg text-dark dark:text-gray-50">{repo.license.name}</p>
              <p className="font-medium text-xs text-primary dark:text-gray-50">License</p>
            </div>
          </li>
          <li className="flex justify-center md:justify-normal basis-full md:basis-auto">
            <div className="text-center">
              <p className="font-bold text-lg text-dark dark:text-gray-50">{repo.stargazers_count}</p>
              <p className="font-medium text-xs text-primary dark:text-gray-50">Stars 🌟</p>
            </div>
          </li>
          <li className="flex justify-center md:justify-normal basis-full md:basis-auto">
            <div className="text-center">
              <p className="font-bold text-lg text-dark dark:text-gray-50">{repo.open_issues}</p>
              <p className="font-medium text-xs text-primary dark:text-gray-50">Open Issues</p>
            </div>
          </li>
          <li className="flex justify-center md:justify-normal basis-full md:basis-auto">
            <div className="text-center">
              <p className="font-bold text-lg text-dark dark:text-gray-50">{repo.forks_count}</p>
              <p className="font-medium text-xs text-primary dark:text-gray-50">Forks</p>
            </div>
          </li>
        </ul>
      </AppCard>
      <AppTabs>
        <AppTab header="Post">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-4 md:pb-6">
            {posts.map((post) => (
              <AppCardWithPhoto key={post.id} {...post}></AppCardWithPhoto>
            ))}
          </div>
        </AppTab>
        <AppTab header="Contacts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {contacts.map((contact) => (
              <AppCardWithContact key={contact.id} {...contact} />
            ))}
          </div>
        </AppTab>
      </AppTabs>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <html lang="en" />
    <title>Home Page</title>
    <meta name="author" content="Samson Iyanda"></meta>
    <meta name="description" content="site for gatsby source hubspot plugin documentation"></meta>
    <meta name="keywords" content="gatsby, gatsby plugin, reactjs, hubspot"></meta>
  </>
);

export const query = graphql`
  query IndexPage {
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
  }
`;
