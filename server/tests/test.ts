import request from 'supertest';
import app from '../src/index';
import mongoose from 'mongoose';
import * as objectModelFunctions from '../src/models/object.model';
import * as categoryModelFunctions from '../src/models/category.model';
import * as userModelFunctions from '../src/models/user.model';

import { mockObjectData, mockObjectsData, mockCategories, mockObject, mockCategory, mockUserController, mockUsers, mockUserModel} from './mocks';
import { Category } from '../src/models/category.schema';
import { WObject } from '../src/models/object.schema';
import { User } from '../src/models/user.schema';


afterAll(async () => {
  mongoose.disconnect();
});

describe('Server', () => {

  it('should return 404, when accessing an unknown endpoint', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });

  it('should return 200, when accessing /models endpoint', async () => {
    const response = await request(app).get('/models');
    expect(response.statusCode).toBe(200);
  });

});

describe('Test database connection', () => {

  it('should establish a connection to the MongoDB database', () => {
    expect(mongoose.connection.readyState).toBe(1);
  });

});

describe('Database', () => {

  afterAll(async () => {
    await WObject.deleteOne({ title: 'Default Test Cube' });
    await WObject.deleteMany({ category: 'Dog'});
    await WObject.deleteMany({ category: 'Duck'});
  });

  it('should add object to database without errors', async () => {
    try {
      const mockWeeObject = new WObject(mockObjectData);
      await mockWeeObject.save();
    } catch (err) {
      throw err;
    }
  });

  it('should retrieve an object from database without errors', async () => {
    try {
      const weeObject = await WObject.findOne({ title: mockObjectData.title });
      expect(weeObject).toBeDefined();
      expect(weeObject?.title).toBe(mockObjectData.title);
    } catch (err) {
      throw err;
    }
  });

  it('should retrieve only objects of specific category', async () => {
    try {
      await WObject.insertMany(mockObjectsData);
      const dogWeeObjects = await WObject.find({ category: 'Dog' });
      expect(dogWeeObjects.every((object) => object.categories.includes('Dog'))).toBe(true);
    } catch (err) {
      throw err;
    }
  });

});

describe('Model', () => {

  beforeAll(async () => {
    await WObject.insertMany(mockObjectsData);
    await Category.insertMany(mockCategories);
    await User.insertMany(mockUsers);
  });

  afterAll(async () => {
    await WObject.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();
  });

  describe('Objects', () => {
  
    it('should retrieve all objects belonging to a specific category', async () => {
      try {
        const weeObjects = await objectModelFunctions.getByCategory(mockObjectsData[0].category[0]);
        expect(weeObjects).toBeDefined();
        expect(weeObjects!.every((object) => object.categories.includes(mockObjectsData[0].category[0]))).toBe(true);
      } catch (err) {
        throw err;
      }
    });

    it('should retrieve all objects, and return them as an array', async () => {
      try {
        const weeObjects = await objectModelFunctions.getAll();
        expect(weeObjects).toBeDefined();
        expect(Array.isArray(weeObjects)).toBe(true);
      } catch (err) {
        console.log(err);
      }
    });

    it('should post one object and return it', async () => {
      try{
        const response = await objectModelFunctions.postOne(mockObject);
        expect(response).toBeDefined();
        expect(response.title).toBe(mockObject.title);
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe('Categories', () => {

    it('should retrieve all categories, and return them as an array', async () => {
      try {
        const weeCategories = await categoryModelFunctions.getAll();
        expect(weeCategories).toBeDefined();
        expect(Array.isArray(weeCategories)).toBe(true);
        weeCategories!.map((object, index) => expect(object.title).toBe(mockCategories[index].title));
      } catch (err) {
        throw err;
      }
    });


    it('should retrieve one category by name and return it ',async () => {
      try {
        const response = await categoryModelFunctions.getOne(mockCategories[0].title);
        expect(response).toBeDefined();
        expect(response.title).toBe(mockCategories[0].title);
      } catch (err) {
        console.log(err);
      }
    });

    it('should post one category and return it', async () => {
      try{
        const response = await categoryModelFunctions.postOne(mockCategory);
        expect(response).toBeDefined();
        expect(response.title).toBe(mockObject.title);
      } catch (err) {
        console.log(err);
      }
    });

    it('should find ones category by its title, update its models array and return it', async() => {
      const response = await categoryModelFunctions.findOneAndUpdateModelIds(mockCategory.title, '230');
      expect(response).toBeDefined();
      expect(response.title).toBe(mockCategory.title);
    });
  });

  describe('Users', () => {

    it('should find a user by email', async() => {
      const response = await userModelFunctions.findUserByEmail(mockUsers[1].email);
      expect(response).toBeDefined();
      expect(response.email).toBe(mockUsers[1].email);
    });

    it('should be able to create a user', async() => {
      const response = await userModelFunctions.createUser(mockUserModel.email, mockUserModel.password);
      expect(response).toBeDefined();
      expect(response.email).toBe(mockUserModel.email);
    });
  });

});

describe('Router, Controller', () => {

  beforeAll(async () => {
    await WObject.insertMany(mockObjectsData);
    await Category.insertMany(mockCategories);
    await User.insertMany(mockUsers);
  });

  afterAll(async () => {
    await WObject.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();
  });

  describe('Models', () => {

    describe('GET', () => {
      it('should get all models, and respond with 200 and array', async () => {
        try {
          const response = await request(app).get('/models')
          expect(response.statusCode).toBe(200);
          expect(response.body).toBeInstanceOf(Array);
        } catch(err) {
          throw(err);
        }
      });

      it('should get one model, and respond with 200 and object', async () => {
        try {
          const response = await request(app).get('/models/' + mockObjectsData[0].title);
          expect(response.statusCode).toBe(200);
          expect(typeof response.body).toBe('object');
        } catch(err) {
          throw(err);
        }
      });

      it('should get all models of specified category, and respond with 200 and array', async () => {
        try {
          const response = await request(app).get('/models/category/' + mockObjectsData[0].category);
          expect(response.statusCode).toBe(200);
          expect(response.body).toBeInstanceOf(Array);
        } catch(err) {
          throw(err);
        }
      });
    });

    describe('POST', () => {
      it('should post one model, and respond with 200 and model', async () => {
        try {
          const response = await request(app).post('/model').send(mockObject);
          expect(response.statusCode).toBe(200);
          expect(typeof response.body).toBe('object');
          expect(response.body.title).toBe(mockObject.title);
        } catch (err) {
          throw(err);
        }
      });
    });

  });

  describe('Categories', () => {

    describe('GET', () => {
      it('should get all categories, and respond with 200 and array', async () => {
        try {
          const response = await request(app).get('/categories');
          expect(response.statusCode).toBe(200);
          expect(response.body).toBeInstanceOf(Array);
        } catch(err) {
          throw(err);
        }
      });
    });

    describe('POST', () => {
      it('should post one category, and respond with 200 and category', async () => {
        const response = await request(app).post('/category').send(mockCategory);
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(response.body.title).toBe(mockCategory.title);
      });
    });

  });

  describe('Users', () => {

    describe('POST', () => {
      it('should register a user, and respond with 201 and a message, as well as the userData', async () => {
        try {
          const response = await request(app).post('/register').send(mockUserController);
          expect(response.statusCode).toBe(201);
        } catch(err) {
          throw(err);
        }
      });

      it('should login a user, and respond with 200 and a message, as well as the userData', async () => {
        try {
          const response = await request(app).post('/login').send(mockUserController);
          expect(response.statusCode).toBe(200);
        } catch(err) {
          throw(err);
        }
      });
    });

  });

});
