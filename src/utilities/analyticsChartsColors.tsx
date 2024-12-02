

export const getGridStrokeColor = (theme:string) => {
  if (theme === "dark") return "#ffffff"; // White for dark theme
  return "#000000"; // Blue for light theme
};

export const getFillColor = (theme:string) => {
  if (theme === "dark") return "#ffffff"; // White for dark theme
  return "#333333"; // Black for light theme
};
