// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginAsAdmin',()=>{
    cy.visit('https://dev.workshop.auxosoftware.com.',);
	cy.get('input[name="username"]').type('ccc0@auxosoftware.com');
	cy.get('input[name="password"]').type('Qwerty@12');
	// Intercept the initial login request to handle the OAuth flow
  cy.intercept('POST', 'u/login*').as('loginRequest');
	cy.get('button[type="submit"]').click();

  
 
  // Debugging: Check if the login request is actually being made
  cy.wait(500); // Small delay to allow the request to be made
  cy.get('@loginRequest.all').then((interceptions) => {
    if (interceptions.length === 0) {
      throw new Error('Login request was not intercepted');
    }
  });

  // Wait for the login request to complete
  cy.wait('@loginRequest');

  // Wait for the redirection to the external authentication service and back
  cy.url().should('include', 'https://dev.auth.auxosoftware.com');

cy.wait(20000);

  // Ensure we are redirected to the dashboard
  cy.url().should('include', '/dashboard');
});

	