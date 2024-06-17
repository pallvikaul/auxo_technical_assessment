describe('template spec',()=>{
	it('passes', () => {
	cy.loginAsAdmin();
	    
// Navigate to the customer list view
    cy.visit('https://dev.workshop.auxosoftware.com/contacts/customers');
	
	
 // Verify that at least one customer is displayed
    cy.get('.customer-list-item').should('have.length.greaterThan', 0);
	
	
// Verify the customer list contains required columns
    cy.get('.customer-list-header').within(() => {
      cy.contains('Customer Name');
      cy.contains('Phone Number');
      cy.contains('Email Address');
      cy.contains('Physical Address');
      cy.contains('Terms of Payment');
    });
});
});