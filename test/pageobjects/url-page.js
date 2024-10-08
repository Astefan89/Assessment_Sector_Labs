const { browser } = require('@wdio/globals');

class UrlPage {
    /**
     * Opens the main page of the application
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    open(path = '') {
        return browser.url(`https://www.airbnb.com/${path}`);
    }
}

module.exports = UrlPage; 