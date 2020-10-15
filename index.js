require('dotenv').config()
const myArgs = process.argv.slice(2)

const url = myArgs[0]
const mainSelector = myArgs[1]
const testResolution = myArgs[2]
const puppeteer = require('puppeteer')
const { PendingXHR } = require('pending-xhr-puppeteer')
const deviceList = require('./utils/devices')

if (testResolution) {
  var devices = deviceList[testResolution]
} else {
  var devices = deviceList
}

const fs = require('fs')
const path = require('path')
const download = require('download-chromium')
const os = require('os')
const { cleanNames, waitForVisible } = require('./utils/helpers')
const { htmlContent } = require('./utils/template')

const folderPath = url.split('//')[1]
const dir = `./snap-this/${folderPath}/`

const tmp = os.tmpdir()

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

const snapThis = async () => {
  const exec = await download({
    revision: 694644,
    installPath: `${tmp}/.local-chromium`
  })
  console.log('Starting...')

  const browser = await puppeteer.launch({
    executablePath: exec,
    headless: true,
    ignoreHTTPSErrors: true
  })

  console.log('Taking screenshots...')

  if (testResolution) {
    var devices = []
    devices.push(deviceList[testResolution])
  } else {
    var devices = deviceList
  }
  for (let i = 0; i < devices.length; i++) {
    process.stdout.write(`${parseInt((i / devices.length) * 100)}%\r`)

    const page = await browser.newPage()

    const pendingXHR = new PendingXHR(page)

    await page.goto(url, { waitUntil: 'networkidle2' })

    await pendingXHR.waitForAllXhrFinished()

    const device = devices[i]

    await page.emulate(device)

    if (mainSelector) {
      await waitForVisible(page, mainSelector)

      try {
        await page.click(mainSelector)
      } catch (e) {
        console.log('err', e)
        await page.screenshot({
          path: `${dir}${cleanNames(device.name)}.png`,
          fullPage: true
        })
      }
    }

    await page.screenshot({
      path: `${dir}${cleanNames(device.name)}.png`,
      fullPage: true
    })
  }

  fs.writeFileSync(`${dir}index.html`, htmlContent, error => {
    console.log(error)
  })

  await browser.close()

  console.log('Completed.')
}

module.exports = snapThis
