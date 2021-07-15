/// <reference types="cypress" />
describe("testing name input", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });
  it("inserts values in the form and submits", () => {
    //test name
    cy.get('[data-cy="name"]').type("Nuggs").should("have.value", "Nuggs");
    //test email
    cy.get('[data-cy="email"]')
      .type("nuggs@tuggs.com")
      .should("have.value", "nuggs@tuggs.com");
    //test password
    cy.get('[data-cy="password"]')
      .type("asldkfjasljdsf")
      .should("have.value", "asldkfjasljdsf");
    // test terms checkbox
    cy.get('[data-cy="terms"]').click().should("be.checked");
    //test submit
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="output"]').should('be.visible')
  });
  it("checks bad string data in email", ()=>{
    cy.get('[data-cy=email]')
    .type("asdf")
    .should("have.value","asdf")
    cy.get('[data-cy=emailError]')
    .should('be.visible')
  })

});
