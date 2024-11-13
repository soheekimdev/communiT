import axios from 'axios';

export const updateNickname = async (id: string, username: string, token: string) => {
  try {
    const response = await axios.patch(
      `https://ozadv6.beavercoding.net/api/accounts/${id}`,
      {
        username: username,
      },
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const updateProfileImg = async (id: string, profileImageUrl: string, token: string) => {
  try {
    const response = await axios.patch(
      `https://ozadv6.beavercoding.net/api/accounts/${id}`,
      {
        profileImageUrl: profileImageUrl,
      },
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const updateBio = async (id: string, bio: string, token: string) => {
  try {
    const response = await axios.patch(
      `https://ozadv6.beavercoding.net/api/accounts/${id}`,
      {
        bio: bio,
      },
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
