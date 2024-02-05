import * as testData from '../fixtures/testData.json'
import * as stubbedRating from '../fixtures/avengersStubbedResponse.json'

describe('template spec', () => {

  beforeEach(() => {
    cy.visit('/')
  });

  it('testCase1', () => {
    cy.checkLogoAppearsAtTheTopRight()

    cy.checkUrlContainsText(testData.urlText)

    cy.typeInSearch(testData.arrivaSearch)

    cy.waitForResponse(testData.searchRequestUrl, testData.arrivaSearch)

    cy.checkMenuOptionsAreVisible(testData.suggestedTitles)

    cy.clickTitle(testData.arrivalSearch)

    cy.verifyMovieInfo(testData.arrivalSearch, testData.arrivalSlogan)

    cy.typeInSearch(testData.theArrivalSearch)

    cy.waitForResponse(testData.searchRequestUrl, testData.theArrivalSearch)

    cy.clickOptionFromSearchResult(testData.fifthOption)

    cy.verifyMovieInfo(testData.theArrivalSearch, testData.theArrivalParagraph)

    cy.waitForResponse(testData.searchRequestUrl, testData.theAvengersSearch)

    cy.stubAndVerifyMovieRating(testData.avengersMovieUrl, stubbedRating)

    cy.typeInSearch(testData.theAvengersSearch)

    cy.clickOptionFromSearchResult(testData.firstOption)

    cy.verifyStubbedRatingIsVisible()
  })
})