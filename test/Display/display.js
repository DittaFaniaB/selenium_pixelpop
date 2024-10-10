const { By, Key, until } = require('selenium-webdriver');
const reusable_step = require('../../helpers/reusable-test');
const { expect } = require('chai');
const element = require('../../helpers/element');
const assertion = require('../../helpers/assertion');

describe('PixelPop', function() {
    describe('Display Page', function() {
        before(async function() { 
            await reusable_step.loginPage(process.env.EMAIL, process.env.PASSWORD);
        })
        after(async function() {
            await driver.quit();
        })
        it('[TC0035] User can access Display page', async function() 
        {
            
        })
        it.skip('[TC0038] User can search Display based on valid Display ID keywords', async function(){
                
        })
        it.skip('[TC0039] User can not search Display based on invalid Display ID keywords', async function(){
                
        })
        it.skip('[TC0040] User can search Display based on valid Display Name keywords', async function(){
                
        })
        it.skip('[TC0041] User can not search Display based on invalid Display Name keywords', async function(){
                
        })
        it.skip('[TC0042] User can search Display based on status', async function(){
                
        })
        it.skip('[TC0043] User can search Display based on valid Media Name keywords', async function(){
                
        })
        it.skip('[TC0044] User can not search Display based on invalid Media Name keywords', async function(){
                
        })
        // add 
        // dipikir lagi urutan test case nya
        it.skip('[TC0046] User can add new display with valid input', async function(){
                
        })
        it.skip('[TC0047] User cannot add new display with invalid OTP', async function(){
                
        })
        it.skip('[TC0048] User cannot add new display with OTP less than 6 characters', async function(){
                
        })
        it.skip('[TC0049] User cannot add new display with empty OTP ', async function(){
                
        })
        it.skip('[TC0052] User cannot add new display with name longer than 255 characters', async function(){
                
        })
        it.skip('[TC0053] User cannot add new display without selecting media', async function(){
                
        })
        it.skip('[TC0054] User can upload background image when add new display', async function(){
                
        })
        it.skip('[TC0055] User can delete the uploaded background image when add new display', async function(){
                
        })
        it.skip('[TC0056] User can not upload background image with invalid file extension when add new display', async function(){
                
        })
        it.skip('[TC0057] User can not upload background image with file size larger than 5 Mb', async function(){
                
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