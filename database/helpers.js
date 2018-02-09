module.exports.getTotalPoints = (stats, position) => {
  let minutesPoints = 0;
  if (stats.minutes >= 60) {
    minutesPoints = 2;
  } else if (stats.minutes > 0) {
    minutesPoints = 1;
  }

  let goalMulti = 6;
  let cleanSheetMulti = 4;
  if (position === 'MD') {
    goalMulti = 5;
    cleanSheetMulti = 1;
  } else if (position === 'FW') {
    goalMulti = 4;
    cleanSheetMulti = 0;
  }

  return minutesPoints +
    (goalMulti * stats.goalsScored) +
    (3 * stats.assists) +
    (cleanSheetMulti * stats.cleanSheets) +
    Math.floor(stats.saves / 3) +
    (5 * stats.penaltiesSaved) +
    (-2 * stats.penaltiesMissed) +
    stats.bonus +
    (-1 * stats.yellowCards) +
    (-3 * stats.redCards) +
    (-2 * stats.ownGoals);
};

