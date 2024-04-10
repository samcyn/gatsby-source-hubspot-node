import type { CreateWebpackConfigArgs } from 'gatsby';
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
