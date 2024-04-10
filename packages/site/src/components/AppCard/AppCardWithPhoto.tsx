import React from 'react';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

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
  readonly blog_author: {
    readonly avatar: string;
  };
};

const AppCardWithPhoto = ({ author_name, title, featured_image, blog_author }: Props) => (
  <AppCard className="bg-white shadow-md hover:shadow-lg transition overflow-hidden rounded-lg group">
    <Link to="/" className="block w-full no-underline">
      <figure className="w-full h-[165px] overflow-hidden">
        <AppImage
          className="w-full h-full transition-transform group-hover:scale-105"
          alt="sr"
          image={featured_image?.gatsbyImage}
        />
      </figure>
      <div className="py-4 px-6">
        <div className="flex items-center justify-between mb-2">
          <p title={title} className="text-dark text-sm truncate font-semibold w-4/5">
            {title}
          </p>
          <small>5 min</small>
        </div>
        <div className="flex items-center gap-2">
          <figure className="w-10 h-10 rounded-full shadow-lg overflow-hidden">
            <img className="w-full h-full" alt={`${author_name} photo`} src={blog_author?.avatar} />
          </figure>
          <div className="flex flex-col justify-between">
            <p className="text-gray-80 text-sm">{author_name}</p>
            <small>2h ago</small>
          </div>
        </div>
      </div>
    </Link>
  </AppCard>
);

export default AppCardWithPhoto;
