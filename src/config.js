
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
const addHost = (host) => {
  loadHosts().then((hosts) => {
    hosts.push(host);
    saveHosts([...new Set(hosts)]);
  });
};

/**
 * Removes an item from an array.
 * @param {Array} arr
 * @param {*} item
 * @returns {Array}
 */
const removeItem = (arr, item) => {
  const index = arr.indexOf(item);
  if (index >= 0) {
    arr.splice(index, 1);
  }
  return arr;
};

/**
 * Removes a hostname from the redirection list.
 * @param {string} host
 */
const removeHost = async (host) => {
  loadHosts().then((hosts) => {
    saveHosts(removeItem(hosts, host));
  });
};
