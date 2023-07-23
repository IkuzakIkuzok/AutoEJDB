
//@ts-check

const checkAuthFailed = () => {
  const url = window.location.href;
  if (url.startsWith('https://login.kyoto-u.idm.oclc.org/connect?session='))
    return true;

  if (url.startsWith('https://kyoto-u.idm.oclc.org/login?')) {
    return document.title !== 'Shibboleth Authentication Request';
  }

  return false;
};

(() => {
  if (!checkAuthFailed()) return;

  const params = new URLSearchParams(window.location.search);
  const originalUrl = params.get('qurl') ?? params.get('url');
  if (!originalUrl) return;

  const host = new URL(originalUrl).hostname;
  removeHost(host).then(() => window.location.href = originalUrl);
})();
