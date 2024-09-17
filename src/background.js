
//@ts-check

import { addHost } from "./config-bg.js";

const getEjdbUrl = (/** @type {string} */ originalUrl) => `https://kyoto-u.idm.oclc.org/login?auth=ID1&url=${originalUrl}`;

const clickBlackList = [
  'kyoto-u.idm.oclc.org',
  'authidp1.iimc.kyoto-u.ac.jp',
];

chrome.action.onClicked.addListener(tab => {
  const originalUrl = tab.url;
  if (!originalUrl) return;

  const url = new URL(originalUrl);
  if (url.protocol !== 'https:') return;
  const host = url.hostname;
  for (const blackHost of clickBlackList) {
    if (host.includes(blackHost)) return;
  }
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
      console.log(error);
    });
  }
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: 'src/html/about-auto-ejdb.html' });
  }
});
