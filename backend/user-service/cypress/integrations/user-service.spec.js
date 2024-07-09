describe('API /api/users', () => {
  let authToken = null;

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

  it('Dovrebbe ritornare una lista di utenti', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:10000/api/users',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length.greaterThan(0);
      expect(response.body[0]).to.have.property('username');
//per visualizzare la lista di utenti guardalo da npx cypress open, dalla gui del browser
      cy.log('Number of users: ' + response.body.length);
      cy.log('First user: ' + JSON.stringify(response.body[0]));
      cy.log('All users: ' + JSON.stringify(response.body));

      console.log('Number of users:', response.body.length);
      console.log('First user:', response.body[0]);
      console.log('All users:', response.body);
    });
  });
});
