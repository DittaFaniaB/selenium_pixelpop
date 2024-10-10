const { By, Key, until } = require('selenium-webdriver');
const reusable_step = require('../../helpers/reusable-test');
const { expect } = require('chai');
const element = require('../../helpers/element');
const assertion = require('../../helpers/assertion');

describe('PixelPop', function() {
    describe('Media Page', function() {
        before(async function() {
            await reusable_step.loginPage(process.env.EMAIL, process.env.PASSWORD);
        })
        after(async function() {
            await driver.quit();
        })
        it('[TC0010] User can access Media page', async function() 
        {
            await element.clickButtonXpath(`//button[normalize-space()='Media']`);
            await driver.sleep(500);
            await element.getElement(`//div[contains(@class,"header-title")]/span[normalize-space()='Media']`);
            await element.getElement(`//table[contains(@class,"table")]`);
            await assertion.assertionElementExist(`//thead//td[contains(@class,"table-cell")]//p[normalize-space()='Name']`);
            await assertion.assertionElementExist(`//thead//td[contains(@class,"table-cell")]//p[normalize-space()='Duration']`);
            await assertion.assertionElementExist(`//thead//td[contains(@class,"table-cell")]//p[normalize-space()='Resolution']`);
            await assertion.assertionElementExist(`//thead//td[contains(@class,"table-cell")]//p[normalize-space()='Size']`);
            await assertion.assertionElementExist(`//thead//td[contains(@class,"table-cell")]//p[normalize-space()='Action']`);
        })
        // add
        it('[TC0022] User can add media with valid file', async function(){
            await element.clickButtonXpath(`//button[normalize-space()='Upload']`);
            await element.getElement(`//div[@class="YModal-container"]//p[contains(text(), 'Upload Media')]`);
            await element.fillFile(`//input[@type='file'][1]`, process.env.PATH_PROJECT+`\\videos\\SeaSand.mp4`);
            await element.getElement(`//div[contains(@class,"upload-progress")]`);
            await element.getElement(`//p[contains(@class,"upload-label")]`);
            await driver.sleep(1000);
            await element.getElement(`//*[contains(text(),'Loading..')]`);
            await driver.wait(until.elementIsNotVisible(await driver.findElement(By.xpath(`//p[contains(text(),'Loading..')]`))), 15000);
            await driver.sleep(500);
            await element.getElement(`//div[@type='success']`);
            await element.getElement(`//*[contains(text(), 'Success')]`);
            await element.getElement(`//*[contains(text(), 'File SeaSand has been uploaded')]`);
            await driver.sleep(2000);
            // await element.clickButtonXpath(`//button[normalize-space()='Close']`);
            
            //2
            await element.fillFile(`//input[@type='file']`, process.env.PATH_PROJECT+`\\videos\\beach.mp4`);
            await element.getElement(`//div[contains(@class,"upload-progress")]`);
            await element.getElement(`//p[contains(@class,"upload-label")]`);
            await driver.sleep(1000);
            await element.getElement(`//*[contains(text(),'Loading..')]`);
            await driver.wait(until.elementIsNotVisible(await driver.findElement(By.xpath(`//p[contains(text(),'Loading..')]`))), 15000);
            await driver.sleep(500);
            await element.getElement(`//div[@type='success']`);
            await element.getElement(`//*[contains(text(), 'Success')]`);
            await element.getElement(`//*[contains(text(), 'File beach has been uploaded')]`);
            await driver.sleep(2000);
            await element.clickButtonXpath(`//button[normalize-space()='Close']`);
            
        })
        it('[TC0023] User can not upload media with file larger than 100 mb', async function(){
            await element.clickButtonXpath(`//button[normalize-space()='Upload']`);
            await element.getElement(`//div[@class="YModal-container"]//p[contains(text(), 'Upload Media')]`);
            await element.fillFile(`//input[@type='file'][1]`, process.env.PATH_PROJECT+`\\videos\\Avril_Lavigne_Head_Above_Water.mp4`);
            await element.getElement(`//div[@type='error']`);
            await element.getElement(`//*[contains(text(), 'File Size Error')]`);
            await element.getElement(`//*[contains(text(), 'The file named Avril_Lavigne_Head_Above_Water.mp4 is too big. The maximum limit is 100mb.')]`);
            await driver.sleep(2000);
            await element.clickButtonXpath(`//button[normalize-space()='Close']`);
        })
        it('[TC0024] User can not upload media with invalid file extension ', async function(){
            await element.clickButtonXpath(`//button[normalize-space()='Upload']`);
            await element.getElement(`//div[@class="YModal-container"]//p[contains(text(), 'Upload Media')]`);
            await element.fillFile(`//input[@type='file'][1]`, process.env.PATH_PROJECT+`\\images\\54573555.jpg`);
            await element.getElement(`//div[@type='error']`);
            await element.getElement(`//*[contains(text(), 'Failed to Upload!')]`);
            await element.getElement(`//*[contains(text(), 'Failed to upload 54573555.jpg. File format not supported.')]`);
            await driver.sleep(2000);
            await element.clickButtonXpath(`//button[normalize-space()='Close']`);
        })
        it('[TC0025] User can play media after uploading on the pop-up modal ', async function(){
            await element.clickButtonXpath(`//button[normalize-space()='Upload']`);
            await element.getElement(`//div[@class="YModal-container"]//p[contains(text(), 'Upload Media')]`);
            await element.fillFile(`//input[@type='file']`, process.env.PATH_PROJECT+`\\videos\\sprite_ads.mp4`);
            await element.getElement(`//div[contains(@class,"upload-progress")]`);
            await element.getElement(`//p[contains(@class,"upload-label")]`);
            await driver.sleep(1000);
            await element.getElement(`//*[contains(text(),'Loading..')]`);
            await driver.wait(until.elementIsNotVisible(await driver.findElement(By.xpath(`//p[contains(text(),'Loading..')]`))), 15000);
            await driver.sleep(500);
            await element.getElement(`//div[@type='success']`);
            await element.getElement(`//*[contains(text(), 'Success')]`);
            await element.getElement(`//*[contains(text(), 'File sprite_ads has been uploaded')]`);
            await element.getElement(`//div[@class="upload-container"]//button[contains(@class,"YIconButton-root")]`);
            await element.clickButtonXpath(`(//div[@class="upload-container"]//button[contains(@class,"YIconButton-root")])[1]`);
            await element.getElement(`//div[@role="dialog"]//video`);
            await driver.sleep(2000);
            await element.clickButtonXpath(`//video/parent::div/div`);

        })
        it('[TC0026] User can delete media after uploading on the pop-up modal', async function(){
            await element.clickButtonXpath(`(//div[@class="upload-container"]//button[contains(@class,"YIconButton-root")])[2]`);
            await element.getElement(`//h3[contains(text(), 'Are you sure')]`);
            await element.clickButtonXpath(`//button[normalize-space()='Yes, Sure']`);
            await element.getElement(`//h3[contains(text(), 'Success')]`);
            await element.getElement(`//p[contains(text(), 'Your media has been deleted successfully.')]`);
            await element.clickButtonXpath(`//button[normalize-space()='Confirm']`);
            await element.clickButtonXpath(`//button[normalize-space()='Close']`);
        })
        // list
        it('[TC0012] User can search media based on valid name keywords', async function(){
            await driver.sleep(500);
            var keyword = await element.getTextXpath(`//tr[@data-role="table-row"][2]//td[2]//p`);
            await element.fillFilledXpath(`//input[@name="name"]`, keyword, true);
            await driver.sleep(4000);
            await assertion.assertionValue(`//tr[@data-role="table-row"][1]//td[2]//p`, keyword);
        })
        it('[TC0013] User can not search media based on invalid name keywords', async function(){
            await element.fillFilledXpath(`//input[@name="name"]`, 'invalid!@#$%^&*(', true);
            await element.getElement(`//p[normalize-space()='Sorry, no data available.']`);
            await element.clearInputXpath(`//input[@name="name"]`);
            await driver.sleep(500);
        })
        it('[TC0014] User can search media based on valid duration ', async function(){
            await element.fillFilledXpath(`//input[@name="duration_end"]`, '33', true);
            await driver.sleep(1500);
            await assertion.assertionValue(`//tr[@data-role="table-row"][1]//td[3]//p`, '33s');
        })
        it('[TC0015] User can not search media based on invalid duration keywords', async function(){
            await element.fillFilledXpath(`//input[@name="duration_end"]`, '1234567890', true);
            await driver.sleep(4000);
            await element.getElement(`//p[normalize-space()='Sorry, no data available.']`);
            await element.clearInputXpath(`//input[@name="duration_end"]`);
            await driver.sleep(3000);
        })
        it('[TC0017] User can search media based on valid resolution keywords', async function(){
            await element.fillFilledXpath(`//input[@name="resolution"]`, '640', true);
            await driver.sleep(2000);
            var result = await element.getTextXpath(`//tr[@data-role="table-row"][1]//td[4]//p`);
            expect(result).to.contain('640');
        })
        it('[TC0018] User can not search media based on invalid Resolution keywords', async function(){
            await element.fillFilledXpath(`//input[@name="resolution"]`, '59', true);
            await element.getElement(`//p[normalize-space()='Sorry, no data available.']`);
            await element.clearInputXpath(`//input[@name="resolution"]`);
            await driver.sleep(500);
        })
        
        // delete
        it('[TC0027] User can delete one of the media', async function(){
            await driver.sleep(500);
            await element.clickButtonXpath(`(//tr[@data-role="table-row"][1]//td[6]//button)[2]`);
            await element.getElement(`//h3[contains(text(), 'Warning!')]`);
            await element.getElement(`//p[contains(text(), "Are you sure to delete this media? You can't undo this action.")]`);
            await element.clickButtonXpath(`//button[normalize-space()='Yes, Sure']`);
            await element.getElement(`//h3[contains(text(), 'Success')]`);
            await element.getElement(`//p[contains(text(), 'Your media has been deleted successfully.')]`);
            await element.scrollByXpath(`//button[normalize-space()='Confirm']`);
            await driver.sleep(500);
            await element.clickButtonXpath(`//button[normalize-space()='Confirm']`);
        })
        it('[TC0028] User can bulk delete media ', async function(){
            await element.clickButtonXpath(`//tr[@data-role="table-row"][1]//td//input[@type="checkbox"]`);
            await element.clickButtonXpath(`//tr[@data-role="table-row"][2]//td//input[@type="checkbox"]`);
            await element.clickButtonXpath(`//button[normalize-space()='Delete']`);
            await element.getElement(`//h3[contains(text(), 'Warning!')]`);
            await element.getElement(`//p[contains(text(), "Are you sure to delete selected media? You can't undo this action.")]`);
            await element.clickButtonXpath(`//button[normalize-space()='Yes, Sure']`);
            await element.getElement(`//h3[contains(text(), 'Success')]`);
            await element.getElement(`//p[contains(text(), 'Your media has been deleted successfully.')]`);
            await element.scrollByXpath(`//button[normalize-space()='Confirm']`);
            await driver.sleep(500);
            await element.clickButtonXpath(`//button[normalize-space()='Confirm']`);
        })
        it('[TC0022] User can add media with valid file', async function(){
            await element.clickButtonXpath(`//button[normalize-space()='Upload']`);
            await element.getElement(`//div[@class="YModal-container"]//p[contains(text(), 'Upload Media')]`);
            await element.fillFile(`//input[@type='file'][1]`, process.env.PATH_PROJECT+`\\videos\\iPhone_15_ads.mp4`);
            await element.getElement(`//div[contains(@class,"upload-progress")]`);
            await element.getElement(`//p[contains(@class,"upload-label")]`);
            await driver.sleep(1000);
            await element.getElement(`//*[contains(text(),'Loading..')]`);
            await driver.wait(until.elementIsNotVisible(await driver.findElement(By.xpath(`//p[contains(text(),'Loading..')]`))), 15000);
            await driver.sleep(500);
            await element.getElement(`//div[@type='success']`);
            await element.getElement(`//*[contains(text(), 'Success')]`);
            await element.getElement(`//*[contains(text(), 'File iPhone_15_ads has been uploaded')]`);
            await driver.sleep(2000);
            await element.clickButtonXpath(`//button[normalize-space()='Close']`);
        })
        //detail
        it('[TC0029] User can view detail of the media', async function(){
            var arr = [];
            for(i=1;i<5; i++){
                await driver.sleep(500);
                var x = await driver.wait(until.elementLocated(By.xpath(`//tr[@data-role="table-row"][1]/td[${i+1}]//p`)));
                var y = await x.getText();
                arr.push(y)
            }
            console.log(arr);
            
            await element.clickButtonXpath(`(//tr[@data-role="table-row"][1]//td[6]//button)[1]`);
            await element.getElement(`//p[contains(text(), 'Media Information')]`);
            await element.getElement(`//p[contains(text(), 'Information Summary')]`);
            await element.getElement(`//p[contains(text(), 'Media Preview')]`);
            await assertion.assertionValue(`//p[contains(text(), 'Name')]/following-sibling::span/p`, arr[0]);
            await assertion.assertionValue(`//p[contains(text(), 'Resolution')]/following-sibling::span/p`, arr[2]);
            await assertion.assertionValue(`//p[contains(text(), 'Duration')]/following-sibling::span/p`, arr[1]);
            await assertion.assertionValue(`//p[contains(text(), 'Size')]/following-sibling::span/p`, arr[3]);
        })
        it('[TC0030] User can play the media on detail page', async function(){
            await element.clickButtonXpath(`//button[contains(@class,"player-button-play-button")]`);
            await element.getElement(`//video[@class="player-video show"]`);
            await driver.sleep(2000);
            await element.clickButtonXpath(`//button[contains(@class,"player-button-play-button")]`);
            await driver.navigate().refresh();
        })
        // edit
        it('[TC0031] User can edit media on the detail page with valid input', async function(){
            await element.clickButtonXpath(`//button[normalize-space()='Edit']`);
            await element.fillFilledXpath(`(//div[@class="YInputContainer"]//input)[1]`, 'iPhone_15_edit', true);
            await element.clickButtonXpath(`//button[normalize-space()='Save Changes']`);
            await element.getElement(`//h3[contains(text(), 'Confirmation!')]`);
            await element.getElement(`//p[contains(text(), 'Are you sure about the changes you made?')]`);
            await element.clickButtonXpath(`//button[normalize-space()='Yes, Sure']`);
            await element.getElement(`//div[contains(@class, 'YAlert success')]`);
            await element.getElement(`//h3[contains(text(), 'Success!')]`);
            await element.getElement(`//p[contains(text(), 'Your media has been changed successfully.')]`);
            await driver.sleep(1000);
            await element.clickButtonXpath(`//button[normalize-space()='Done']`);
            await assertion.assertionValue(`//p[contains(text(), 'Name')]/following-sibling::span/p`, 'iPhone_15_edit');
        })
        it('[TC0032] User can not edit media with name longer than 200 characters', async function(){
            await element.clickButtonXpath(`//button[normalize-space()='Edit']`);
            await element.fillFilledXpath(`(//div[@class="YInputContainer"]//input)[1]`, process.env.LONG_CHARACTER, true);
            await element.clickButtonXpath(`//button[normalize-space()='Save Changes']`);
            await element.getElement(`//h3[contains(text(), 'Confirmation!')]`);
            await element.getElement(`//p[contains(text(), 'Are you sure about the changes you made?')]`);
            await element.clickButtonXpath(`//button[normalize-space()='Yes, Sure']`);
            await element.getElement(`//div[contains(@class, 'YAlert error')]`);
            await element.getElement(`//h3[contains(text(), 'Failed!')]`);
            await element.getElement(`//p[contains(text(), 'Error Validation on name : The name must not be greater than 200 characters.')]`);
            await driver.sleep(1000);
            await element.clickButtonXpath(`//button[normalize-space()='Try again']`);
        })
        it('[TC0033] User can not edit media with empty field ', async function(){
            await element.clearInputXpath(`(//div[@class="YInputContainer"]//input)[1]`);
            await element.clickButtonXpath(`//button[normalize-space()='Save Changes']`);
            await element.getElement(`//div[@type="error"]`);
            await element.getElement(`//h3[contains(text(), 'Validation Error')]`);
            await element.getElement(`//p[contains(text(), 'Name field is required!')]`);
            await driver.sleep(1000);
            await element.clickButtonXpath(`//button[normalize-space()='Cancel']`);
        })
        it('[TC0034] User can delete media from detail page', async function(){
            await driver.sleep(1000);
            await element.clickButtonXpath(`//button[normalize-space()='Delete']`);
            await element.getElement(`//h3[contains(text(), 'Warning!')]`);
            await element.getElement(`//p[contains(text(), 'Are you sure to delete this media? You can’t undo this action.')]`);
            await element.clickButtonXpath(`//button[normalize-space()='Yes, Sure']`);
            await element.getElement(`//h3[contains(text(), 'Success')]`);
            await element.getElement(`//p[contains(text(), 'Your media has been deleted successfully.')]`);
            await element.clickButtonXpath(`//button[normalize-space()='Confirm']`);
            await element.clickButtonXpath(`//button[normalize-space()='Close']`);
        })

    })
})