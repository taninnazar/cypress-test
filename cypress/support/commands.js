Cypress.Commands.add("visitSignUpPage", (login, password) => {
    cy.visit('https://foxsso.foxstone.ch/en/signup', {
        auth: {
            username: login,
            password: password
        }
    });
});
