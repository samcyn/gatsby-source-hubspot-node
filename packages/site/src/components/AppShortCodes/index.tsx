import React, { ReactElement } from 'react';
import { Link } from 'gatsby';

function splitLanguageAndTitle(children: React.ReactNode) {
  const computedClassName = (children as ReactElement).props.className as string;

  const parts = computedClassName.split(':');
  const language = parts[0];
  const title = parts.length > 1 ? parts[1].split('=')[1] : undefined;

  return { language, title };
}

const MyH1 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h1 className="text-dark dark:text-white font-bold text-xs md:text-sm lg:text-3xl mt-12 mb-6" {...props} />
);
const MyH2 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h1 className="text-dark dark:text-white font-bold text-xs md:text-sm lg:text-2xl mt-12 mb-6" {...props} />
);
const MyH3 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h1 className="text-dark dark:text-white font-bold text-xs md:text-sm lg:text-xl mt-12 mb-6" {...props} />
);
const MyH4 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h1 className="text-dark dark:text-white font-bold text-xs md:text-sm lg:text-lg mt-12 mb-6" {...props} />
);
const MyH5 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h1 className="text-dark dark:text-white font-bold text-xs md:text-sm lg:text-sm mt-12 mb-6" {...props} />
);
const MyH6 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h1 className="text-dark dark:text-white font-bold text-xs md:text-sm lg:text-xs mt-12 mb-6" {...props} />
);
const MyUL = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
  <ul
    className="ml-6 mb-6 list-disc list-image-none list-outside text-gray-80 dark:text-white text-sm break-words"
    {...props}
  />
);

const MyAnchor = (props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
  <a className="" {...props} />
);
const MyParagraph = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
) => <p className="text-gray-80 dark:text-white text-sm mb-6" {...props} />;

const Announcement = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-l-2 border-primary pl-4 py-0.5 mb-6">{children}</div>;
};

const MyPre = ({
  className,
  children,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
  const { language, title } = splitLanguageAndTitle(children);
  return (
    <>
      {title && (
        <div className="rounded-t-lg pt-5 pb-4 px-6 text-xs bg-orange-50 border-b border-orange-30 text-orange-40">
          <div>{title}</div>
        </div>
      )}
      <div
        className={`gatsby-highlight bg-orange-50 ml-0 mr-0 relative text-gray-80 ${title ? 'rounded-b-lg' : 'rounded-lg'}`}
      >
        <pre
          {...rest}
          className={`
          ${language || ''}
          bg-transparent border-0 py-6 
          mb-6 ml-0 mt-0 mr-0 p-0 
          text-[13.5px] leading-5 rounded overflow-auto 
          break-normal ${className || ''}
        `}
        >
          <button
            name="copy code to clipboard"
            className="
            bg-transparent border-none 
            text-gray-60 cursor-pointer p-2 
            text-xs leading-3 transition-colors 
            absolute top-1 right-1 rounded
            hover:bg-primary hover:text-white"
          >
            Copy
            <span aria-roledescription="status" className="sr-only">
              copy code to clipboard
            </span>
          </button>
          {children}
        </pre>
      </div>
    </>
  );
};

const MyCode = ({ className, ...rest }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => (
  <code {...rest} className={`${className || ''}`} />
);

export const shortcodes = {
  Link,
  Announcement,
  h1: MyH1,
  h2: MyH2,
  h3: MyH3,
  h4: MyH4,
  h5: MyH5,
  h6: MyH6,
  ul: MyUL,
  p: MyParagraph,
  a: MyAnchor,
  pre: MyPre,
  code: MyCode,
};
