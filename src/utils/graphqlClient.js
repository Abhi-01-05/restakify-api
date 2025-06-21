import axios from 'axios';

export async function fetchFromSubgraph(url, query) {
  try {
    const response = await axios.post(url, { query });
    return response.data.data;
  } catch (error) {
    console.error('GraphQL Error:', error.message);
    return null;
  }
}