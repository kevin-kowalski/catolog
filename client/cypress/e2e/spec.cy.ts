import defaultObjects from '../fixtures/objects.json';


describe('Registration', () => {

  it('should register', () => {
    cy.visit('localhost:5173/register');
    cy.get('input[type="email"]').type('your@username10.com');
    cy.get('input[type="password"]').type('your-password');
    cy.get('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/register');
  });

});

describe('Login', () => {

  it('should login with valid credentials', () => {
    cy.visit('localhost:5173/login');
    cy.get('input[type="email"]').type('your@username10.com');
    cy.get('input[type="password"]').type('your-password');
    cy.get('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/');
  });

});

describe('Api-Service', () => {

  it('should load all the models based on category', () => {
    cy.intercept({
    method: 'GET',
    url: '/models/category/*'
  }, (req) => {
    // Extract the category from the URL
    const category = req.url.split('/').pop();

    // Filter the fixture data based on the category
    const filteredData = defaultObjects.filter((object) => object.category === category);

    req.reply(filteredData); // Respond with the filtered data
  }).as('getCategory');
  })
  
  it('should load all the models', () => {
    cy.intercept({
    method: 'GET',
    url: '/models'
  }, (req) => {
    req.reply(defaultObjects); // Respond with the filtered data
  }).as('getAll');
  })
 
  it('should load all the categories', () => {
    cy.intercept({
    method: 'GET',
    url: '/categories'
  }, (req) => {
    req.reply(defaultObjects); // Respond with the filtered data
  }).as('getAll');
  });
  
})

describe('Load components', () => {

    it('the overview component should be visible', () => {
      cy.visit('localhost:5173/login');
      cy.get('input[type="email"]').type('your@username10.com');
      cy.get('input[type="password"]').type('your-password');
      cy.get('button[type="submit"]').click();
      cy.location('pathname').should('eq', '/');
        // Use cy.wait() to wait for any asynchronous operations that might affect the visibility of the element
      cy.wait(4000); // Adjust the wait time as needed
      cy.get('.header')
        .should('exist')
        .should('be.visible');
    });

    it('the secondary navigation component should be visible', () => {
      cy.visit('localhost:5173/login');
      cy.get('input[type="email"]').type('your@username10.com');
      cy.get('input[type="password"]').type('your-password');
      cy.get('button[type="submit"]').click();
      cy.location('pathname').should('eq', '/');
        // Use cy.wait() to wait for any asynchronous operations that might affect the visibility of the element
      cy.wait(4000); // Adjust the wait time as needed
      cy.get('.link-list')
        .should('exist')
        .should('be.visible');
    });
});


describe('Link Navigation', () => {

  it('should navigate to the category page after clicking on a category', () => {
    cy.visit('localhost:5173/login');
    cy.get('input[type="email"]').type('your@username10.com');
    cy.get('input[type="password"]').type('your-password');
    cy.get('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/');
    cy.wait(4000); 
    cy.get('.nav-item').contains('Geometry').click(); // Replace 'a' with the appropriate selector for your link
    cy.url().should('eq', 'http://localhost:5173/category/Geometry'); // Replace with the expected URL of the new page
  });

  it('should navigate to the single page after clicking on a model', () => {
    cy.visit('localhost:5173/login');
    cy.get('input[type="email"]').type('your@username10.com');
    cy.get('input[type="password"]').type('your-password');
    cy.get('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/');
    cy.wait(4000); 
    cy.get('.list a').eq(2).click(); // Replace 'a' with the appropriate selector for your link
    cy.get('.info-container .title').contains('Faceted Torus'); 
  });

});

describe('Button Functionality', () => {

  it('should open the modal component when the "add collection" button is clicked', () => {
    cy.visit('localhost:5173/login');
    cy.get('input[type="email"]').type('your@username10.com');
    cy.get('input[type="password"]').type('your-password');
    cy.get('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/');
    cy.wait(4000); 
    cy.get('.button.add-collection').contains('Add collection').click(); // Replace 'a' with the appropriate selector for your link
    cy.get('.button').contains('Next')
        .should('exist')
        .should('be.visible');
  });
  
  it('should open the modal component when the "add item" button is clicked', () => {
    cy.visit('localhost:5173/login');
    cy.get('input[type="email"]').type('your@username10.com');
    cy.get('input[type="password"]').type('your-password');
    cy.get('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/');
    cy.wait(4000); 
    cy.get('.button.add-item').contains('Add Item').click(); // Replace 'a' with the appropriate selector for your link
    cy.get('.button').contains('Create')
        .should('exist')
        .should('be.visible');
  });
});
