import type { CreateWebpackConfigArgs, CreatePagesArgs } from 'gatsby';
import path from 'path';

exports.onCreateWebpackConfig = ({ actions }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@hooks': path.resolve(__dirname, 'src/hooks/'),
        '@constants': path.resolve(__dirname, 'src/constants/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
      },
    },
  });
};

exports.createPages = async ({ graphql, actions, reporter }: CreatePagesArgs) => {
  const { createPage } = actions;
  const docPageTemplate = path.resolve(`src/templates/docs.tsx`);

  const result = await graphql<Queries.GetAllDocumentsQuery>(`
    query GetAllDocuments {
      allMdx(filter: { frontmatter: { isPublished: { eq: true } } }) {
        nodes {
          id
          frontmatter {
            slug
            title
            tail
            summary
            date(formatString: "MMMM D, YYYY")
          }
          tableOfContents
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors);
  }

  result.data.allMdx.nodes.forEach((record) => {
    createPage({
      // Path for this page — required
      path: `/docs/${record.frontmatter.slug}/`,
      component: `${docPageTemplate}?__contentFilePath=${record.internal.contentFilePath}`,
      context: {
        ...record,
      },
    });
  });
};
