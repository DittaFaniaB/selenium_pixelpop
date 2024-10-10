const { Builder, By, Key, until } = require("selenium-webdriver");
const element = require('../helpers/element');
const assertion = require('../helpers/assertion');

const firefox = require("selenium-webdriver/firefox");

async function loginPage(email, pswd) {
    options = new firefox.Options();
    //   options.addArguments("--headless");
    options.setPreference("browser.download.folderList", 2); // Custom location
    options.setPreference("browser.download.dir", process.env.PATH_DOWNLOAD);
    options.setPreference(
        "browser.helperApps.neverAsk.saveToDisk",
        "application/octet-stream"
    );

    driver = new Builder()
        .forBrowser("firefox")
        .setFirefoxOptions((options = options))
        .build();
    expect = require("chai").expect;
    vars = {};
    await driver.get(process.env.URL);
    await driver.manage().window().maximize();

    await element.fillFilledXpath(`//input[@type='email']`, email);
    await element.fillFilledXpath(`//input[@type='password']`, pswd);
    await element.clickButtonXpath(`//button[@type='submit']`);
    await driver.sleep(500);
    await element.getElement(`//p[contains(text(),"Great to see you! Let's get started.")]`);
    await assertion.assertionElementExist(`//button[contains(text(), 'Media')]`);
    await assertion.assertionElementExist(`//button[contains(text(), 'Display')]`);

}
async function accessBaseUrl() {
    options = new firefox.Options();
    //   options.addArguments("--headless");
    options.setPreference("browser.download.folderList", 2); // Custom location
    options.setPreference("browser.download.dir", process.env.path_download);
    options.setPreference(
        "browser.helperApps.neverAsk.saveToDisk",
        "application/octet-stream"
    );

    driver = new Builder()
        .forBrowser("firefox")
        .setFirefoxOptions((options = options))
        .build();
    expect = require("chai").expect;
    vars = {};
    await driver.get(process.env.URL);
    await driver.manage().window().maximize();
}

module.exports = {
    loginPage: loginPage,
    accessBaseUrl: accessBaseUrl,
};