import { expect } from '@wdio/globals';
import UrlPage from '../pageobjects/url-page.js';
import HomePage from '../pageobjects/home-page.js';
import ResultsPage from '../pageobjects/results-page.js';
import PropertyPage from '../pageobjects/property-page.js';
import { should } from 'chai';
import allureReporter from '@wdio/allure-reporter';



describe('Airbnb Website Test Suite', () => {
    let page;
    should(); 

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
        await browser.pause(3000);
            
    });
    it('Should click on the More filter button', async () => {
        allureReporter.addStep('Open More Filter');

        await ResultsPage.moreFilerButton.waitForDisplayed({timeout:1000});
        await expect(ResultsPage.moreFilerButton).toBeDisplayed();
        await ResultsPage.moreFilerButton.click(); 
            
    });
    it('Should scroll to the Bedrooms section and add 5 bedrooms filter', async () => {
        allureReporter.addStep('Add 5 bedrooms filter');

        await ResultsPage.scrollToAddMoreBedroomButton();
        
        await ResultsPage.addMoreBedroomButton.waitForDisplayed({timeout:1000});
        await expect(ResultsPage.addMoreBedroomButton).toBeDisplayed();

        async function clickButtonMultipleTimes(button, times) {
            for (let i = 0; i < times; i++) {
              await button.click();
            }
          }
        await clickButtonMultipleTimes(ResultsPage.addMoreBedroomButton, 5);
            
    });
    it('Should scroll to the Show More Amenities button and click on it', async () => {
        allureReporter.addStep('Scroll to the Show More Amenities and click it');

        await ResultsPage.scrollToShowMoreButton();
        
        await ResultsPage.showMoreButton.waitForDisplayed({timeout:1000});
        await expect(ResultsPage.showMoreButton).toBeDisplayed();
        await ResultsPage.showMoreButton.click();
            
    });
    it('Should scroll to the Pool Option Amenities button and click on it', async () => {
        allureReporter.addStep('Scroll to the Pool Option Amenities and click it');

        await ResultsPage.scrollToPoolOptionButton();
        
        await ResultsPage.poolOptionButton.waitForDisplayed({timeout:1000});
        await expect(ResultsPage.poolOptionButton).toBeDisplayed();
        await ResultsPage.poolOptionButton.click();
            
    });
    it('Should click on the the Show Results button', async () => {
        allureReporter.addStep('Click on the Results Button');

        
        await ResultsPage.showResultsButton.waitForDisplayed({timeout:1000});
        await expect(ResultsPage.showResultsButton).toBeDisplayed();
        await ResultsPage.showResultsButton.click();
        await browser.pause(2000);
            
    });
    it('Should verify properties have at least 5 bedrooms', async () => {
        allureReporter.addStep('Check the properties with 5 bedrooms plus');
        
        await browser.waitUntil(async () => {
            const count = await ResultsPage.propertiesFiveBedroomsPlus.length;
            return count > 0;
        }, { timeout: 5000, timeoutMsg: 'Expected at least one property with 5 bedrooms to be displayed' });
    
        const properties = await ResultsPage.propertiesFiveBedroomsPlus;
    
        const propertiesCount = properties.length;
        console.log(`Found ${propertiesCount} properties with at least 5 bedrooms`);
    
        expect(propertiesCount).toBeGreaterThan(0, 'No properties found with at least 5 bedrooms');
    
        for (const property of properties) {
            const bedroomText = await property.getText();
            console.log(`Bedroom element text: "${bedroomText}"`);
    
            const bedroomCount = ResultsPage.extractBedroomCount(bedroomText);
            console.log(`Extracted bedroom count: ${bedroomCount}`);
    
            expect(bedroomCount).toBeGreaterThanOrEqual(5, 'Property does not have at least 5 bedrooms'); 
        }
    });
    it('Should click on the first property', async () => {
        allureReporter.addStep('Click on the first property');

        await ResultsPage.firstProperty.waitForDisplayed({timeout: 10000});
        await expect(ResultsPage.firstProperty).toBeDisplayed();
        await ResultsPage.firstProperty.click();

        await browser.pause(5000);
    });

    it('Should close the translation pop-up and we stay on the new page', async () => {
        allureReporter.addStep('Close the translation pop-up');
        
        const windowHandles = await browser.getWindowHandles();
        
        if (windowHandles.length > 1) {
            await browser.switchToWindow(windowHandles[windowHandles.length - 1]);
        }
        await browser.keys('Escape');
        await browser.pause(3000);

    });

    it('Should scroll to the Show More Amenities button and click it', async () => {
        allureReporter.addStep('Scroll to and click the "Show More Amenities" button');

        await PropertyPage.refreshAndScrollToShowMoreButton();
        await PropertyPage.amenitiesShowMoreButton.waitForDisplayed({ timeout: 10000 });
        await PropertyPage.amenitiesShowMoreButton.click();

        await browser.pause(1000);

      
    });
    it('Scroll to Parking and Facilities and check it, and verify Pool amenity', async () => {
        allureReporter.addStep('Scroll to Parking and Facilities section');
    
        await PropertyPage.scrollToParkingAndFacilities();
        await browser.pause(2000);
        
        const isPoolDisplayed = await PropertyPage.checkPoolAmenityDisplayed();
    
        console.log('Is Pool displayed:', isPoolDisplayed);
        isPoolDisplayed.should.be.true;

    });
});