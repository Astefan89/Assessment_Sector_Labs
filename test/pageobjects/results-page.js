class ResultsPage {

    get destinationTitle() {
        return $('//button[@data-testid="little-search-location"]'); 
    }

    get dateTitle() {
        return $('//button[@data-testid="little-search-date"]'); 
    }

    get guestsTitle() {
        return $('//button[@data-testid="little-search-guests"]'); 
    }

    get propertiesBedrooms() {
        return $$('//span[contains(text(), "2 bedrooms")]'); 
    }
    get moreFilerButton() {
        return $('//button[@data-testid="category-bar-filter-button"]'); 
    }
    get showMoreButton() {
        return $('//span[contains(text(), "Show more")]'); 
    }
    get addMoreBedroomButton() {
        return $('//button[@data-testid="stepper-filter-item-min_bedrooms-stepper-increase-button"]'); 
    }
    get poolOptionButton() {
        return $('//button[@id="filter-item-amenities-7"]'); 
    }
    get showResultsButton() {
        return $('//div[@class="ptiimno atm_7l_1p8m8iw dir dir-ltr"]'); 
    }
    get propertiesFiveBedroomsPlus() {
        return $$('//span[contains(text(), "5 bedrooms")]'); 
    }
    get mapContainer() {
        return $('//div[@data-testid="map/GoogleMap"]');
    }
    get firstProperty() {
        return $('(//div[meta[@itemprop="position" and @content="1"]])[1]/div[1]'); 
    }
    get selectedPinXpath() {
        return $('//button[@data-testid="map/markers/BasePillMarker" and @aria-hidden="false"]/div/span'); 
    }
//Functions for the second test! 

    extractBedroomCount(text) {
        
        if (!text || typeof text !== 'string') {
            console.error(`Invalid input to extractBedroomCount: ${text}`);
            return 0;
        }

        const match = text.match(/(\d+)\s*(bed|beds)/i); 
        if (match) {
            return parseInt(match[1], 10); 
        }

        console.warn(`No bed count found in text: "${text}"`);
        return 0;
    }


    async scrollToAddMoreBedroomButton() {

        await this.addMoreBedroomButton.waitForExist({ timeout: 10000 });
        await this.addMoreBedroomButton.scrollIntoView({ block: 'center', inline: 'center' });
    
    }
    async scrollToShowMoreButton() {

        await this.showMoreButton.waitForExist({ timeout: 10000 });
        await this.showMoreButton.scrollIntoView({ block: 'center', inline: 'center' });
    
    }   
    
    async scrollToPoolOptionButton() {

        await this.poolOptionButton.waitForExist({ timeout: 10000 });
        await this.poolOptionButton.scrollIntoView({ block: 'center', inline: 'center' });
    
    }

//Functions for the third test! 
    async hoverOverFirstProperty() {
        const firstProperty = await this.firstProperty;
        console.log(firstProperty); 
        if (!firstProperty) {
            throw new Error("First property is not defined. Check your selector.");
        }
        await firstProperty.moveTo();
    }
    async getMapPin() {
        const mapPin = await this.selectedPinXpath.parentElement().$('div').getCSSProperty('background-color');
        return mapPin; 
    }
    async clickMapPin() {
        const  clickPin = await this.selectedPinXpath.parentElement().parentElement().click();
        return clickPin; 
    }
    async getFirstPropertyDetails() {
        const title = await this.firstProperty.$('.//div[@data-testid="listing-card-title"]').getText();
        const details = await this.firstProperty.$('.//div[@data-testid="listing-card-subtitle"]').getText();
        return {title, details};
    }

    async getMapPopupDetails() {
        const title = await this.mapContainer.$('.//div[@data-testid="listing-card-title"]').getText();
        const details = await this.mapContainer.$('.//div[@data-testid="listing-card-subtitle"]').getText();
        return {title, details};
    }
}

module.exports = new ResultsPage();
