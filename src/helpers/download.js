export const downloadURL = (url, fileName = null) => {
  const element = document.createElement("a");
  element.href = url;

  if (fileName) {
    element.setAttribute("download", fileName);
  }

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
