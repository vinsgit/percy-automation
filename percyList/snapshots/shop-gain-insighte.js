const working_domain = 'http://localhost:3000/';

console.log(`Start working on the domain: ${working_domain}`);

console.log(`Professional: ${working_domain}/professional`);

module.exports = [
  {
    name: 'Home Page',
    url: working_domain,
    additionalSnapshots: [
      {
        suffix: ' - clik brand',
        waitForSelector: '.navbar-brand',
        execute() {
          document.querySelector('.navbar-brand').click();
        },
      },
    ],
  },
];
