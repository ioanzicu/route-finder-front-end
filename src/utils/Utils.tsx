export const metersToKm = (meters: string): string => {
  let km = (+meters / 1000).toFixed(2);
  return `${km} kilometers`;
};

export const secondsToMinutes = (seconds: string): string => {
  let minutes = (+seconds / 60).toFixed(2);
  return `${minutes} minutes`;
};
