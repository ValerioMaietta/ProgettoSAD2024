// cypress/integration/user-service.spec.js

describe('API /api/users', () => {
    let authToken = null; // Token JWT da aggiungere
  
    before(() => {
      // Esegui una chiamata per ottenere un token JWT valido
      cy.request({
        method: 'POST',
        url: 'http://localhost:8090/api/auth/login', // Assumi che ci sia un endpoint per il login che restituisce un token JWT
        body: {
          username: 'user-test',
          password: 'grupposad',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        authToken = response.body.token; // Salva il token JWT per usarlo nelle richieste successive
      });
    });
  
    it('should return a list of users', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:10000/api/users',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Includi il token JWT nelle intestazioni Authorization
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length.greaterThan(0);
        expect(response.body[0]).to.have.property('username');

              // Stampare la lista di utenti nel terminale di Cypress
            Cypress.log({
              name: 'Users List',
              consoleProps() {
                // Questo oggetto verrà visualizzato nel log di Cypress
                return {
                  'Number of users': response.body.length,
                  'All users': response.body,
                };
              },
            });
             // Utilizzo di console.log per stampare le informazioni nel terminale
                console.log('Number of users:', response.body.length);
                console.log('First user:', response.body[0]);
                console.log('All users:', response.body);
      });
    });
  });
  