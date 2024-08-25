import { MEDIA_PREFER_DARK, LIGHT, DARK, THEME_ATTRIBUTE, STORAGE_KEY } from './theme-switcher.js'

function setInitialTheme() {
    const theme =
      localStorage.getItem(STORAGE_KEY) ||
      (
        window.matchMedia(MEDIA_PREFER_DARK).matches
        ? DARK
        : LIGHT
      );
    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
}

setInitialTheme();
