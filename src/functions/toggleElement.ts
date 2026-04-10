export const uiElements = {
  footer: "footer",
  header: "header",
  help: "helpSidebar",
  software: "softwareSidebar",
};

export function toggleElement(element: string): string | undefined {
    // shows/ hides a DOM element selected by inputed parameter
  const x = document.getElementById(element);
  if (!x) {
    return undefined;
  }
  if (x.style.display === "none") {
    return (x.style.display = "block");
  }
  return (x.style.display = "none");
}

export function themer(theme: string): void {
    const themeClasses = ["thRed", "thYellow", "thBlue", "thGreen", "thWhite"];
    const game = document.getElementById("root");
    if (!game) {
      return;
    }
    themeClasses.forEach((classname) => {
      game.classList.remove(classname);
    });
    game.classList.add(theme);
    window.localStorage.setItem("theme", theme);
}
