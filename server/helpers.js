module.exports.accumulate = (array) => {
  let acc = 0;
  return array.map((val) => {
    acc += val;
    return acc;
  });
};
