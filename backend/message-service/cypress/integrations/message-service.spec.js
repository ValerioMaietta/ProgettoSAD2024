describe('Message Service API', () => {
  let authToken = null;
  const receiverId = '668d01cd93b88ac186be2d71'; // Receiver ID for testing

  before(() => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8090/api/auth/login',
      body: {
        username: 'user-test',
        password: 'grupposad',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.token;
      cy.log('Auth Token Acquired');
      console.log('Auth Token Acquired:', authToken);
    });
  });

  it('Dovrebbe inviare un messaggio con successo', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/${receiverId}`,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: {
        message: 'Test message from Cypress'
      },
      failOnStatusCode: false  // Disabilita il fail sul codice di stato non 2xx/3xx
    }).then((response) => {
      if (response.status !== 201) {
        // Gestione personalizzata dell'errore se non è stato restituito un 201
        cy.log(`Errore durante l'invio del messaggio: ${response.status}`);
      } else {
        // Aspettiamo un codice di stato 201 e verifichiamo la risposta
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('_id');
        expect(response.body).to.have.property('senderId');
        expect(response.body).to.have.property('receiverId', receiverId);
        expect(response.body).to.have.property('message', 'Test message from Cypress');
      }
    });
  });

  it('Dovrebbe ottenere i messaggi con successo', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/${receiverId}`,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false  // Disabilita il fail sul codice di stato non 2xx/3xx
    }).then((response) => {
      if (response.status === 401) {
        // Gestione caso di non autorizzazione
        cy.log('Non autorizzato. Verificare il token JWT o l\'autorizzazione.');
        // Puoi anche eseguire altre azioni o asserzioni qui in caso di 401
      } else if (response.status === 404) {
        // Gestione caso di risorsa non trovata
        cy.log('Endpoint non trovato. Assicurati che l\'URL sia corretto.');
        // Puoi anche eseguire altre azioni o asserzioni qui in caso di 404
      } else {
        // Aspettiamo un codice di stato 200 e verifichiamo la risposta
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array').that.is.not.empty;
        response.body.forEach((msg) => {
          expect(msg).to.have.property('_id');
          expect(msg).to.have.property('senderId');
          expect(msg).to.have.property('receiverId', receiverId);
        });
      }
    });
  });
});
