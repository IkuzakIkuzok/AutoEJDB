
//@ts-check

const getHostsRoot = () => document.getElementById('hostnames') ?? document.createElement('div');

const addHosts = () => {
  const root = getHostsRoot();
  root.innerHTML = '';
  loadHosts().then((hosts) => {
    for (const host of hosts) {
      addHostElem(root, host);
    }
  })
};

/**
 *
 * @param {HTMLElement} root
 * @param {string} host
 */
const addHostElem = (root, host) => {
  const elem = document.createElement('div');
  elem.className = 'host';
  root.append(elem);

  const b_remove = document.createElement('button');
  b_remove.addEventListener('click', createRemoveCallback(host));
  b_remove.textContent = '×';
  elem.append(b_remove);

  const s_host = document.createElement('span');
  s_host.textContent = host;
  elem.append(s_host);
};

/**
 *
 * @param {string} host
 * @returns
 */
const createRemoveCallback = (host) => () => removeHostElem(host);

/**
 *
 * @param {string} host
 */
const removeHostElem = (host) => {
  removeHost(host);
};

addHosts();
chrome.storage.sync.onChanged.addListener(addHosts);
