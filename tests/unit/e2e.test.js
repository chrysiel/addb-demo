/* eslint-disable no-undef */
const timeout = process.env.SLOWMO ? 30000 : 10000
const devices = require('puppeteer/DeviceDescriptors')

beforeAll(async () => {
  await page.goto(URL, {
    waitUntil: 'domcontentloaded'
  })
})

describe('Test header and title of the page', () => {
  test(
    'Title of the page',
    async () => {
      const title = await page.title()
      expect(title).toBe('E2E Puppeteer Testing')
    },
    timeout
  )

  test(
    'Header of the page',
    async () => {
      const h1Handle = await page.$('.learn_header')
      const html = await page.evaluate(
        (h1Handle) => h1Handle.innerHTML,
        h1Handle
      )

      expect(html).toBe('What will you learn')
    },
    timeout
  )

  test(
    'Submit form with valid data',
    async () => {
      await page.click('[href="/login"]')

      await page.waitForSelector('form')
      await page.type('#name', 'Rick')

      await page.type('#password', 'szechuanSauce')
      await page.type('#repeat_password', 'szechuanSauce')

      await page.click('[type="submit"]')
      await page.waitForSelector('.success')
      const html = await page.$eval('.success', (el) => el.innerHTML)

      expect(html).toBe('Successfully signed up!')
    },
    timeout
  )

  test(
    'Take screenshot of home page',
    async () => {
      await page.setViewport({
        width: 1920,
        height: 1080
      })
      await page.screenshot({
        path: './src/test/screenshots/home.jpg',
        fullpage: true,
        type: 'jpeg'
      })
    },
    timeout
  )

  test(
    'Emulate Mobile Device And take screenshot',
    async () => {
      await page.goto(`${URL}/login`, {
        waitUntil: 'domcontentloaded'
      })
      const iPhonex = devices['iPhone X']
      await page.emulate(iPhonex)
      await page.setViewport({
        width: 375,
        height: 812,
        isMobile: true
      })
      await page.screenshot({
        path: './src/test/screenshots/home-mobile.jpg',
        fullpage: true,
        type: 'jpeg'
      })
    },
    timeout
  )

  test(
    'Intercept Request',
    async () => {
      await page.setRequestInterception(true)
      page.on('request', (interceptedRequest) => {
        if (interceptedRequest.url().endsWith('.png')) {
          interceptedRequest.abort()
        } else {
          interceptedRequest.continue()
        }
      })
      await page.reload({
        waitUntil: 'networkidle0'
      })
      // await jestPuppeteer.debug();
      await page.setRequestInterception(false)
    },
    timeout
  )

  test(
    'Target newly opened page',
    async () => {
      const newPagePromise = new Promise((resolve) =>
        browser.once('targetcreated', (target) => resolve(target.page()))
      )
      await page.click('.repo_link')

      const newPage = await newPagePromise
      const title = await newPage.title()
      await newPage.close()

      expect(title).toBe('GitHub - Zovi343/E2E_Testing_with_Puppeteer_Final')
    },
    timeout
  )
})
