import React from 'react';

export type Props = {
  contents: Array<{
    url: string;
    title: string;
    items?: Array<{ url: string; title: string }>;
  }>;
};

const AppTableOfContents = ({ contents }: Props) => {
  return (
    <div className="md:shrink-0 md:order-2 sticky top-20 max-h-100 overflow-y-auto">
      <nav className="md:px-8">
        <p className="text-gray-60 uppercase font-bold text-sm mb-6">Table of content</p>
        <ul className="flex flex-col gap-3">
          {contents.map((content) => (
            <li key={content.url}>
              <a className="block text-sm text-gray-60 hover:text-primary hover:underline" href="#">
                {content.title}
              </a>
              {content.items ? (
                <ul className="flex flex-col gap-3 mt-3 ml-4">
                  {content.items.map((record) => (
                    <li key={record.url}>
                      <a className="block text-sm text-gray-60 hover:text-primary hover:underline" href="#">
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
