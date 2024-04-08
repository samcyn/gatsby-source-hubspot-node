import * as React from 'react';
import { graphql } from 'gatsby';
import type { HeadFC, PageProps } from 'gatsby';

import AppAside from '@components/AppAside';
import AppHeader from '@components/AppHeader';
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
  const [open, setOpen] = React.useState(false);

  const onOpen = () => {
    setOpen((p) => !p);
  };
  return (
    <main className="bg-complimentary min-h-screen overflow-hidden">
      <AppAside />
      <section
        className={`
        w-full min-h-screen bg-complimentary 
        relative z-10 md:z-0 md:pl-60 transition
        ${open ? 'translate-x-60 md:translate-x-0' : 'translate-x-0'}
      `}
      >
        {/* overlay */}
        {open && <div onClick={onOpen} className="fixed md:hidden inset-0 bg-white/25"></div>}
        <section className="px-4 md:px-25">
          <AppHeader onOpen={onOpen} />
          <div className="mt-10">
            <p className="text-2xl md:text-4xl font-bold text-primary dark:text-primary">
              <a href={repo.html_url} target="_blank">
                Gatsby Source Hubspot Node Plugin v1.0.1
              </a>
            </p>
            <p>{repo.description}</p>
          </div>

          <AppCard className="p-4 mt-10 mb-10">
            <ul className="flex items-center justify-around flex-wrap bg-brand-dgray rounded-md px-6 py-4 gap-4 md:gap-0">
              <li className="flex justify-center md:justify-normal basis-full md:basis-auto">
                <div>
                  <p className="font-bold text-lg text-primary">1.0.1</p>
                  <p className="font-medium text-xs text-primary/75">Version</p>
                </div>
              </li>
              <li className="flex justify-center md:justify-normal basis-full md:basis-auto">
                <div>
                  <p className="font-bold text-lg text-primary">{repo.license.name}</p>
                  <p className="font-medium text-xs text-primary/75">License</p>
                </div>
              </li>
              <li className="flex justify-center md:justify-normal basis-full md:basis-auto">
                <div>
                  <p className="font-bold text-lg text-primary">{repo.stargazers_count}</p>
                  <p className="font-medium text-xs text-primary/75">Stars 🌟</p>
                </div>
              </li>
              <li className="flex justify-center md:justify-normal basis-full md:basis-auto">
                <div>
                  <p className="font-bold text-lg text-primary">{repo.open_issues}</p>
                  <p className="font-medium text-xs text-primary/75">Open Issues</p>
                </div>
              </li>
              <li className="flex justify-center md:justify-normal basis-full md:basis-auto">
                <div>
                  <p className="font-bold text-lg text-primary">{repo.forks_count}</p>
                  <p className="font-medium text-xs text-primary/75">Forks</p>
                </div>
              </li>
            </ul>
            <div></div>
          </AppCard>
          <AppTabs>
            <AppTab header="Post">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {posts.map((post) => (
                  <AppCardWithPhoto key={post.id} {...post}></AppCardWithPhoto>
                ))}
              </div>
            </AppTab>
            <AppTab header="Contacts">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {contacts.map((contact) => (
                  <AppCardWithContact key={contact.id} {...contact} />
                ))}
              </div>
            </AppTab>
          </AppTabs>
        </section>
      </section>
    </main>
  );
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
