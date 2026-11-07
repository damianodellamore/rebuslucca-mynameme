export function countdown(now, target) {
  const total = Math.max(0, Math.ceil((target - now) / 1000));
  return {
    ended: now >= target,
    days: Math.floor(total / 86400),
    hours: Math.floor(total / 3600) % 24,
    minutes: Math.floor(total / 60) % 60,
    seconds: total % 60,
  };
}
export function validStoreLink(value) {
  if (typeof value !== 'string' || !value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'apps.apple.com' && /\/id\d+(?:$|[/?])/.test(url.pathname) ? url.href : null;
  } catch { return null; }
}
