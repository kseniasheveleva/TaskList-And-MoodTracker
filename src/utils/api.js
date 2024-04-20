export const mapResponseApiData = (data) => {
  return Object.entries(data).map(([key, value]) => ({
    id: key,
    ...value,
  }));
};