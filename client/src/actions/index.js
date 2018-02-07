import axios from 'axios';

import { getColor, getPhotoUrl } from '../helpers';

export const init = async () => {
  const response = await axios.post('/graphql', {
    query: '{ players { id name } }',
  });

  const { players } = response.data.data;
  return {
    players,
    type: 'SET_PLAYER_LIST',
  };
};

export const addPlayer = async (name, stat) => {
  const response = await axios.post('/graphql', {
    query: `{ player(name:"${name}") { id name photo ${stat} } }`,
  });

  const { player } = response.data.data;
  player.color = getColor();
  player.photoUrl = getPhotoUrl(player.photo);

  return {
    player,
    type: 'ADD_PLAYER',
  };
};

export const setStat = statName => ({
  statName,
  type: 'SET_STAT',
});

export const updatePlayers = async (stat, playerIds) => {
  const response = await axios.post('/graphql', {
    query: `{ players(id: ${JSON.stringify(playerIds)}) { id name ${stat} } }`,
  });

  const { players } = response.data.data;

  return {
    players,
    type: 'UPDATE_PLAYERS',
  };
};

// need to get array of players with certain ids from graphql
// then update players in state
