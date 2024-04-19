import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Link } from 'gatsby';

function splitLanguageAndTitle(children: React.ReactNode) {
  const computedClassName = (children as ReactElement).props.className as string;

  const parts = computedClassName.split(':');
  const language = parts[0];
  const title = parts.length > 1 ? parts[1].split('=')[1] : undefined;

  return { language, title };
}

function breakStringIntoId(children: React.ReactNode): string {
  const str = children as string;
  const sanitizedInput = str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]+/g, '');

  return `${sanitizedInput}`;
}

const HeadingComponent = ({
  Component = 'h1',
  className,
  children,
  ...rest
}: {
  Component: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
  const id = breakStringIntoId(children);
  const ComponentType = Component as unknown as React.JSXElementConstructor<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
  >;
  const MetaHeading = () => (
    <ComponentType {...rest} className={className} id={id}>
      <a
        href={`#${id}`}
        aria-label={`${children} permalink`}
        className="
          fill-primary text-inherit 
          no-underline border-b-0 absolute 
          top-0 left-0 -translate-x-full 
          pr-1 cursor-pointer 
          transition-colors
          h-full flex items-center group
        "
      >
        <svg
          className="invisible group-hover:visible"
          aria-hidden="true"
          focusable="false"
          height="16"
          version="1.1"
          viewBox="0 0 16 16"
          width="16"
        >
          <path
            fillRule="evenodd"
            d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
          ></path>
        </svg>
      </a>
      {children}
    </ComponentType>
  );
  return MetaHeading;
};

const MyH1 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
  const H1 = HeadingComponent({
    ...props,
    className: 'relative text-dark dark:text-white font-bold text-xs md:text-sm lg:text-3xl mt-6 lg:mt-12 mb-6',
    Component: 'h1',
  });
  return <H1 />;
};

const MyH2 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
  const H2 = HeadingComponent({
    ...props,
    className: 'relative text-dark dark:text-white font-bold text-xs md:text-sm lg:text-2xl mt-6 lg:mt-12 mb-6',
    Component: 'h2',
  });
  return <H2 />;
};

const MyH3 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
  const H3 = HeadingComponent({
    ...props,
    className: 'relative text-dark dark:text-white font-bold text-xs md:text-sm lg:text-xl mt-6 lg:mt-12 mb-6',
    Component: 'h3',
  });
  return <H3 />;
};

const MyH4 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
  const H4 = HeadingComponent({
    ...props,
    className: 'relative text-dark dark:text-white font-bold text-xs md:text-sm lg:text-lg mt-6 lg:mt-12 mb-6',
    Component: 'h4',
  });
  return <H4 />;
};

const MyH5 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
  const H5 = HeadingComponent({
    ...props,
    className: 'relative text-dark dark:text-white font-bold text-xs md:text-sm lg:text-sm mt-6 lg:mt-12 mb-6',
    Component: 'h5',
  });
  return <H5 />;
};

const MyH6 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
  const H6 = HeadingComponent({
    ...props,
    className: 'relative text-dark dark:text-white font-bold text-xs md:text-sm lg:text-xs mt-6 lg:mt-12 mb-6',
    Component: 'h6',
  });
  return <H6 />;
};

const MyUL = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
  <ul
    className="ml-6 mb-6 list-disc list-image-none list-outside text-gray-80 dark:text-white text-sm break-words"
    {...props}
  />
);

const MyAnchor = (props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
  <a className="text-primary no-underline transition-colors border-b border-b-purple-20" {...props} />
);
const MyParagraph = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
) => <p className="text-gray-80 dark:text-white text-sm mb-6" {...props} />;

const Announcement = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-l-2 border-primary pl-4 py-0.5 mb-6 announcement">{children}</div>;
};

const MyPre = ({
  className,
  children,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement | null>(null);
  const { language, title } = splitLanguageAndTitle(children);

  useEffect(() => {
    // prevent memory leakage
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    const preElem = preRef.current;
    if (window && preElem) {
      const code = preElem.getElementsByTagName('code')[0];
      try {
        await navigator.clipboard.writeText(code.innerText);
        setIsCopied(true);
      } catch (err) {
        console.error('Failed to copy:', err);
        setIsCopied(false);
      }

      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };
  return (
    <>
      {title && (
        <div className="rounded-t-lg pt-5 pb-4 px-6 text-xs bg-orange-50 dark:bg-black-code border-b border-orange-30 text-orange-40 dark:text-gray-50">
          <div>{title}</div>
        </div>
      )}
      <div
        className={`gatsby-highlight bg-orange-50 dark:bg-black-code ml-0 mr-0 relative text-gray-80 dark:text-gray-50 ${title ? 'rounded-b-lg' : 'rounded-lg'}`}
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
          ref={preRef}
        >
          <button
            name="copy code to clipboard"
            className="
            bg-transparent border-none 
            text-gray-60 cursor-pointer p-2 
            text-xs leading-3 transition-colors 
            absolute top-1 right-1 rounded
            hover:bg-primary hover:text-white"
            disabled={isCopied}
            onClick={handleCopy}
          >
            {isCopied ? 'Copied' : 'Copy'}
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
