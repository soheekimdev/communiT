import axios from 'axios';

export const fetchEvent = async (id: string) => {
  try {
    const response = await axios.get(
      `https://ozadv6.beavercoding.net/api/challenges/${id}/events`,
      { headers: { Accept: 'application/json' } },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
