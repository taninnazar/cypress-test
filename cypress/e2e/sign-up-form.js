describe('Sign up form', () => {

    beforeEach(() =>{
        cy.visitSignUpPage('fox', 'foxyfoxy');
    })

    it('can login and visit sign up page', () => {
        cy.url().should('eq', 'https://foxsso.foxstone.ch/en/signup');
    });

    it('can change language', () => {
        cy.contains('Français').click();
        cy.url().should('eq', 'https://foxsso.foxstone.ch/fr/signup');
        cy.get('.header').should('have.text', 'Inscription');
        cy.get('.head').should('have.text', 'Rejoignez une communauté de plus de 7000+ investisseurs');

        cy.contains('English').click();
        cy.url().should('eq', 'https://foxsso.foxstone.ch/en/signup');
        cy.get('.header').should('have.text', 'Sign up');
        cy.get('.head').should('have.text', 'Join a growing community of 7000+ crowdfunders');
    });

    it('can display required inputs as invalid if leave them empty an click NEXT', () => {
        cy.get('.btn').click();
        cy.get('#myinput2').should('have.class', 'ng-invalid');
        cy.get('#myinput3').should('have.class', 'ng-invalid');
        cy.get('#myinput4').should('have.class', 'ng-invalid');
        cy.get('input[formcontrolname="acceptTerms"]').should('have.class', 'ng-invalid');
    });

    it('can sign up', () => {
        cy.get('#myinput2').type('Nazar');
        cy.get('#myinput3').type('Tanin');
        cy.get('#myinput4').type('ntanin@ukr.net');
        cy.get('#checkbox1 + label').click();
        cy.get('.btn').click();
        cy.url().should('eq', 'https://foxsso.foxstone.ch/en/swiss-citizen');
    });

    describe('English version', () => {

        it('can go to sign in page if click appropriate link', () => {
            cy.get('.text-center > a').click();
            cy.url().should('eq', 'https://foxsso.foxstone.ch/en/signin');
            cy.get('.header').should('have.text', 'Log in');
        });

        it('can contain correct links for General Terms & Conditions, Data Privacy and Risk Factors on English version', () => {
            cy.contains('General Terms & Conditions').invoke('attr', 'href').then(href => {
                expect(href).to.equal('https://www.foxstone.ch/en/general-terms-and-conditions/');
            });
            cy.contains('Data Privacy Policy').invoke('attr', 'href').then(href => {
                expect(href).to.equal('https://www.foxstone.ch/en/data-privacy-protection/');
            });
            cy.contains('Risk Factors').invoke('attr', 'href').then(href => {
                expect(href).to.equal('https://www.foxstone.ch/en/risk-factors/');
            });
        });

        it('can display correct error messages for first name input', () => {
            cy.get('#myinput2').focus().blur();
            cy.get('#myinput2+ div div:not(.hidden).invalid-popover div')
                .should('be.visible')
                .and('have.text', 'What’s your first name?');
            cy.get('#myinput2').type('a').blur();
            cy.get('#myinput2+ div div:not(.hidden).invalid-popover div')
                .should('be.visible')
                .and('have.text', 'First Name must be at least 2 characters long.');
        });

        it('can display correct error messages for last name input', () => {
            cy.get('#myinput3').focus().blur();
            cy.get('#myinput3+ div div:not(.hidden).invalid-popover div')
                .should('be.visible')
                .and('have.text', 'What’s your last name?');
            cy.get('#myinput3').type('a').blur();
            cy.get('#myinput3+ div div:not(.hidden).invalid-popover div')
                .should('be.visible')
                .and('have.text', 'Last Name must be at least 2 characters long.');
        });

        it('can display correct error messages for email input', () => {
            // cy.get('#myinput4').focus().blur();
            // cy.get('#myinput4+ div div:not(.hidden).invalid-popover div').should('be.visible');
            cy.get('#myinput4').type('a').blur();
            cy.get('#myinput4+ div div:not(.hidden).invalid-popover div')
                .should('be.visible')
                .and('have.text', 'You need to enter a valid email.');
        });
    });

    describe('French version', () => {

        beforeEach(() => {
            cy.contains('Français').click();
        });

        it('can go to sign in page if click appropriate link', () => {
            cy.get('.text-center > a').click();
            cy.url().should('eq', 'https://foxsso.foxstone.ch/fr/signin');
            cy.get('.header').should('have.text', 'Connexion');
        });

        it('can contain correct links for General Terms & Conditions, Data Privacy and Risk Factors on French version', () => {
            cy.contains('Conditions Générales').invoke('attr', 'href').then(href => {
                expect(href).to.equal('https://www.foxstone.ch/conditions-generales/');
            });
            cy.contains('Politique de Confidentialité').invoke('attr', 'href').then(href => {
                expect(href).to.equal('https://www.foxstone.ch/politique-de-confidentialite/');
            });
            cy.contains('Facteurs de Risque').invoke('attr', 'href').then(href => {
                expect(href).to.equal('https://www.foxstone.ch/facteurs-de-risque/');
            });
        });

        it('can display correct error messages for first name input', () => {
            cy.get('#myinput2').focus().blur();
            cy.get('#myinput2+ div div:not(.hidden).invalid-popover div')
                .should('be.visible')
                .and('have.text', 'Quel est votre prénom?');
            cy.get('#myinput2').type('a').blur();
            cy.get('#myinput2+ div div:not(.hidden).invalid-popover div')
                .should('be.visible')
                .and('have.text', 'Le prenom doit avoir au minimum 2 charactères');
        });

        it('can display correct error messages for last name input', () => {
            cy.get('#myinput3').focus().blur();
            cy.get('#myinput3+ div div:not(.hidden).invalid-popover div')
                .should('be.visible')
                .and('have.text', 'Quel est votre nom de famille?');
            cy.get('#myinput3').type('a').blur();
            cy.get('#myinput3+ div div:not(.hidden).invalid-popover div')
                .should('be.visible')
                .and('have.text', 'Le nom de famille doit avoir au minimum 2 charactères');
        });

        it('can display correct error messages for email input', () => {
            // cy.get('#myinput4').focus().blur();
            // cy.get('#myinput4+ div div:not(.hidden).invalid-popover div').should('be.visible')
            cy.get('#myinput4').type('a').blur();
            cy.get('#myinput4+ div div:not(.hidden).invalid-popover div')
                .should('be.visible')
                .and('have.text', 'L\'adresse e-mail doit être valide.');
        });
    });
});
