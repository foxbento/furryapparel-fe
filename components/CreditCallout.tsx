import React from 'react';
import { Info } from 'lucide-react';

export function CreditCallout() {
  return (
    <div className="bg-slate-700 border-l-4 border-blue-500 text-slate-200 p-4 rounded-r-lg mb-6">
      <div className="flex items-center">
        <Info className="h-6 w-6 text-blue-500 mr-2" />
        <p className="font-semibold">The data source for the site is maintained by these cool furs! </p>
      </div>
      <p className="font-semibold ml-9">  Please follow their pages and check them out! </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {['@ATunaCan_', '@RileyThaProot', '@phodostheproto'].map((creator) => (
          <a
            key={creator}
            href={`https://twitter.com/${creator.slice(1)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-slate-600 hover:bg-slate-500 text-blue-300 hover:text-blue-200 rounded-full px-3 py-1 text-sm font-semibold transition-colors duration-200"
          >
            {creator}
          </a>
        ))}
      </div>
    </div>
  );
}