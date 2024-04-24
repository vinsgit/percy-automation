const working_domain = process.env.AU_DOMAIN || 'https://www.invisalign.com.au'

console.log(`Start working on the domain: ${working_domain}`);

module.exports = [
{
    name:'home page',
    url:`${working_domain}?allowDomainAccess=1`,
    additionalSnapshots:[{
        suffix: ' - click tab menu',
      waitForSelector: '.header-menu',
      execute() {
        document.querySelector('.show.dropdown.nav-item').click()
      }
    }]
},{
    name: 'vivera-retainers',
    url: `${working_domain}/vivera-retainers?allowDomainAccess=1`,
    waitForSelector: '.container-fluid',
    waitForTimeout: 2000,
    execute() {
         document.querySelector('.container-fluid .btn-blue');
      }
    //  additionalSnapshots: [
    //     {
    //         suffix: '- am i a candidate',
    //     execute() {
    //         document.querySelector('.btn-transparent').click()
    //     }
    //     },{
    //         suffix: '- learn more',
    //     execute() {
    //         document.querySelectorAll('.container-fluid .btn-blue');
    //         checkboxes[0].click()
    //         document.querySelector('.btn-blue').click()
    //     }
    //     },{
    //         suffix: '- take quiz',
    //         execute() {
    //             document.querySelectorAll('.container-fluid .btn-blue');
    //             checkboxes[1].click()
    //             document.querySelector('.btn-blue').click()
    //         }
    //     },{
    //         suffix: '- see FAQs',
    //     execute() {
    //         document.querySelectorAll('.container-fluid .btn-blue');
    //         checkboxes[2].click()
    //         document.querySelector('.btn-blue').click()
    //     }
    //     },{
    //         suffix: '- shop accessories',
    //     execute() {
    //         document.querySelector('.get-start .btn-transparent').click()
    //     }
    //     }
    //     ]
},
{
    name: 'cost',
    url: `${working_domain}/invisalign-cost?allowDomainAccess=1`,
    waitForSelector: '.container-fluid',
    waitForTimeout: 2000,
    execute() {
        document.querySelector('.text-side .get-start').click()
     }
    //  additionalSnapshots: [
    //     {
    //         suffix: '- free assessment',
    //     execute() {
    //         document.querySelector('.text-side .get-start').click()
    //     }
    //     },
    //  ]
}



]