
class HomePage {
    get destinationSearchInput() {
        return $('#bigsearch-query-location-input');
    }

    get destinationInput() {
        return $('//div[@id="bigsearch-query-location-suggestion-5"]');
    }

    get checkInDateButton() {
        return $('//div[@data-testid="structured-search-input-field-split-dates-0"]');
    }

    get checkOutDateButton() {
        return $('//div[@data-testid="structured-search-input-field-split-dates-1"]');
    }

    get addGuestButton() {
        return $(`//div[@data-testid="structured-search-input-field-guests-button"]`);
    }

    get addAdultsButton() {
        return $(`//button[@data-testid="stepper-adults-increase-button"]`);
    }

    get addChildrenButton() {
        return $(`//button[@data-testid="stepper-children-increase-button"]`);
    }

    get searchButtonInput() {
        return $(`//button[@data-testid="structured-search-input-search-button"]`);
    }

    //Constructor and functions

    constructor() {
        this.checkInDateId = '';
        this.checkOutDateId = '';
    }

    setCheckInDate(date) {
        this.checkInDateId = this.formatDate(date);
    }

    setCheckOutDate() {
        
        const checkOutDate = new Date(this.parseDate(this.checkInDateId));
        checkOutDate.setDate(checkOutDate.getDate() + 7);
        this.checkOutDateId = this.formatDate(checkOutDate);
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
    }

    parseDate(dateString) {
        const [month, day, year] = dateString.split('/');
        return new Date(year, month - 1, day);
    }

    generateExpectedDateString() {

        const checkInDate = this.parseDate(this.checkInDateId);
        const checkOutDate = this.parseDate(this.checkOutDateId);

        const formatCheckInDate = (date) => {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        };

        const formatCheckOutDate = (date) => {
            return date.toLocaleDateString('en-US', { day: 'numeric' });
        };

        return `${formatCheckInDate(checkInDate)} – ${formatCheckOutDate(checkOutDate)}`;
    }

    get checkInDay() {
        return $(`//div[@data-testid="${this.checkInDateId}"]`);
    }

    get checkOutDay() {
        return $(`//div[@data-testid="${this.checkOutDateId}"]`);
    }

    async selectCheckInDate() {
        await expect(this.checkInDay).toBeDisplayed();
        await this.checkInDay.waitForClickable({ timeout: 1000 });
        await this.checkInDay.click();
    }

    async selectCheckOutDate() {
        await expect(this.checkOutDay).toBeDisplayed();
        await this.checkOutDay.waitForClickable({ timeout: 1000 });
        await this.checkOutDay.click();
    }
}

module.exports = new HomePage();

