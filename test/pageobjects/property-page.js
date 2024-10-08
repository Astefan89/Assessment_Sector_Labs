class PropertyPage {
    get amenitiesShowMoreButton() {
        return $('//div[@data-section-id="AMENITIES_DEFAULT"]//descendant::button');
    }

    get parkingAndFacilitiesHeader() {
        return $('//h2[contains(translate(text(), "PARKING AND FACILITIES", "parking and facilities"), "parking and facilities")]');
    }

    get poolAmenityOption() {
        return $('//div[contains(@id, "parking_facilities") and contains(translate(., "POOL", "pool"), "pool")]');
    }
    
    //Functions

    async refreshAndScrollToShowMoreButton() {
        await browser.refresh();
        await browser.pause(2000);

        const amenitiesSection = await this.amenitiesShowMoreButton;
        await amenitiesSection.waitForExist({ timeout: 20000 });

        await this.amenitiesShowMoreButton.scrollIntoView({ block: 'center', inline: 'center' });
        await this.amenitiesShowMoreButton.waitForClickable({ timeout: 10000 });

        await browser.pause(2000);
    }

    async scrollToParkingAndFacilities() {
        await this.parkingAndFacilitiesHeader.waitForExist({ timeout: 20000 });
        await this.parkingAndFacilitiesHeader.scrollIntoView({ block: 'center', inline: 'center' });
        await browser.pause(2000);
    }

    async getPoolAmenityText() {
        await browser.pause(2000); 
        if (await this.poolAmenityOption.isExisting()) {
            const poolAmenityText = await this.poolAmenityOption.getText();
            console.log('Pool Amenity Text:', poolAmenityText);
            return poolAmenityText.toLowerCase();
        }
        console.log('Pool Amenity not found');
        return '';
    }

    async checkPoolAmenityDisplayed() {
        const poolText = await this.getPoolAmenityText();
        const isPoolDisplayed = poolText.includes('pool');
        console.log('Is Pool displayed:', isPoolDisplayed);
        return isPoolDisplayed;
    }
}

module.exports = new PropertyPage();