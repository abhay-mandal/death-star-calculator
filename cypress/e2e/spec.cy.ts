// describe('My First Test', () => {
//   it('Visits the initial project page', () => {
//     cy.visit('/')
//     cy.contains('app is running!')
//   })
// })

describe('YourComponent', () => {
  it('should confirm potential rebel enemy', () => {
    // Visit the component's page
    cy.visit('/potential-rebel-enemies');

    // Simulate a calculated total volume
    const totalVolume = 1000;
    cy.get('.total-volume').type(totalVolume.toString());

    // Click the confirm button
    cy.get('.confirm-enemy').click();

    // Check if the potential enemy data is set and redirected to the dashboard
    cy.url().should('include', '/dashboard');
    cy.window().then((win) => {
      const potentialEnemyData = win.sessionStorage.getItem('ptentialEnemy');
      expect(potentialEnemyData).to.equal(JSON.stringify({ names: 'potentialEnemiesName', volume: totalVolume }));
    });
  });


});
