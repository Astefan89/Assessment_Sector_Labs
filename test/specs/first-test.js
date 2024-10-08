import { expect } from '@wdio/globals';
import UrlPage from '../pageobjects/url-page.js';
import HomePage from '../pageobjects/home-page.js';
import ResultsPage from '../pageobjects/results-page.js';
import allureReporter from '@wdio/allure-reporter';

describe('Airbnb Website Test Suite', () => {
    let page;

    before(async () => {
        console.log('Starting Airbnb website tests');

        page = new UrlPage();
        
        // Open the Airbnb webpage
        await page.open();
    });


    it('Should have opened the Airbnb website', async () => {
        allureReporter.addStep('Open the Airbnb website');
        const title = await browser.getTitle();
        expect(title).toContain('Airbnb');
        await browser.pause(3000);
    });

    it('Should select Rome, italy as location', async () => {
        allureReporter.addStep('Select location');
       
        await HomePage.destinationSearchInput.waitForDisplayed({timeout:1000});
        await expect(HomePage.destinationSearchInput).toBeDisplayed();
        await HomePage.destinationSearchInput.click();

        await HomePage.destinationSearchInput.setValue("Rome, Italy");

  
    });
    it('Should select the check-in date and check-out date', async () => {
        allureReporter.addStep('Select Check-In and Check-Out date');

        await HomePage.checkInDateButton.waitForDisplayed({timeout:1000});
        await expect(HomePage.checkInDateButton).toBeDisplayed();
        await HomePage.checkInDateButton.click();


            const checkInDate = new Date();
            checkInDate.setDate(checkInDate.getDate() + 7);

            HomePage.setCheckInDate(checkInDate);

            HomePage.setCheckOutDate();
    
            await HomePage.selectCheckInDate();
    
            await HomePage.selectCheckOutDate();

    });

    it('Should click on the Add guest button and should add the', async () => {
        allureReporter.addStep('Add 2 adult guests and one children');

        await HomePage.checkOutDay.waitForDisplayed({timeout:1000});
        await expect(HomePage.checkOutDay).toBeDisplayed();
        await HomePage.addGuestButton.click();

        await HomePage.addAdultsButton.waitForDisplayed({timeout:1000});
        await expect(HomePage.addAdultsButton).toBeDisplayed();

        async function clickButtonMultipleTimes(button, times) {
            for (let i = 0; i < times; i++) {
              await button.click();
            }
          }
        await clickButtonMultipleTimes(HomePage.addAdultsButton, 2);
        
        await HomePage.addChildrenButton.waitForDisplayed({timeout:1000});
        await expect(HomePage.addChildrenButton).toBeDisplayed();
        await HomePage.addChildrenButton.click();
            
    });
    it('Should click on the Search Button', async () => {
        allureReporter.addStep('Search for the properties');
     
        await HomePage.searchButtonInput.waitForDisplayed({timeout:1000});
        await expect(HomePage.searchButtonInput).toBeDisplayed();
        await HomePage.searchButtonInput.click(); 
        await browser.pause(5000);
            
    });
    it('Should verify the destination title', async () => {
        allureReporter.addStep('Check destination');

        await ResultsPage.destinationTitle.waitForDisplayed({timeout: 2000});
        
        const titleText = await ResultsPage.destinationTitle.getText();
        expect(titleText).toContain('Rome');
    });

    it('Should verify the date title', async () => {
        allureReporter.addStep('Check the check-in and check-out date');

        await ResultsPage.dateTitle.waitForDisplayed({ timeout: 4000 });

        const dateText = await ResultsPage.dateTitle.getText();
        const datePart = dateText.split('\n')[1];
    
        const expectedDateString = HomePage.generateExpectedDateString();
    
        expect(datePart).toBe(expectedDateString);

    });
    it('Should verify the quests title', async () => {
        allureReporter.addStep('Check the guests');

        await ResultsPage.guestsTitle.waitForDisplayed({timeout: 2000});
        
        const titleText = await ResultsPage.guestsTitle.getText();
        expect(titleText).toContain('3 guests');
    });

    it('Should verify properties have at least 2 bedrooms', async () => {
        allureReporter.addStep('Check the properties with 2 bedrooms or more');

        await browser.waitUntil(async () => {
            const count = await ResultsPage.propertiesBedrooms.length;
            return count > 0;
        }, { timeout: 5000, timeoutMsg: 'Expected at least one property to be displayed' });
    
        const propertyBedrooms = await ResultsPage.propertiesBedrooms;
    
        console.log(`Found ${propertyBedrooms.length} properties`);
    
        expect(propertyBedrooms.length).toBeGreaterThan(0);
    
        for (const bedroomInfo of propertyBedrooms) {
            const bedroomText = await bedroomInfo.getText();
            console.log(`Bedroom element text: "${bedroomText}"`);
    
            const bedroomCount = ResultsPage.extractBedroomCount(bedroomText);
            console.log(`Extracted bedroom count: ${bedroomCount}`);
    
            expect(bedroomCount).toBeGreaterThanOrEqual(2);
        }
    });
    
});
    

