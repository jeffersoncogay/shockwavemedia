export const getAppointColor = (title: string = "", prefix: string = "bg") => {
  title = title.toLowerCase();
  if (title.includes("vaccin")) {
    return prefix === "bg"
      ? "bg-corange-light"
      : prefix === "border"
      ? "border-corange-light"
      : prefix === "stroke"
      ? "stroke-corange-light"
      : "";
  }

  if (title.includes("meet")) {
    return prefix === "bg"
      ? "bg-cpurple"
      : prefix === "border"
      ? "border-cpurple"
      : prefix === "stroke"
      ? "stroke-cpurple"
      : "";
  }

  if (title.includes("check")) {
    return prefix === "bg"
      ? "bg-blue-400"
      : prefix === "border"
      ? "border-blue-400"
      : prefix === "stroke"
      ? "stroke-blue-400"
      : "";
  }

  return prefix === "bg"
    ? "bg-green-400"
    : prefix === "border"
    ? "border-green-400"
    : prefix === "stroke"
    ? "stroke-green-400"
    : "";
};
