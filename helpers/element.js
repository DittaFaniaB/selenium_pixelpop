const { By, until, Key } = require("selenium-webdriver");


async function getElement(selector) {
    let element = await driver.wait(until.elementLocated(By.xpath(selector)), 10000);
    // await driver.wait(until.elementIsVisible(element), 10000)
}

async function clickButtonXpath(selector) {
    let element = await driver.wait(until.elementLocated(By.xpath(selector)), 10000);
    // await driver.wait(until.elementIsVisible(element), 10000);
    await element.click();
}

async function clickButtonCss(selector) {
    let element = await driver.wait(until.elementLocated(By.css(selector)), 10000);
    await driver.wait(until.elementIsVisible(element), 10000)
    await element.click()
}

async function fillFilledXpath(selector, value, enter = false) {

    let ele = await driver.wait(until.elementLocated(By.xpath(selector)), 10000);
    // await driver.wait(until.elementIsVisible(ele), 10000)
    await ele.clear();
    await ele.sendKeys(value);
    if (enter == true) {
        await driver.sleep(500);
        await ele.sendKeys(Key.ENTER);
    }
}

async function fillSelectXpath(selector) {
    let element = await driver.wait(until.elementLocated(By.xpath(selector)), 10000);
    await driver.wait(until.elementIsVisible(element), 10000)
    await element.click();
}

async function scrollByXpath(selector) {
    const scrollTo = await driver.wait(until.elementLocated(By.xpath(selector)), 10000);
    await driver.wait(until.elementIsVisible(scrollTo), 10000)
    await driver.executeScript(
        "arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });",
        scrollTo
    );
}

async function clearInputXpath(selector, enter = false) {
    const ele = driver.wait(until.elementLocated(By.xpath(selector)), 10000);
    await ele.clear();
    if (enter == true) {
        await ele.sendKeys(" ");
        await ele.sendKeys(Key.ENTER);
    }
}

async function getTextXpath(selector) {
    try {
        const element = await driver.wait(until.elementLocated(By.xpath(selector)), 10000);
        await driver.wait(until.elementIsVisible(element), 10000)
        const text = await element.getText();
        return text;
    } catch (error) {
        console.error("Error occurred while getting text by XPath:", error);
        throw error; // Propagate the error further if needed
    }
}
async function countElement(selector) {
    try {
        var rows = await driver.findElements(By.xpath(selector), 10000);
        return rows.length;
    } catch (error) {
        console.error("Error occurred while getting text by XPath:", error);
        throw error; // Propagate the error further if needed
    }
}

async function fillFile(selector, value) {
    await driver.findElement(By.xpath(selector), 10000).sendKeys(value);
}

async function getValue(selector) {
    await driver.sleep(500);
    return await driver
        .wait(until.elementLocated(By.xpath(selector)))
        .getAttribute("value");
}

async function checkElementExists(selector1) {
    try {
        // Find the element
        await driver.findElement(By.xpath(selector1));

        // If the element is found, it exists
        console.log("Element exists!");
    } catch (error) {
        // If the element is not found, it does not exist
        if (error.name === "NoSuchElementError") {
            console.log("Element does not exist!");
        } else {
            console.error("Error occurred:", error);
        }
    } finally {
        // Quit the driver
        await driver.quit();
    }
}

async function waitLoadingXpath(selector) {
    await driver.wait(
        until.stalenessOf(await driver.findElement(By.xpath(selector))),
        60000,
        "Loading animation did not disappear"
    );
}

async function isButtonEnabled(selector) {
    const detailButton = await driver.findElement(By.xpath(selector)); // replace with the actual ID of the detail button
    return detailButton.isEnabled();
}

module.exports = {
    getElement: getElement,
    clickButtonXpath: clickButtonXpath,
    fillFilledXpath: fillFilledXpath,
    fillSelectXpath: fillSelectXpath,
    scrollByXpath: scrollByXpath,
    clearInputXpath: clearInputXpath,
    getTextXpath: getTextXpath,
    countElement: countElement,
    fillFile: fillFile,
    getValue: getValue,
    clickButtonCss: clickButtonCss,
    checkElementExists: checkElementExists,
    waitLoadingXpath: waitLoadingXpath,
    isButtonEnabled: isButtonEnabled,
};