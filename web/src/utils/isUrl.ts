const isUrl = (str: string | undefined) => {
  if (str) {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  }
  return false;
};

export default isUrl;
