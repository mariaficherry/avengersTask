import Selectors from "../support/selectors.js"
import * as testData from '../fixtures/testData.json'

Cypress.Commands.add('checkLogoAppearsAtTheTopRight', () => {
    cy.get(Selectors.logo)
        .should('be.visible')
        .should('have.class', 'logo')
        .then(($img) => {
            const position = $img.position();
            const errorRange = 20;
            try {
                expect(position.top).to.be.within(0 - errorRange, 0 + errorRange);
                expect(position.rigth).to.be.within(0 - errorRange, 0 + errorRange);
            } catch (error) {
                cy.log(`Assertion error: ${error.message}`);
            }
        })
})

Cypress.Commands.add('checkUrlContainsText', (text) => {
    cy.url().should('contain', text)
})

Cypress.Commands.add('checkMenuOptionsAreVisible', (menuSuggestedTitles) => {
    cy.get(Selectors.dropDownMenu).should('be.visible')
    menuSuggestedTitles.forEach((name) => {
        cy.get(Selectors.menuOption).contains(name).should('be.visible');
    });
})

Cypress.Commands.add('clickTitle', (title) => {
    cy.get(Selectors.menuOption).contains(title).click();
})

Cypress.Commands.add('clickOptionFromSearchResult', (option) => {
    cy.get('.tt-highlight').eq(option).click();
})

Cypress.Commands.add('typeInSearch', (text) => {
    cy.get('#q')
        .clear()
        .type(text)
})

Cypress.Commands.add('verifyMovieTitle', (title) => {
    cy.get(Selectors.movieTitle).should('contain', title)
})

Cypress.Commands.add('verifyMovieText', (text) => {
    cy.get(Selectors.movieInfoContainer).should('contain', text)
})

Cypress.Commands.add('verifyMovieInfo', (title, text) => {
    cy.verifyMovieTitle(title);
    cy.verifyMovieText(text);
})

Cypress.Commands.add('verifyStatusCode', (alias, statusCode) => {
    cy.wait(alias).its('response.statusCode').should('eq', statusCode)
})

Cypress.Commands.add('verifyStubbedRatingIsVisible', () => {
    cy.get(Selectors.movieRating).should('exist')
})

Cypress.Commands.add('waitForResponse', (url, queryText) => {
    cy.request({
        url: url,
        qs: {
            query: encodeURIComponent(queryText),
            api_key: encodeURIComponent(testData.apiKey),
        },
    })
        .then((response) => {
            expect(response).property('status').to.equal(testData.statusCodeOK)
        })
})

Cypress.Commands.add('stubAndVerifyMovieRating', (url, stubbedRating) => {
    cy.intercept('GET', url, (req) => {
        if (req.url.includes(`api_key=${encodeURIComponent(testData.apiKey)}`)) {
            req.reply(stubbedRating)
        } else {
            req.continue()
        }
    })
        .then(() => {
            cy.request({
                method: 'GET',
                url: url,
                qs: {
                    api_key: encodeURIComponent(testData.apiKey),
                },
            })
                .then((response) => {
                    cy.wrap(response).should('have.property', 'status', testData.statusCodeOK)
                })
        })
})