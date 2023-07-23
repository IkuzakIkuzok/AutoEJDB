
//@ts-check

const links = document.querySelectorAll('h3 a');
for (const link of links) {
  const href = link.getAttribute('href');
  const ejdbUrl = `https://kyoto-u.idm.oclc.org/login?auth=ID1&url=${href}`;
  link.setAttribute('href', ejdbUrl);
}
