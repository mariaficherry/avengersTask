Cypress.Commands.add('clickLink', (selector, linkText) => {
    cy.get(selector).contains(linkText).click();
})

Cypress.Commands.add('clickOption', (option) => {
    cy.get('.tt-highlight').eq(option).click();
})

Cypress.Commands.add('typeInSearch', (text) => {
    cy.get('#q')
      .clear()
      .type(text)
})

Cypress.Commands.add('verifyText', (tag, text) => {
    cy.get(tag).should('contain', text)
})

Cypress.Commands.add('verifyStatusCode', (requestID, statusCode) => {
    cy.wait(requestID).its('response.statusCode').should('eq', statusCode)
})

Cypress.Commands.add('loadTestDataFromJson', () => {
    cy.fixture('testData.json').then((data) => {
      Cypress.env('apiKey', data.apiKey);
      Cypress.env('suggestedTitles', data.suggestedTitles);
      Cypress.env('arrivaSearch', data.arrivaSearch);
      Cypress.env('arrivalSearch', data.arrivalSearch);
      Cypress.env('theArrivalSearch', data.theArrivalSearch);
      Cypress.env('arrivalTagline', data.arrivalTagline);
      Cypress.env('theArrivalTagline', data.theArrivalTagline);
      Cypress.env('theAvengersSearch', data.theAvengersSearch);
      Cypress.env('searchRequestUrl', data.searchRequestUrl);
    });
  });