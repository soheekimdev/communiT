import axios from 'axios';

export const fetchProfileImageURL = async (accountId: string) => {
  try {
    const response = await axios.get(`https://ozadv6.beavercoding.net/api/accounts/${accountId}`, {
      headers: { Accept: 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching author data:', error);
    throw error;
  }
};
