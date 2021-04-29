export const clearText = text => {
  return text.replace(/[^a-zA-Z0-9 ]/g, "");
};

export const formatTextPath = text => {
  return text.replace(/[^a-zA-Z0-9_. ]/g, "");
};

export const formatTextConstant = text => {
  return text
    .replace(/[^a-zA-Z0-9_ ]/g, "")
    .replace("__", "_")
    .toUpperCase();
};
