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
    it('Should click on the Search Button and open the window in fullscreen', async () => {
        allureReporter.addStep('Search for the properties and open the window in fullscreen');
     
        await HomePage.searchButtonInput.waitForDisplayed({timeout:1000});
        await expect(HomePage.searchButtonInput).toBeDisplayed();
        await HomePage.searchButtonInput.click(); 

        await browser.maximizeWindow();
        await browser.pause(2000);       

    });

    it('Should hover over the first property and check the map pin display and color change and click on the map pin', async () => {
        allureReporter.addStep('Hover over the first prepoerty and click on the map pin');
        
        await ResultsPage.hoverOverFirstProperty(); 
        await browser.pause(1000); 

        const selectedPinColor = await ResultsPage.getMapPin();
        expect(selectedPinColor.parsed.hex).toEqual('#222222');
        
        await ResultsPage.clickMapPin();
        await browser.pause(1000);     
    
    });
    
    it('Should verify that the map popup details match the search results', async () => {
        allureReporter.addStep('Check the title and the details from the first property and the map');
        
        const listDetails = await ResultsPage.getFirstPropertyDetails();
        const mapDetails = await ResultsPage.getMapPopupDetails();
        
        expect(mapDetails.title).toBe(listDetails.title, 'Property title should match in list and map popup');
        expect(mapDetails.details).toBe(listDetails.details, 'Property details should match in list and map popup');
    });
});