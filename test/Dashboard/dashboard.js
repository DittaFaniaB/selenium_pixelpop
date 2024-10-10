const { By, Key, until } = require('selenium-webdriver');
const reusable_step = require('../../helpers/reusable-test');
const { expect } = require('chai');
const element = require('../../helpers/element');
const assertion = require('../../helpers/assertion');

describe('PixelPop', function() {
    describe('Dashboard Page', function() {
        before(async function() {
            await reusable_step.loginPage(process.env.EMAIL, process.env.PASSWORD);
        })
        after(async function() {
            await driver.quit();
        })
        it('[TC0009] User can access dashboard page', async function() 
        {
            try {
                await assertion.assertionElementExist(`//p[contains(text(),"All Media")]`);
                await assertion.assertionElementExist(`//p[contains(text(),"All Display")]`);
            } catch (error) {
                throw error;
            }
        })
    })
})