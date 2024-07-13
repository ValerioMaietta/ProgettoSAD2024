// cypress/authentication-service.spec.js
describe('Authentication Service API', () => {
  
    it('Devo registrare un nuovo utente con successo', () => {
      cy.request('POST', `${Cypress.env('apiBaseUrl')}/signup`, {
        fullName: 'Test User',
        username: 'testuser',
        password: 'password123',
        confirmPassword: 'password123',
        gender: 'male'
      }).then((response) => {
        expect(response.status).to.eq(201); //201 - Created: significa che la richiesta ha avuto successo e il server ha creato una nuova risorsa
        expect(response.body).to.have.property('_id');
        expect(response.body).to.have.property('username', 'testuser');
        expect(response.body).to.have.property('fullName', 'Test User');
      });
    });
  
    it('Da utente registrato voglio poter loggare con successo', () => {
      cy.request('POST', `${Cypress.env('apiBaseUrl')}/login`, {
        username: 'testuser',
        password: 'password123'
      }).then((response) => {
        expect(response.status).to.eq(200); //Codice di stato 200: OK.
        expect(response.body).to.have.property('_id'); //verifica che il corpo della risposta (response.body) contenga una proprietà chiamata _id.
        expect(response.body).to.have.property('username', 'testuser'); //verifica che il corpo della risposta (response.body) contenga una proprietà chiamata username.
      });
    });
  
    it('Voglio poter effettuare un log out con successo', () => {
      cy.request('POST', `${Cypress.env('apiBaseUrl')}/logout`, {
        username: 'testuser',
        password: 'password123'
      }).then(() => {
        cy.request('POST', `${Cypress.env('apiBaseUrl')}/logout`).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('message', 'Logged out successfully');
        });
      });
    });
  
  });
  