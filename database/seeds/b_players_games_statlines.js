const axios = require('axios');

const positions = [null, 'GK', 'DF', 'MD', 'FW'];

exports.seed = async (knex) => {
  const gameweeks = [];
  for (let i = 1; i <= 38; i++) {
    gameweeks.push({ id: i, isComplete: i < 25 }); // isComplete changes week to week
  }

  await knex('gameweeks').insert(gameweeks);

  const elements = (await axios.get('https://fantasy.premierleague.com/drf/elements/')).data;
  for (let i = 0; i < elements.length; i++) {
    const playerSummary = elements[i];
    const player = (await axios.get(`https://fantasy.premierleague.com/drf/element-summary/${playerSummary.id}`)).data;

    const position = positions[playerSummary.element_type];

    await knex('players').insert({
      position,
      id: playerSummary.id,
      name: playerSummary.web_name,
      teamId: playerSummary.team,
      photo: playerSummary.photo,
    });

    const statlines = [];
    for (let fixture of player.history) {
      let game = { id: fixture.id };

      try {
        await knex.transaction(async (trx) => {
          const res = (await trx('games').where({ id: game.id }))[0];

          if (res) {
            game = res;
          } else {
            game.gameweekId = fixture.round;
            // console.log('gameweek id:', game.gameweekId);
            if (fixture.was_home) {
              game.homeTeamId = player.team;
              game.awayTeamId = fixture.opponent_team;
            } else {
              game.awayTeamId = player.team;
              game.homeTeamId = fixture.opponent_team;
            }

            await trx('games').insert(game);
          }
        });
      } catch (e) {
        console.log('away team:', game.awayTeamId);
        console.log('home team:', game.homeTeamId);
        throw e;
      }

      statlines.push({
        id: fixture.id,
        playerId: playerSummary.id,
        gameId: game.id,
        minutes: fixture.minutes,
        goalsScored: fixture.goals_scored,
        assists: fixture.assists,
        cleanSheets: fixture.clean_sheets,
        goalsConceded: fixture.goals_conceded,
        ownGoals: fixture.own_goals,
        penaltiesSaved: fixture.penalties_saved,
        penaltiesMissed: fixture.penalties_missed,
        yellowCards: fixture.yellow_cards,
        redCards: fixture.red_cards,
        saves: fixture.saves,
        bonus: fixture.bonus,
        value: fixture.value,
      });
    }

    await knex('statlines').insert(statlines);

    await Promise.all(player.fixtures.map(fixture => (
      knex.transaction(async (trx) => {
        const game = { id: fixture.id };
        const res = (await trx('games').where({ id: game.id }))[0];

        if (!res) {
          game.gameweekId = fixture.event;

          game.homeTeamId = fixture.team_h;
          game.awayTeamId = fixture.team_a;

          await trx('games').insert(game);
        }
      })
    )));

    // wait 1s afer every 10 requests
    if (i % 10 === 0) {
      console.log(`inserted ${i} rows`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};
