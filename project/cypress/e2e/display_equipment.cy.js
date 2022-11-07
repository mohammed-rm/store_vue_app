describe('Displaying equipment page using admin or borrower account', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('admindev@gmail.com')
        cy.get('#password1').type('admindev')
        cy.get('#connection-button').click()

        // create new equipment for the test
        cy.get('#myModal').should('be.visible').click()
        cy.get('#new-material-name').type('test_fake_phone')
        cy.get('#new-material-tel').type('0632895410')
        cy.get('#new-material-version').type('V1523')
        cy.get('#ref-select').select('apple')
        cy.get('#create-eq').click()
    });

    afterEach(() => {
        // login as admin to delete the equipment created for the test
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('admindev@gmail.com')
        cy.get('#password1').type('admindev')
        cy.get('#connection-button').click()

        // delete the equipment
        cy.contains('tr', 'test_fake_phone')
            .invoke('index')
            .then((index) => {
                cy.get(`#delete_${index}`).should('be.visible').click()
            })
    });

    it('should display equipment info when on clicking on a specific equipment with admin account', function () {
        cy.get('#eq-list').contains('td', 'test_fake_phone').click()
        cy.contains('Statut : Disponible').should('be.visible')
        cy.contains('Téléphone : test_fake_phone').should('be.visible')
        cy.contains('Version : V1523').should('be.visible')
        cy.contains('N° Téléphone : +33 (0)632895410').should('be.visible')
        cy.contains('Réserver maintenant').should('be.visible')
        cy.contains('Edit').should('be.visible')

    });

    it('should display equipment info when on clicking on a specific equipment with borrower', function () {
        // login with borrower account
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('usertest@gmail.com')
        cy.get('#password1').type('usertest')
        cy.get('#connection-button').click()

        cy.get('#eq-list').contains('td', 'test_fake_phone').click()
        cy.contains('Statut : Disponible').should('be.visible')
        cy.contains('Téléphone : test_fake_phone').should('be.visible')
        cy.contains('Version : V1523').should('be.visible')
        cy.contains('N° Téléphone : +33 (0)632895410').should('be.visible')
        cy.contains('Réserver maintenant').should('be.visible')
        cy.contains('Edit').should('be.visible')

    });
})






