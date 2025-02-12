import React from 'react';
import { BenchmarkForm } from './components/BenchmarkForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { StatsDisplay } from './components/StatsDisplay';
import { makeRequest, calculateStats } from './utils/benchmark';

function App() {
  const [results, setResults] = React.useState([]);
  const [stats, setStats] = React.useState(null);
  const [isRunning, setIsRunning] = React.useState(false);
  const timeoutRefs = React.useRef([]);

  const handleStop = () => {
    // Clear all scheduled requests
    timeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutRefs.current = [];
    setIsRunning(false);
    
    // Calculate stats for completed requests
    if (results.length > 0) {
      setStats(calculateStats(results));
    }
  };

  const handleStart = async (config) => {
    setIsRunning(true);
    setResults([]);
    setStats(null);
    timeoutRefs.current = [];

    const totalRequests = config.rpm * config.duration;
    const intervalMs = (60 * 1000) / config.rpm;
    let completedRequests = 0;

    const runRequest = async (id) => {
      const result = await makeRequest(id, config.apiUrl);
      console.log('Result for ID:', id, result);

      setResults(prev => {
        const updatedResults = [...prev, result];
        return updatedResults;
      });
      completedRequests++;

      if (completedRequests === totalRequests) {
        setIsRunning(false);
        // Use the callback `prev` or await results to ensure stats are accurate
        setResults(prev => {
          setStats(calculateStats(prev)); // Calculate stats after all updates
          return prev;
        });
      }
    };

    for (let i = 0; i < totalRequests; i++) {
      const timeoutId = setTimeout(() => runRequest(i + 1), i * intervalMs);
      timeoutRefs.current.push(timeoutId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">API Benchmark Tool</h1>
          <p className="mt-2 text-gray-600">
            Test your API performance with customizable request rates and durations
          </p>
        </div>

        <BenchmarkForm 
          onStart={handleStart} 
          onStop={handleStop}
          isRunning={isRunning} 
        />
        
        {results.length > 0 && (
          <ResultsDisplay displayResults={results} />
        )}
        
        {stats && (
          <StatsDisplay stats={stats} />
        )}
      </div>
    </div>
  );
}

export default App;