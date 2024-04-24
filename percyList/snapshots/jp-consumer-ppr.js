const working_domain = process.env.JP_DOMAIN || 'https://www.invisalignjapan.co.jp'

console.log(`Start working on the domain: ${working_domain}`);

module.exports = [
  {
    name: 'Home Page',
    url: working_domain,
    additionalSnapshots: [{
      suffix: ' - clik burger menu',
      waitForSelector: '.icon-burger',
      execute() {
        document.querySelector('.icon-burger').click()
      }
    }]
  }, {
    name: 'Professional',
    url: `${working_domain}/professional`,
    waitForSelector: '.landing-popup-content',
    waitForTimeout: 2000,
    execute() {
      // document.querySelector('.popup-ctn .popup-btn').click()
      document.querySelector('#landing-popup').style.display = 'none'
      // document.querySelector('.modal-backdrop').classList.remove('show')
    },
    additionalSnapshots: [
      {
        suffix: '- option 1',
        execute() {
          const checkboxes = document.querySelectorAll('.func-option .option-checkbox');
          checkboxes.forEach(box => { box.classList.remove('active'); });

          checkboxes[0].click()
          document.querySelector('#get-product').click()
        }
      }, {
        suffix: '- option 2',
        execute() {
          const checkboxes = document.querySelectorAll('.func-option .option-checkbox');
          checkboxes.forEach(box => { box.classList.remove('active'); });

          checkboxes[1].click()
          document.querySelector('#get-product').click()
        }
      }, {
        suffix: '- option 3',
        execute() {
          const checkboxes = document.querySelectorAll('.func-option .option-checkbox');
          checkboxes.forEach(box => { box.classList.remove('active'); });

          checkboxes[2].click()
          document.querySelector('#get-product').click()
        }
      }, {
        suffix: '- option 1+2',
        execute() {
          const checkboxes = document.querySelectorAll('.func-option .option-checkbox');
          checkboxes.forEach(box => { box.classList.remove('active'); });

          checkboxes[0].click()
          checkboxes[1].click()
          document.querySelector('#get-product').click()
        }
      }, {
        suffix: '- option 2+3',
        execute() {
          const checkboxes = document.querySelectorAll('.func-option .option-checkbox');
          checkboxes.forEach(box => { box.classList.remove('active'); });

          checkboxes[1].click()
          checkboxes[2].click()
          document.querySelector('#get-product').click()
        }
      }, {
        suffix: '- option 1+2+3',
        execute() {
          const checkboxes = document.querySelectorAll('.func-option .option-checkbox');
          checkboxes.forEach(box => { box.classList.remove('active'); });

          checkboxes[0].click()
          checkboxes[1].click()
          checkboxes[2].click()
          document.querySelector('#get-product').click()
        }
      }]
  }, {
    name: 'Company',
    url: `${working_domain}/company`
  }, {
    name: 'News',
    url: `${working_domain}/news`,
    additionalSnapshots: [
      {
        suffix: ' - list 2020',
        execute() {
          const year_buttons = document.querySelectorAll('span.year');
          year_buttons[0].click()
        }
      }, {
        suffix: ' - list 2021',
        execute() {
          const year_buttons = document.querySelectorAll('span.year');
          year_buttons[1].click()
        }
      }, {
        suffix: ' - list 2022',
        execute() {
          const year_buttons = document.querySelectorAll('span.year');
          year_buttons[2].click()
        }
      }, {
        suffix: ' - 1st news of 2022',
        execute() {
          document.querySelectorAll('ul.news-2022 a')[0].click();
        }
      }
    ]
  }]