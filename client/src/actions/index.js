import axios from 'axios';

import { getColor, getPhotoUrl } from '../helpers';

export const addPlayer = async (id) => {
  const response = await axios.post('/graphql', {
    query: `{ player(id:${id}) { id name photo } }`,
  });

  const { player } = response.data.data;
  player.color = getColor();
  player.photoUrl = getPhotoUrl(player.photo);

  return {
    player,
    type: 'ADD_PLAYER',
  };
};
