import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

export const StatsDisplay = ({ stats }) => {
  const responseTimeData = [
    { name: 'Min Response Time', value: stats.minResponseTime },
    { name: 'Avg Response Time', value: stats.avgResponseTime },
    { name: 'Max Response Time', value: stats.maxResponseTime }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
      <h2 className="text-xl font-semibold text-gray-900">Benchmark Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Expected Requests</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.expectedRequests}</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Completed Requests</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.completedRequests}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Failed Requests</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.failedRequests}</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Success Rate</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {(stats.successRate * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Min Response Time</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.minResponseTime.toFixed(2)} ms</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Avg Response Time</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.avgResponseTime.toFixed(2)} ms</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Max Response Time</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.maxResponseTime.toFixed(2)} ms</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4f46e5" name="Response Time (ms)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};