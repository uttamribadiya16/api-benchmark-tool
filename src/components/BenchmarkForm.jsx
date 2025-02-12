import React from 'react';

export const BenchmarkForm = ({ onStart, onStop, isRunning }) => {
  const [apiUrl, setApiUrl] = React.useState('');
  const [rpm, setRpm] = React.useState(60);
  const [duration, setDuration] = React.useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({ apiUrl, rpm, duration });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="apiUrl" className="block text-sm font-medium text-gray-700 mb-2">
          API URL
        </label>
        <input
          type="url"
          id="apiUrl"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
          placeholder="https://api.example.com/endpoint"
        />
      </div>

      <div>
        <label htmlFor="rpm" className="block text-sm font-medium text-gray-700 mb-2">
          Requests per Minute (RPM)
        </label>
        <input
          type="number"
          id="rpm"
          value={rpm}
          onChange={(e) => setRpm(Number(e.target.value))}
          min="1"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
        />
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
          Duration (minutes)
        </label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          min="1"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isRunning}
          className={`flex-1 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isRunning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        >
          {isRunning ? 'Benchmark Running...' : 'Start Benchmark'}
        </button>

        {isRunning && (
          <button
            type="button"
            onClick={onStop}
            className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Stop Benchmark
          </button>
        )}
      </div>
    </form>
  );
};