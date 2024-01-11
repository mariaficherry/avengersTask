describe('template spec', () => {

  beforeEach(() => {
    cy.loadTestDataFromJson();
    cy.visit('/')
  });

  it('testCase1', () => {
    const apiKey = Cypress.env('apiKey');
    const searchRequestUrl = Cypress.env('searchRequestUrl');
    const suggestedTitles = Cypress.env('suggestedTitles');
    const arrivaSearch = Cypress.env('arrivaSearch');
    const arrivalSearch = Cypress.env('arrivalSearch');
    const theArrivalSearch = Cypress.env('theArrivalSearch');
    const arrivalTagline = Cypress.env('arrivalTagline');
    const theArrivalTagline = Cypress.env('theArrivalTagline');
    const theAvengersSearch = Cypress.env('theAvengersSearch');

    cy.get('.logo').should('exist')
    cy.url().should('contain', 'reactjs-tmdb-app/')

    cy.typeInSearch(arrivaSearch)
    cy.get('.tt-dropdown-menu').should('exist')

    suggestedTitles.forEach((name) => {
      cy.get('.tt-dataset-0').contains(name).should('exist');
    });

    cy.clickLink('.tt-dataset-0', arrivalSearch)

    cy.verifyText('h1', arrivalSearch)
    cy.verifyText('.tagline', arrivalTagline)

    cy.intercept({
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(theArrivalSearch)}&api_key=${encodeURIComponent(apiKey)}`,
    }).as('searchFirstTitle')

    cy.typeInSearch(theArrivalSearch)

    cy.clickOption(4)

    cy.verifyStatusCode('@searchFirstTitle', 200)

    cy.verifyText('h1', theArrivalSearch)
    cy.verifyText('p', theArrivalTagline)

    cy.intercept({
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(theAvengersSearch)}&api_key=${encodeURIComponent(apiKey)}`,
    }).as('searchSecondTitle')

    cy.fixture('avengersStubbedResponse.json').then((stubbedRating) => {
      cy.intercept('GET', `https://api.themoviedb.org/3/movie/24428?&api_key=${encodeURIComponent(apiKey)}`,
        stubbedRating,
      ).as('stubbedRating')
    })

    cy.typeInSearch(theAvengersSearch)

    cy.clickOption(0)

    cy.verifyStatusCode('@searchSecondTitle', 200)

    cy.verifyStatusCode('@stubbedRating', 200)

    cy.get('.meta-data:contains("101.1 / 10")').should('exist')
  })
})