const idRegex = () => {
  const idRegexp =
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
  return idRegexp;
};

export { idRegex };
