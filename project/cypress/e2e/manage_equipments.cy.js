describe('Manage equipments', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('admindev@gmail.com')
        cy.get('#password1').type('admindev')
        cy.get('#connection-button').click()
        cy.url().should('include', '/')
    })

    it('should create a new equipment : admin account', function () {
        cy.get('#myModal').should('be.visible').click()
        cy.get('#new-material-name').type('test_fake_phone')
        cy.get('#new-material-tel').type('0632895410')
        cy.get('#new-material-version').type('V1523')
        cy.get('#ref-select').select('apple')
        cy.get('#create-eq').click()

        cy.get('#eq-list').contains('test_fake_phone')
        cy.get('#eq-list').contains('+33(0) 632895410')
        cy.get('#eq-list').contains('V1523')
        cy.get('#eq-list').contains('Pas d\'image.')
    });

    it('should not be able to create a new equipment : borrower account', function () {
        // login with borrower account
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('usertest@gmail.com')
        cy.get('#password1').type('usertest')
        cy.get('#connection-button').click()

        cy.get('#myModal').should('not.exist')
    });

    it('should display equipment info when on clicking on a specific equipment : admin account', function () {
        cy.get('#eq-list').contains('td', 'test_fake_phone').click()
        cy.contains('Statut : Disponible').should('be.visible')
        cy.contains('Téléphone : test_fake_phone').should('be.visible')
        cy.contains('Version : V1523').should('be.visible')
        cy.contains('N° Téléphone : +33 (0)632895410').should('be.visible')
        cy.contains('Réserver maintenant').should('be.visible')
        cy.contains('Edit').should('be.visible')

    });

    it('should display equipment info when on clicking on a specific equipment : borrower account', function () {
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

    it('should not be able to change equipment properties : borrower account', function () {
        // login with borrower account
        cy.visit('http://localhost:8080/login')
        cy.get('#email1').type('usertest@gmail.com')
        cy.get('#password1').type('usertest')
        cy.get('#connection-button').click()

        cy.get('#eq-list').contains('td', 'test_fake_phone').click()
        cy.contains('Edit').should('not.exist')
    });

    it('should change equipment properties : admin account', function () {
        // edit equipment
        cy.get('#eq-list').contains('td', 'test_fake_phone').click()
        cy.contains('Edit').should('be.visible').click()

        // remove actual inputs
        cy.get('#input-field-name').clear()
        cy.get('#input-field-name').type("new_name")

        cy.get('#input-field-ref').clear()
        cy.get('#input-field-ref').type("AP100")

        cy.get('#input-field-version').clear()
        cy.get('#input-field-version').type("V2000")

        cy.get('#input-field-tel').clear()
        cy.get('#input-field-tel').type("0765894352")

        // update equipment properties
        cy.contains("Save").should("exist").click()

        // check the new changes
        cy.contains('Statut : Disponible').should('be.visible')
        cy.contains('Téléphone : new_name').should('be.visible')
        cy.contains('Référence : AP100').should('be.visible')
        cy.contains('Version : V2000').should('be.visible')
        cy.contains('N° Téléphone : +33 (0)765894352').should('be.visible')

    });

    it('should delete equipment : admin account', function () {
        cy.contains('tr', 'new_name')
            .invoke('index')
            .then((index) => {
                cy.get(`#delete_${index}`).should('be.visible').click()
            })
    });

})
