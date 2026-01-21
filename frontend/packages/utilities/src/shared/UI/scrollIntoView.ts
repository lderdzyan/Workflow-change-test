type ScrollIntoView = (elementId: string) => void;
export const scrollIntoView: ScrollIntoView = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ block: "start", behavior: "smooth" });
  }
};

type ScrollTo = (elementId: string, offset: number) => void;
export const scrollTo: ScrollTo = (elementId, offset) => {
  const element = document.getElementById(elementId);
  if (element) {
    const rect = element.getBoundingClientRect();
    window.parent.scrollTo({ top: window.scrollY + rect.top + offset, behavior: "smooth" });
  }
};

