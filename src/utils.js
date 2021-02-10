const getRandomWorkingTime = () => {
  const MAX_HANDLE_TIME = 1.5;
  const MIN_HANDLE_TIME = 0.5;
  return Math.random() * (MAX_HANDLE_TIME - MIN_HANDLE_TIME) + MIN_HANDLE_TIME;
};
export default getRandomWorkingTime;
