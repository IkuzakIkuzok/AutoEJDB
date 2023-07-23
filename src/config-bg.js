
//@ts-check

/**
 * Loads the list of hostnames to be automatically redirected.
 * @returns {Promise<string[]>}
 */
const loadHosts = async () => {
  try {
    return await chrome.storage.sync
      .get()
      .then(s => s.hosts.split(';').filter((/** @type {string} */ h) => h.length));
  } catch (_) {
    return [];
  }
};

/**
 * Saves the list of hostnames to be automatically redirected.
 * @param {string[]} hosts
 */
const saveHosts = (hosts) => {
  const s = hosts.join(';');
  chrome.storage.sync.set({ hosts: s });
}

/**
 * Adds a hostname to the redirection list.
 * @param {string} host
 */
export const addHost = (host) => {
  loadHosts().then((hosts) => {
    hosts.push(host);
    saveHosts([...new Set(hosts)]);
  });
};
