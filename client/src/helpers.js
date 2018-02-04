export const getPhotoUrl = (photo) => {
  const pngString = photo.substring(0, photo.length - 4);
  return `https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/p${pngString}.png`;
};

const colors = ['red', 'blue', 'yellow', 'green', 'deeppink'];
let colorIndex = 0;
export const getColor = () => {
  const color = colors[colorIndex++];
  if (colorIndex >= colors.length) {
    colorIndex = 0;
  }
  return color;
};
