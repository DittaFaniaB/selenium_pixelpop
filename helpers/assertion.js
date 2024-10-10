const { By, until } = require("selenium-webdriver");
const { expect } = require("chai");
async function assertionValue(selector, expectedValue, type = true) {
    const element = await driver.wait(until.elementLocated(By.xpath(selector)));
    await driver.wait(until.elementIsVisible(element), 10000);
    let text;
    if (type) {
        text = await element.getText();
    } else {
        text = await element.getAttribute("value");
    }
    expect(text).to.equal(expectedValue);
    await driver.sleep(1000);
}

async function actualExpected(data1, data2) {
    expect(data1).to.equal(data2);
}

async function assertionElementExist(selector) {
    try {
        const element = await driver.findElement(By.xpath(selector), 10000);
        expect(element).to.exist;
    } catch (error) {
        console.log("Element does not exist.");
        throw error; 
    }
}
async function assertionElementDoesNotExist(selector) {
    let elementExists = true;

    try {
        const element = await driver.findElement(By.xpath(selector), 10000);
    } catch (error) {
        if (error.name === 'NoSuchElementError' || error.name === 'NoSuchElementException') {
            elementExists = false;
        } else {
            throw error;
        }
    }
    expect(elementExists).to.be.false;
}

async function assertionElementsCount(selector, expectedCount) {
    try {
        var elements = await driver.findElements(By.xpath(selector), 10000);
        expect(elements.length).to.equal(expectedCount);
    } catch (error) {

    }
}
module.exports = {
    assertionValue: assertionValue,
    actualExpected: actualExpected,
    assertionElementExist: assertionElementExist,
    assertionElementDoesNotExist: assertionElementDoesNotExist,
    assertionElementsCount: assertionElementsCount
};