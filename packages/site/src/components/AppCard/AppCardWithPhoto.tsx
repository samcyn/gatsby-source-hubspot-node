import React from 'react';
import { IGatsbyImageData } from 'gatsby-plugin-image';

import AppCard from '@components/AppCard';
import AppImage from '@components/AppImage';

type Props = {
  readonly author_name: string;
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly post_summary: string;
  readonly featured_image: {
    readonly gatsbyImage: IGatsbyImageData;
  };
};

const AppCardWithPhoto = ({ author_name, title, post_summary, featured_image }: Props) => (
  <AppCard className="overflow-hidden rounded-md">
    <figure className="w-full h-50">
      <AppImage className="w-full h-full" alt="sr" image={featured_image?.gatsbyImage} />
    </figure>
    <div className="p-4 md:p-6">
      <div className="h-13 overflow-hidden mb-2">
        <p className="text-sm md:text-lg font-bold mb-4">{title}</p>
      </div>
      <div className="h-24 overflow-hidden mb-6">
        <p>{post_summary}</p>
      </div>
      <div className="flex items-center gap-2">
        <figure className="w-10 h-10 rounded-full overflow-hidden">
          <AppImage className="w-full h-full" alt="sr" image={featured_image?.gatsbyImage} />
        </figure>
        <div className="flex flex-col justify-between">
          <p>{author_name}</p>
          <small>2h ago</small>
        </div>
      </div>
    </div>
  </AppCard>
);

export default AppCardWithPhoto;
