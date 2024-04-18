import React, { useEffect, useState } from 'react';

export type Props = {
  contents: Array<{
    url: string;
    title: string;
    items?: Array<{ url: string; title: string }>;
  }>;
};

const AppTableOfContents = ({ contents }: Props) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let headings: Array<Element> = [];
    let observer: IntersectionObserver = null;

    if (window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          root: null, // observing intersections with the viewport
          rootMargin: '0px',
          threshold: 0.5, // Trigger when at least 50% of the target is visible
        }
      );
      const mdxProviderId = document.getElementById('mdxProviderId');
      headings = Array.from(mdxProviderId.querySelectorAll('h1,h2,h3,h4,h5,h6'));
      headings.forEach((elemRef) => {
        if (elemRef) {
          observer.observe(elemRef);
        }
      });
    }
    return () => {
      headings.forEach((elemRef) => {
        if (elemRef) {
          observer?.unobserve(elemRef);
        }
      });
    };
  }, []);
  return (
    <div className="md:shrink-0 md:order-2 pr-6 sticky top-20 max-h-100 overflow-y-auto">
      <nav className="md:px-8">
        <p className="text-gray-60 dark:text-gray-50 uppercase font-bold text-sm mb-6">Table of content</p>
        <ul className="flex flex-col gap-3">
          {contents.map((content) => (
            <li key={content.url}>
              <a
                className={`block text-sm ${'#' + activeSection === content.url ? 'text-primary underline' : 'text-gray-60'}  dark:text-gray-50 hover:text-primary hover:underline`}
                href={content.url}
              >
                {content.title}
              </a>
              {content.items ? (
                <ul className="flex flex-col gap-3 mt-3 ml-4">
                  {content.items.map((record) => (
                    <li key={record.url}>
                      <a
                        className={`block text-sm ${'#' + activeSection === record.url ? 'text-primary underline' : 'text-gray-60'} dark:text-gray-50 hover:text-primary hover:underline`}
                        href={record.url}
                      >
                        {record.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AppTableOfContents;
