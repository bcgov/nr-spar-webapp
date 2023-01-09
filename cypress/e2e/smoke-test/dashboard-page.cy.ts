describe('Dashboard page test', () => {

    let dashboardPageData: {
        title: string,
        subtitle: string
    };

    let seedlotsPageData: {
        title: string,
        subtitle: string
    };


    beforeEach(() => {
        cy.visit('/');

        //TODO
        //Log in command
    
        // Loading Dashboard page data
        cy.fixture('dashboard-page').then((ttls) => {
            dashboardPageData = ttls;
        });

        // Loading Dashboard page data
        cy.fixture('seedlots-page').then((ttls) => {
            seedlotsPageData = ttls;
        });
      });


    it('should have an activity/card saved as favorite on Dashboard page ', () => {
        // 1 - Go to seedlot page
        cy.getByDataTest('').click();
        cy.getByDataTest('').should('eq', seedlotsPageData.title);
        // 2 - Mark seedlot page as favorite
        cy.getByDataTest('').click();
        // 3 - Go to dashboard page
        cy.getByDataTest('').click();
        cy.getByDataTest('').should('eq', dashboardPageData.title);
        // 4 - Verify if the activity is listed on "My favorite activies"
        cy.getByDataTest('').should('be.visible');
    });

    it('should be possible save only 8 activities/cards as favorite ', () => {
        // 1 - Go to seedlot page
        cy.getByDataTest('').click();
        cy.getByDataTest('').should('eq', seedlotsPageData.title);
        // 2 - Repeat previous step for 8 activities/cards
        // 3 - Mark seedlot page as favorite
        cy.getByDataTest('').click();
        // 4 - Go to dashboard page
        cy.getByDataTest('').click();
        cy.getByDataTest('').should('eq', dashboardPageData.title);
        // 5 - Verify if the activity is listed on "My favorite activies"
        cy.getByDataTest('').should('be.visible');
        // 6 - Repeat previous step for 8 activities/cards
    });

    it('Select a card on "my favorite activities" and select highlight shortcut option', () => {
        // 1 - Go to seedlot page
        cy.getByDataTest('').click();
        cy.getByDataTest('').should('eq', seedlotsPageData.title);
        // 2 - Mark seedlot page as favorite
        cy.getByDataTest('').click();
        // 3 - Go to dashboard page
        cy.getByDataTest('').click();
        cy.getByDataTest('').should('eq', dashboardPageData.title);
        // 4 - Verify if the activity is listed on "My favorite activies"
        cy.getByDataTest('').should('be.visible');
        
    });

    it('Select a card on "my favorite activities" and select highlight shortcut option when already another card highlighted', () => {
        
    });

    it('Dehighlight shortcut from a card on "my favorite activities"', () => {
        
    });

    it('Remove a card from "My favorite activities"', () => {
        
    });

    it('Remove a card from "My favorite activities" and add it again', () => {
        
    });

    it('Remove a card marked as highlighted from "My favorite activities" and add it again', () => {
        
    });

    it('Remove all cards from "My favorite activities"', () => {
        
    });

    it('Open app from "my favorite activities"', () => {
        
    });

    it('Check help icon on "My favorite activities"', () => {
        
    });

    it('Move seedlot registration request to Complete status and check it on "My recent activities"', () => {
        
    });

    it('Move seedlot registration request to Submited status and check it on "My recent activities"', () => {
        
    });

    it('Move seedlot registration request to Pending status and check it on "My recent activities"', () => {
        
    });

    it('Move seedlot registration request to Incomplete status and check it on "My recent activities"', () => {
        
    });

    it('Move seedlot registration request to Expired status and check it on "My recent activities"', () => {
        
    });

    it('Move seedlot registration request to Canceled status and check it on "My recent activities"', () => {
        
    });

    it('Move seedling request to Complete status and check it on "My recent activities"', () => {
        
    });

    it('Move seedling request to Submited status and check it on "My recent activities"', () => {
        
    });

    it('Move seedling request to Pending status and check it on "My recent activities"', () => {
        
    });

    it('Move seedling request to Incomplete status and check it on "My recent activities"', () => {
        
    });

    it('Move seedling request to Expired status and check it on "My recent activities"', () => {
        
    });

    it('Move seedling request to Canceled status and check it on "My recent activities"', () => {
        
    });

    it('Add more than 10 requests on "My recent activities"', () => {
        
    });

    it('Add more than 10 files in a request on "My recent activities"', () => {
        
    });

    it('Select a request and click on more action option on "My recent activities"', () => {
        
    });

    it('Select a request and click on view file option on "My recent activities"', () => {
        
    });

    it('Try to select view file option in a request without file on "My recent activities"', () => {
        
    });

    it('Select a request and click on download file on "My recent activities"', () => {
        
    });

    it('Log in with IDIR and validate user information', () => {
        
    });

    it('Log in with IDIR and validate user role', () => {
        
    });

    it('Log in with IDIR and validate if after timeout the user is disconnected', () => {
        
    });

    it('Verify if user still connected in another navigator tab as IDIR user', () => {
        
    });

    it('Verify if after user logout all the instances from system are disconnected as IDIR user', () => {
        
    });

    it('Verify if user stay connected on system after closing the navigator window as IDIR user', () => {
        
    });

    it('Log in with BCeID and validate user information', () => {
        
    });

    it('Log in with BCeID and validate user role', () => {
        
    });

    it('Log in with BCeID and validate if after timeout the user is disconnected', () => {
        
    });

    it('Verify if user still connected in another navigator tab as BCeID user', () => {
        
    });

    it('Verify if after user logout all the instances from system are disconnected as BCeID user', () => {
        
    });

    it('Verify if user stay connected on system after closing the navigator window as BCeID user', () => {
        
    });

    it('Log in with IDIR through BCeID and validate user information', () => {
        
    });

    it('Log in with BCeID through IDIR and validate user information', () => {
        
    });

    it('Try to access system using a link without user connected', () => {
        
    });
});
