<h1><img src="http://eugeniosegala.it/wp-content/uploads/2019/09/snap-logo.png" width="300" title="Snap This logo"></h1>

Snap This is a tool based on **Puppeteer** and built in Node JS that allows you to make screenshots automatically for different devices and different resolutions in a couple of minutes on Chrome!


- [x] Simulating devices
- [x] Local Storage Support
- [x] Await important elements before screenshots
- [x] Dynamic showcase
- [x] Wait for all network calls ([Pending XHR Puppeteer](https://github.com/jtassin/pending-xhr-puppeteer))
- [ ] Cookies support
- [ ] Customizable devices list

**Demo:**<br>
![Snap This demo](http://eugeniosegala.it/wp-content/uploads/2019/09/snap-this.gif)

<br />

<h2>Usage</h2>

**Install**: <br />
`npm i snap-this`
Edit .env with WEBSITE and SELECTOR.
For our case, SELECTOR would be the id of a Cookie button.  This button should be clicked so that we do not get a cookie banner in the screenshots.

_Commands:_


`node app.js`

_Options:_ <br />
_(Make sure to edit these in the .env file)
- **WEBSITE**=https://en.wikipedia.org/ _(define the app endpoint)_
- **SELECTOR**=".important-element" _(wait for an important item before the snap)_


This package will create a folder at root level of your app with the same name as the website being tested containing a `.png` image for each device. It's also available as an `index.html` file with the entire list.

**To add/remove devices/resolutions being tested, edit the `utils/devices.js` file**

