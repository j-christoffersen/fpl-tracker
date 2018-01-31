/* eslint quote-props: 0 */

const axios = require('axios');
const cheerio = require('cheerio');

const ids = {
  'Manchester City': 11,
  'Manchester United': 12,
  'Chelsea': 5,
  'Liverpool': 10,
  'Tottenham Hotspur': 17,
  'Arsenal': 1,
  'Leicester City': 9,
  'Burnley': 4,
  'Everton': 7,
  'Watford': 18,
  'West Ham United': 20,
  'AFC Bournemouth': 2,
  'Crystal Palace': 6,
  'Huddersfield Town': 8,
  'Newcastle United': 13,
  'Brighton & Hove Albion': 3,
  'Stoke City': 15,
  'Southampton': 14,
  'West Bromwich Albion': 19,
  'Swansea City': 16,
};

const abbreviations = {
  'Manchester City': 'MCI',
  'Manchester United': 'MUN',
  'Chelsea': 'CHE',
  'Liverpool': 'LIV',
  'Tottenham Hotspur': 'TOT',
  'Arsenal': 'ARS',
  'Leicester City': 'LEI',
  'Burnley': 'BUR',
  'Everton': 'EVE',
  'Watford': 'WAT',
  'West Ham United': 'WHU',
  'AFC Bournemouth': 'BOU',
  'Crystal Palace': 'CRY',
  'Huddersfield Town': 'HUD',
  'Newcastle United': 'NEW',
  'Brighton & Hove Albion': 'BHA',
  'Stoke City': 'STK',
  'Southampton': 'SOU',
  'West Bromwich Albion': 'WBA',
  'Swansea City': 'SWA',
};

exports.seed = async (knex) => {
  const teams = [];
  const res = await axios.get('http://www.espn.com/soccer/standings/_/league/eng.1');

  const $ = cheerio.load(res.data);
  $('tbody tr').each((i, r) => {
    const row = $(r);
    const teamName = row.find('span.team-names').text();
    const children = row.children();
    teams.push({
      id: ids[teamName],
      name: teamName,
      abbreviation: abbreviations[teamName],
      goalsFor: Number(children.slice(5, 6).text()),
      goalsAgainst: Number(children.slice(6, 7).text()),
      rank: i + 1,
    });
  });

  await knex('statlines').del();
  await knex('games').del();
  await knex('players').del();
  await knex('gameweeks').del();
  await knex('teams').del();

  return knex('teams').insert(teams);
};
