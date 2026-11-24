(() => {
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const systemTheme = window.matchMedia('(prefers-color-scheme: light)');
  const storageKey = 'rebus-theme';
  let preference = readPreference();
  let button;
  let icon;

  function readPreference() {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved === 'light' || saved === 'dark' ? saved : null;
    } catch {
      return null;
    }
  }

  function applyTheme() {
    const theme = preference ?? (systemTheme.matches ? 'light' : 'dark');
    const isLight = theme === 'light';
    root.dataset.theme = theme;
    themeColor.content = isLight ? '#f5f3ee' : '#05070d';

    if (button) {
      button.setAttribute('aria-checked', String(isLight));
      button.title = isLight ? 'Passa al tema scuro' : 'Passa al tema chiaro';
      icon.textContent = isLight ? '☾' : '☼';
    }
  }

  function addSky() {
    const sky = document.createElement('div');
    sky.className = 'ambient-sky';
    sky.setAttribute('aria-hidden', 'true');

    // Use the same fixed positions and animation phases on every page.
    for (let index = 0; index < 18; index += 1) {
      const star = document.createElement('span');
      star.className = 'sky-star';
      star.style.setProperty('--star-x', `${4 + (index * 47 + 11) % 92}%`);
      star.style.setProperty('--star-y', `${4 + (index * 67 + 7) % 90}%`);
      star.style.setProperty('--star-size', `${2.4 + index % 4 * .8}px`);
      star.style.setProperty('--star-flare', `${.85 + index % 3 * .32}rem`);
      star.style.setProperty('--star-duration', `${4.8 + index % 6 * .9}s`);
      star.style.setProperty('--star-delay', `${-index % 13 * .68}s`);
      if (index % 6 === 0) star.dataset.tone = 'gold';
      else if (index % 4 === 0) star.dataset.tone = 'ice';
      sky.append(star);
    }

    const meteor = document.createElement('span');
    meteor.className = 'sky-meteor';
    sky.append(meteor);
    document.body.prepend(sky);
  }

  applyTheme();

  systemTheme.addEventListener('change', applyTheme);
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) {
      preference = readPreference();
      applyTheme();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    addSky();

    button = document.createElement('button');
    button.className = 'theme-toggle';
    button.type = 'button';
    button.setAttribute('role', 'switch');
    button.setAttribute('aria-label', 'Tema chiaro');
    icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    button.append(icon);
    button.addEventListener('click', () => {
      preference = root.dataset.theme === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(storageKey, preference);
      } catch {
        // The current page can still use the selected theme when storage is disabled.
      }
      applyTheme();
    });

    applyTheme();
    document.querySelector('.nav-inner').append(button);
  });
})();
