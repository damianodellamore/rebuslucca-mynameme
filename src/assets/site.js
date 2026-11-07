import {siteConfig} from './site-config.js';
import {countdown, validStoreLink} from './countdown.js';
const clock = document.getElementById('countdown');
if (clock) {
  const target = Date.parse(siteConfig.launchAt);
  const storeUrl = validStoreLink(siteConfig.appStoreUrl);
  const label = document.getElementById('launch-label');
  const note = document.getElementById('launch-note');
  const store = document.getElementById('store-link');
  let timer;
  function update() {
    if (!Number.isFinite(target)) {
      clock.hidden = true;
      note.textContent = 'Segui questa pagina per le informazioni sul lancio.';
      clearInterval(timer);
      return;
    }
    const value = countdown(Date.now(), target);
    for (const field of ['days','hours','minutes','seconds']) document.getElementById(field).textContent = String(value[field]).padStart(2,'0');
    // A date alone never claims Apple has approved or published the app.
    if (storeUrl) {
      clock.hidden = true;
      store.href = storeUrl;
      store.hidden = false;
      label.textContent = 'DISPONIBILE SU APP STORE';
      note.textContent = 'RebusLucca per iPhone e iPad. Scopri i dettagli su App Store.';
    } else if (value.ended) {
      clock.hidden = true;
      label.textContent = 'IN ARRIVO';
      note.textContent = 'Stiamo preparando la pubblicazione su App Store. Il link per scaricare RebusLucca comparirà qui quando sarà disponibile.';
    }
    if (value.ended || storeUrl) clearInterval(timer);
  }
  update();
  if (Date.now() < target && !storeUrl) timer = setInterval(update,1000);
  document.addEventListener('visibilitychange', () => {if (!document.hidden) update();});
}
