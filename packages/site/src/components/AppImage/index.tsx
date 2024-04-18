import React from 'react';
import { GatsbyImage, ImageDataLike, getImage } from 'gatsby-plugin-image';

type Props = { alt: string; className?: string; image?: ImageDataLike | null };

const AppImage = ({ alt, image, className }: Props) => {
  return <GatsbyImage className={className} alt={alt} image={getImage(image)} />;
};

export default AppImage;
