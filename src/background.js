
//@ts-check

import { addHost } from "./config-bg.js";

const getEjdbUrl = (originalUrl) => `https://kyoto-u.idm.oclc.org/login?auth=ID1&url=${originalUrl}`;

chrome.action.onClicked.addListener(tab => {
  const originalUrl = tab.url;
  if (!originalUrl) return;

  const host = new URL(originalUrl).hostname;
  if (host.endsWith('kyoto-u.idm.oclc.org')) return;
  addHost(host);

  const ejdbUrl = getEjdbUrl(originalUrl);
  chrome.tabs.update(tab.id ?? -1, { url: ejdbUrl });
});

const databaseUrl = 'http://kyoto-u.idm.oclc.org/menu';

chrome.alarms.create('check-login', { periodInMinutes: 60 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'check-login') {
    fetch(databaseUrl).then((response) => {
      console.log(`${new Date()}: status: ${response.status}, logged in: ${response.url === databaseUrl}`);
    }).catch((error) => {
      console.error(error);
    });
  }
});
