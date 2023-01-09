describe('Login page test', () => {
  
  const USERNAME = Cypress.env('USERNAME');
  const PASSWORD = Cypress.env('PASSWORD');
  
  let loginPageData: {
    title: string,
    subtitle: string,
    description: string
  };

  beforeEach(() => {
    cy.visit('/');
    cy.clearCookies({ log: true })

    // Loading test data
    cy.fixture('login-page').then((ttls) => {
      loginPageData = ttls;
    });

  });

  it('login page is displayed and loads correctly', () => {
    cy.getByDataTest('landing-title').should('have.text', loginPageData.title);
    cy.getByDataTest('landing-subtitle').should('have.text', loginPageData.subtitle);
    cy.getByDataTest('landing-desc').should('have.text', loginPageData.description);
  });

  it('navigate to the user form page IDIR', () => {
    cy.getByDataTest('landing-button__idir').click();
    cy.get('#idirLogo').should('be.visible');
  });

  it('navigate to the user form page BCeID', () => {
    cy.getByDataTest('landing-button__bceid').click();
    cy.get('#bceidLogo').should('be.visible');
  });

  it('try to access system using a link without user connected', () => {
    cy.visit('https://nrsparwebapp-test-app.apps.silver.devops.gov.bc.ca/dashboard');
    cy.getByDataTest('landing-title').should('have.text', loginPageData.title);
  });

  it.skip('log in with BCeID and validate if after timeout the user is disconnected', () => {
    cy.getByDataTest('landing-button__bceid').click();
    cy.get('#bceidLogo').should('be.visible');
    cy.get('input[name=user]')
          .clear()
          .type(USERNAME, { delay: 50 });
    cy.get('input[name=password]')
          .clear()
          .type(PASSWORD, { delay: 50 });
    cy.get('input[name=btnSubmit]').click();
    cy.wait(1800000); //wait for 30 minutes 1800000
    cy.getByDataTest('landing-title').should('have.text', loginPageData.title);
  });

  it('log in with BCeID and validate user role', () => {
    cy.getByDataTest('landing-button__bceid').click();
    cy.get('#bceidLogo').should('be.visible');
    cy.get('input[name=user]')
          .clear()
          .type(USERNAME, { delay: 50 });
    cy.get('input[name=password]')
          .clear()
          .type(PASSWORD, { delay: 50 });
    cy.get('input[name=btnSubmit]').click();
    //TODO - Click on side menu
    cy.getByDataTest('').click();
    //TODO - Check user role
    cy.getByDataTest('').should('eql', '');
  });

  it('log in with BCeID and validate user information', () => {
    cy.getByDataTest('landing-button__bceid').click();
    cy.get('#bceidLogo').should('be.visible');
    cy.get('input[name=user]')
          .clear()
          .type(USERNAME, { delay: 50 });
    cy.get('input[name=password]')
          .clear()
          .type(PASSWORD, { delay: 50 });
    cy.get('input[name=btnSubmit]').click();
    //TODO - Click on side menu
    cy.getByDataTest('').click();
    //TODO - Check user information
    cy.getByDataTest('').should('eql', '');
  });

});
