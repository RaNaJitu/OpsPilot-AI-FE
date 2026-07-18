import { useEffect, useState } from "react";

import { getChartTheme } from "../utils/chartTheme";

export function useChartTheme() {
  const [theme, setTheme] = useState(() => getChartTheme());

  useEffect(() => {
    const update = () => setTheme(getChartTheme());
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}
