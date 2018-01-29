/* eslint quote-props: 0 */

const axios = require('axios');
const cheerio = require('cheerio');

const ids = {
  'Manchester City': 43,
  'Manchester United': 1,
  'Chelsea': 8,
  'Liverpool': 14,
  'Tottenham Hotspur': 6,
  'Arsenal': 3,
  'Leicester City': 13,
  'Burnley': 90,
  'Everton': 11,
  'Watford': 57,
  'West Ham United': 21,
  'AFC Bournemouth': 91,
  'Crystal Palace': 31,
  'Huddersfield Town': 38,
  'Newcastle United': 4,
  'Brighton & Hove Albion': 36,
  'Stoke City': 110,
  'Southampton': 20,
  'West Bromwich Albion': 35,
  'Swansea City': 80,
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

  await knex('teams').del();

  return knex('teams').insert(teams);
};
