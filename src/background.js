
//@ts-check

import { addHost } from "./config-bg.js";

const getEjdbUrl = (originalUrl) => `https://kyoto-u.idm.oclc.org/login?auth=ID1&url=${originalUrl}`;

chrome.action.onClicked.addListener(tab => {
  const originalUrl = tab.url;
  console.log(originalUrl);

  if (!originalUrl) return;

  const host = new URL(originalUrl).hostname;
  if (host.endsWith('kyoto-u.idm.oclc.org')) return;
  addHost(host);

  const ejdbUrl = getEjdbUrl(originalUrl);
  chrome.tabs.update(tab.id ?? -1, { url: ejdbUrl });
});
