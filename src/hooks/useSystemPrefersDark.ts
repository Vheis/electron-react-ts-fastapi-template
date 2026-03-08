import { useSyncExternalStore } from "react";

import { getSystemPrefersDark, themeMediaQuery } from "@/lib/theme";

const subscribe = (onStoreChange: () => void) => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia(themeMediaQuery);

  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    mediaQuery.removeEventListener("change", onStoreChange);
  };
};

const useSystemPrefersDark = () =>
  useSyncExternalStore(subscribe, getSystemPrefersDark, () => false);

export default useSystemPrefersDark;
