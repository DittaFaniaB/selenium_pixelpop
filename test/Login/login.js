const { By, Key, until } = require('selenium-webdriver');
const reusable_step = require('../../helpers/reusable-test');
const { expect } = require('chai');
const element = require('../../helpers/element');
const assertion = require('../../helpers/assertion');

describe('PixelPop', function() {
    describe('Login Page', function() {
        before(async function() {
            // await reusable_step.accessBaseUrl();
        })
        after(async function() {
            await driver.quit();
        })
        it('[TC0001] User can access login page', async function() 
        {
            await reusable_step.accessBaseUrl();
            try {
                await assertion.assertionElementExist(`//p[contains(text(),'Welcome')]`);
                await assertion.assertionElementExist(`//input[@type='email']`);
                await assertion.assertionElementExist(`//input[@type='password']`);
            } catch (error) {
                throw error;
            }
        })
        it('[TC0003] User can not login with invalid email or password', async function(){
            await element.fillFilledXpath(`//input[@type='email']`, process.env.EMAIL);
            await element.fillFilledXpath(`//input[@type='password']`, process.env.PASSWORD_INVALID);
            await element.clickButtonXpath(`//button[@type='submit']`);
            await driver.sleep(500);
            await element.getElement(`//div[contains(@class,"YAlert")]`);
            await assertion.assertionValue(`//div[@class="YAlert-box-message"]/h3[@class="text text-title"]`, `Login Failed!`);
            await assertion.assertionValue(`//div[@class="YAlert-box-message"]/p[@class="text text-message"]`, `Unsuccessful login, an error occurred.`);
            await assertion.assertionElementExist(`//button[normalize-space()='Close']`);
            await element.clickButtonXpath(`//button[normalize-space()='Close']`);
        })
        it('[TC0004] User can not login with unregistered email', async function(){
            await element.fillFilledXpath(`//input[@type='email']`, process.env.UNREGISTERED_EMAIL);
            await element.fillFilledXpath(`//input[@type='password']`, process.env.PASSWORD);
            await element.clickButtonXpath(`//button[@type='submit']`);
            await driver.sleep(500);
            await element.getElement(`//div[contains(@class,"YAlert")]`);
            await assertion.assertionValue(`//div[@class="YAlert-box-message"]/h3[@class="text text-title"]`, `Login Failed!`);
            await assertion.assertionValue(`//div[@class="YAlert-box-message"]/p[@class="text text-message"]`, `Unsuccessful login, an error occurred.`);
            await assertion.assertionElementExist(`//button[normalize-space()='Close']`);
            await element.clickButtonXpath(`//button[normalize-space()='Close']`);
        })
        it('[TC0005] User can not login with empty email field', async function(){
            await element.fillFilledXpath(`//input[@type='email']`, ' ');
            await element.fillFilledXpath(`//input[@type='password']`, process.env.PASSWORD_INVALID);
            await element.clickButtonXpath(`//button[@type='submit']`);
            await driver.sleep(500);
            await element.getElement(`//div[@type='error']`);
            await assertion.assertionValue(`//div[@class="info"]/h3[@class="text text-title"]`, `Validation Error!`);
            await assertion.assertionValue(`//div[@class="info"]/p[@class="text text-desc"]`, `Email is not valid. Please check again!`);
        })
        it('[TC0006] User can not login with empty password field', async function(){
            await element.fillFilledXpath(`//input[@type='email']`, process.env.UNREGISTERED_EMAIL);
            await element.fillFilledXpath(`//input[@type='password']`, '');
            await element.clickButtonXpath(`//button[@type='submit']`);
            await driver.sleep(500);
            await element.getElement(`//div[@type='error']`);
            await assertion.assertionValue(`//div[@class="info"]/h3[@class="text text-title"]`, `Validation Error!`);
            await assertion.assertionValue(`//div[@class="info"]/p[@class="text text-desc"]`, `Password required, minimum 6 characters.`);
        })
        it('[TC0007] User can not login with invalid email format', async function(){
            await element.fillFilledXpath(`//input[@type='email']`, process.env.EMAIL_INVALID_FORMAT);
            await element.fillFilledXpath(`//input[@type='password']`, process.env.PASSWORD_INVALID);
            await element.clickButtonXpath(`//button[@type='submit']`);
            await driver.sleep(500);
            await element.getElement(`//div[@type='error']`);
            await assertion.assertionValue(`//div[@class="info"]/h3[@class="text text-title"]`, `Validation Error!`);
            await assertion.assertionValue(`//div[@class="info"]/p[@class="text text-desc"]`, `Email is not valid. Please check again!`);
        })
        it('[TC0008] User can not login with password shorter than 6 characters', async function(){
            await element.fillFilledXpath(`//input[@type='email']`, process.env.UNREGISTERED_EMAIL);
            await element.fillFilledXpath(`//input[@type='password']`, '12345');
            await element.clickButtonXpath(`//button[@type='submit']`);
            await driver.sleep(500);
            await element.getElement(`//div[@type='error']`);
            await assertion.assertionValue(`//div[@class="info"]/h3[@class="text text-title"]`, `Validation Error!`);
            await assertion.assertionValue(`//div[@class="info"]/p[@class="text text-desc"]`, `Password required, minimum 6 characters.`);
        })
        it('[TC0002] User can login with valid credential ', async function(){
            await driver.navigate().refresh();
            await driver.sleep(1000);
            await element.fillFilledXpath(`//input[@type='email']`, process.env.EMAIL);
            await element.fillFilledXpath(`//input[@type='password']`, process.env.PASSWORD);
            await element.clickButtonXpath(`//button[@type='submit']`);
            await driver.sleep(500);
            await element.getElement(`//p[contains(text(),"Great to see you! Let's get started.")]`);
            await assertion.assertionElementExist(`//button[contains(text(), 'Media')]`);
            await assertion.assertionElementExist(`//button[contains(text(), 'Display')]`);
            await assertion.assertionElementExist(`//p[contains(text(),"All Media")]`);
            await assertion.assertionElementExist(`//p[contains(text(),"All Display")]`);
        })
    })
})