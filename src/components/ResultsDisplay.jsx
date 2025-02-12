import React from 'react';
import { format } from 'date-fns';

export const ResultsDisplay = ({ displayResults }) => {
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayResults]);

  return (
    <div
      ref={scrollRef}
      className="bg-gray-900 text-gray-100 p-4 rounded-lg shadow-md h-96 overflow-y-auto font-mono text-sm"
    >
      {displayResults.map((result) => (
        <div
          key={result.id}
          className={`mb-1 ${
            result.success ? 'text-green-400' : 'text-red-400'
          }`}
        >
          [{format(result.timestamp, 'HH:mm:ss.SSS')}] Request #{result.id} - 
          Status: {result.status} - 
          Duration: {result.duration.toFixed(2)}ms
          {result.error && ` - Error: ${result.error}`}
        </div>
      ))}
    </div>
  );
};