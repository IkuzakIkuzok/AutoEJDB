
//@ts-check

const REQUEST_KEY = 'auto-ejdb-auth-request-flag';

/**
 * Updates query parameters.
 * @param {string} url
 * @param {string} key
 * @param {string|null} value
 */
const updateQuery = (url, key, value) => {
  const params = new URLSearchParams(new URL(url).search);
  if (value !== null) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  return `${url.split('?')[0]}?${params.toString()}`;
};

(() => {
  const url = window.location.href;
  const currentHost = new URL(url).hostname;

  if (url.includes(REQUEST_KEY)) {
    removeHost(currentHost);
    history.pushState(null, '', updateQuery(url, REQUEST_KEY, null));
  }

  loadHosts().then((hosts) => {
    if (hosts.includes(currentHost)) {
      window.location.href = `https://kyoto-u.idm.oclc.org/login?auth=ID1&url=${updateQuery(url, REQUEST_KEY, '1')}`;
    }
  });
})();
