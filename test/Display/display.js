const { By, Key, until } = require('selenium-webdriver');
const reusable_step = require('../../helpers/reusable-test');
const { expect } = require('chai');
const element = require('../../helpers/element');
const assertion = require('../../helpers/assertion');

describe('PixelPop', function() {
    describe('Display Page', function() {
        const OTP_VALUE='723588';
        before(async function() { 
            await reusable_step.loginPage(process.env.EMAIL, process.env.PASSWORD);
        })
        after(async function() {
            // await driver.quit();
        })
        it('[TC0035] User can access Display page', async function() 
        {
            await element.clickButtonXpath(`//button[normalize-space()='Display']`);
            await driver.sleep(500);
            await element.getElement(`//div[contains(@class,"header-title")]/span[normalize-space()='Display']`);
            await element.getElement(`//table[contains(@class,"table")]`);
            await assertion.assertionElementExist(`//thead//td[contains(@class,"table-cell")]//p[normalize-space()='Display ID']`);
            await assertion.assertionElementExist(`//thead//td[contains(@class,"table-cell")]//p[normalize-space()='Name']`);
            await assertion.assertionElementExist(`//thead//td[contains(@class,"table-cell")]//p[normalize-space()='Status']`);
            await assertion.assertionElementExist(`//thead//td[contains(@class,"table-cell")]//p[normalize-space()='Play Duration']`);
            await assertion.assertionElementExist(`//thead//td[contains(@class,"table-cell")]//p[normalize-space()='Play Count']`);
            await assertion.assertionElementExist(`//thead//td[contains(@class,"table-cell")]//p[normalize-space()='Media']`);
            await assertion.assertionElementExist(`//thead//td[contains(@class,"table-cell")]//p[normalize-space()='Action']`);
        })
        it.skip('[TC0038] User can search Display based on valid Display ID keywords', async function(){
            var keyword = await element.getTextXpath(`//tr[@data-role="table-row"][2]//td[2]//p`);
            await element.fillFilledXpath(`//input[@name="serial"]`, keyword, true);
            await driver.sleep(2000);
            await assertion.assertionValue(`//tr[@data-role="table-row"][1]//td[2]//p`, keyword);
        })
        it.skip('[TC0039] User can not search Display based on invalid Display ID keywords', async function(){
            await element.fillFilledXpath(`//input[@name="serial"]`, 'invalid!@#$%^&*(', true);
            await driver.sleep(3000);
            await element.getElement(`//p[normalize-space()='Sorry, no data available.']`);
            await element.clearInputXpath(`//input[@name="serial"]`);
            await driver.sleep(3000);
        })
        it.skip('[TC0040] User can search Display based on valid Display Name keywords', async function(){
            var keyword = await element.getTextXpath(`//tr[@data-role="table-row"][2]//td[3]//p`);
            await element.fillFilledXpath(`//input[@name="name"]`, keyword, true);
            await driver.sleep(3000);
            await assertion.assertionValue(`//tr[@data-role="table-row"][1]//td[3]//p`, keyword);
        })
        it.skip('[TC0041] User can not search Display based on invalid Display Name keywords', async function(){
            await element.fillFilledXpath(`//input[@name="name"]`, 'invalid!@#$%^&*(', true);
            await driver.sleep(2500);
            await element.getElement(`//p[normalize-space()='Sorry, no data available.']`);
            await element.clearInputXpath(`//input[@name="name"]`);
            await driver.sleep(4000);
        })
        it.skip('[TC0042] User can search Display based on status', async function(){
            await element.clickButtonXpath(`//select[@name="status"]/option[contains(text(), 'Offline')]`);
            await driver.sleep(2000);
            await assertion.assertionValue(`//tr[@data-role="table-row"][1]//td[4]//div[@class="badge-content"]`, 'offline');
            await element.clickButtonXpath(`//select[@name="status"]/option[contains(text(), 'Select')]`);
            await driver.sleep(2500);
        })
        it.skip('[TC0043] User can search Display based on valid Media Name keywords', async function(){
            var keyword = await element.getTextXpath(`//tr[@data-role="table-row"][2]//td[7]//p`);
            await element.fillFilledXpath(`//input[@name="content_name"]`, keyword, true);
            await driver.sleep(2000);
            await assertion.assertionValue(`//tr[@data-role="table-row"][1]//td[7]//p`, keyword);
                
        })
        it.skip('[TC0044] User can not search Display based on invalid Media Name keywords', async function(){
            await element.fillFilledXpath(`//input[@name="content_name"]`, 'invalid!@#$%^&*(', true);
            await driver.sleep(2000);
            await element.getElement(`//p[normalize-space()='Sorry, no data available.']`);
            await element.clearInputXpath(`//input[@name="content_name"]`);
            await driver.sleep(2000);
        })
        // add 
        it('[TC0047] User cannot add new display with invalid OTP', async function(){
            await element.clickButtonXpath(`//button[normalize-space()='Add']`);
            await element.getElement(`//div[contains(@class, 'YBox-root title') and normalize-space()='Insert OTP']`);
            await element.fillFilledXpath(`//div[@role="presentation"]//input[@placeholder="Input here.."]`, '123456');
            await element.clickButtonXpath(`//button[normalize-space()='Confirm']`);
            await element.getElement(`//div[@type="error"]`)
            await element.getElement(`//h3[normalize-space()='Failed']`);
            await element.getElement(`//p[normalize-space()='OTP is invalid!']`);
            await driver.sleep(2000);
        })
        it.skip('[TC0048] User cannot add new display with OTP less than 6 characters', async function(){
            await element.fillFilledXpath(`//div[@role="presentation"]//input[@placeholder="Input here.."]`, '098');
            await element.clickButtonXpath(`//button[normalize-space()='Confirm']`);
            await element.getElement(`//div[@type="error"]`)
            await element.getElement(`//h3[normalize-space()='Failed']`);
            await element.getElement(`//p[normalize-space()='OTP is invalid!']`);
            await driver.sleep(2000);
        })
        it.skip('[TC0049] User cannot add new display with empty OTP ', async function(){
            await element.clearInputXpath(`//div[@role="presentation"]//input[@placeholder="Input here.."]`);
            await element.clickButtonXpath(`//button[normalize-space()='Confirm']`);
            await element.getElement(`//div[@type="error"]`);
            await element.getElement(`//h3[contains(text(), 'Validation Error')]`);
            await element.getElement(`//p[contains(text(), 'OTP field is required!')]`);
            await driver.sleep(2000);
        })
        it('[TC0052] User cannot add new display with name longer than 255 characters', async function(){
            await element.fillFilledXpath(`//div[@role="presentation"]//input[@placeholder="Input here.."]`, OTP_VALUE);
            await element.clickButtonXpath(`//button[normalize-space()='Confirm']`);
            await element.getElement(`//p[contains(text(), 'Media Information')]`);
            await element.getElement(`//p[contains(text(), 'Information Summary')]`);
            await element.getElement(`//p[contains(text(), 'Media')]`);
            await element.fillFilledXpath(`//p[contains(text(), 'Name')]/following-sibling::div//input`, process.env.LONG_CHARACTER);
            await element.clickButtonXpath(`//button[normalize-space()='Save Changes']`);
            await element.getElement(`//div[@type="error"]`);
            await element.getElement(`//h3[contains(text(), 'Failed!')]`);
            await element.getElement(`//p[contains(text(), 'Error Validation on name : The name must not be greater than 255 characters.')]`);
        })
        it.skip('[TC0053] User cannot add new display without selecting media', async function(){
            await element.fillFilledXpath(`//p[contains(text(), 'Name')]/following-sibling::div//input`, 'automation_test_display');
            await element.clickButtonXpath(`//button[normalize-space()='Save Changes']`);
            await element.getElement(`//div[@type="error"]`);
            await element.getElement(`//h3[contains(text(), 'Validation Error')]`);
            await element.getElement(`//p[contains(text(), 'You must add library to display.')]`);   
        })
        it('[TC0054] User can upload background image when add new display', async function(){
            await element.scrollByXpath(`//p[contains(text(), 'Upload Background')]`);
            await driver.sleep(750);
            await element.fillFile(`//input[@type='file'][1]`, process.env.PATH_PROJECT+`\\images\\54573555.jpg`);
            await driver.sleep(1000);
            await element.getElement(`//div[contains(@class, 'input-preview')]/img`);
        })
        it('[TC0055] User can delete the uploaded background image when add new display', async function(){
            await element.clickButtonXpath(`//div[contains(@class, 'input-preview-cancel')]`);
            await driver.sleep(1000);
            await assertion.assertionElementDoesNotExist(`//div[contains(@class, 'input-preview')]/img`);
        })
        it('[TC0056] User can not upload background image with invalid file extension when add new display', async function(){
            await driver.navigate().refresh();
            await element.scrollByXpath(`//p[contains(text(), 'Upload Background')]`);
            await driver.sleep(750);
            await element.fillFile(`//input[@type='file'][1]`, process.env.PATH_PROJECT+`\\videos\\iPhone_15_ads.mp4`);
            await element.getElement(`//div[@type="error"]`);
            await element.getElement(`//h3[contains(text(), 'Invalid file type')]`);
            await element.getElement(`//p[contains(text(), 'Please make sure the file you select is in image/png, image/jpg, image/jpeg format')]`);
            await driver.sleep(2000);
        })
        it('[TC0057] User can not upload background image with file size larger than 5 Mb', async function(){
                
        })
        it.skip('[TC0046] User can add new display with valid input', async function(){
                
        })
        // delete
        it.skip('[TC0059] User can not delete display when it is still playing', async function(){
                
        })
        it.skip('[TC0058] User can delete one of the display from the list', async function(){
                
        })
        // detail --> input display baru dulu
        it.skip('[TC0060] User can see detail of the display', async function(){
                
        })
        it.skip('[TC0061] User can delete one of the display from detail page', async function(){
                
        })
        it.skip('[TC0062] User can not delete display from detail page when it is still playing', async function(){
                
        })
        // edit
        it.skip('[TC0063] User can edit display from detail page with valid input', async function(){
                
        })
        it.skip('[TC0064] User can not edit display from detail page with empty field', async function(){
                
        })
        it.skip('[TC0065] User can not edit display from detail page with display name longer than 255 characters', async function(){
                
        })
        it.skip('[TC0066] User can not edit display from detail page without selecting media', async function(){
                
        })
        it.skip('[TC0067] User can upload background image when edit display', async function(){
                
        })
        it.skip('[TC0068] User can delete background image when edit display', async function(){
                
        })
        it.skip('[TC0069] User can not upload background image on edit form with filesize larger than 5Mb', async function(){
                
        })
        it.skip('[TC0070] User can not upload background image on edit form with invalid file extension', async function(){
                
        })
    })
})