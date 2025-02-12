import axios from 'axios';

export async function makeRequest(id, url) {
  const startTime = performance.now();
  try {
    const response = await axios.get(url);
    const endTime = performance.now();
    return {
      id,
      timestamp: new Date(),
      duration: endTime - startTime,
      status: response.status,
      success: true
    };
  } catch (error) {
    const endTime = performance.now();
    return {
      id,
      timestamp: new Date(),
      duration: endTime - startTime,
      status: error.response?.status || 0,
      success: false,
      error: error.message
    };
  }
}

export function calculateStats(results) {
  const completedRequests = results.filter(r => r.success).length;
  const durations = results.map(r => r.duration);
  const expectedRequests = results[0]?.id ? Math.max(...results.map(r => r.id)) : results.length;

  return {
    expectedRequests,
    totalRequests: results.length,
    completedRequests,
    failedRequests: results.length - completedRequests,
    minResponseTime: Math.min(...durations),
    maxResponseTime: Math.max(...durations),
    avgResponseTime: durations.reduce((a, b) => a + b, 0) / durations.length,
    successRate: completedRequests / results.length
  };
}