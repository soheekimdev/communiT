import axios from 'axios';

export const fetchChallengeEvent = async (challengeId: string) => {
  try {
    const response = await axios.get(
      `https://ozadv6.beavercoding.net/api/challenges/${challengeId}/events`,
      { headers: { Accept: 'application/json' } },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
