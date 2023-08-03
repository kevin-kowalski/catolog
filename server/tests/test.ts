import request from 'supertest';
import app from '../src/index';
// import { defaultObjects } from '../seeder/seedObjects';
import db from '../src/models/index.m';
import WeeObject from '../src/models/weeObjectSchema.m';
import * as modelFunctions from '../src/models/weeObject.m';

import { mockObjectData, mockObjectsData } from './mocks';

let dbData;

beforeAll(async () => {
  await db.mongoose.connect(db.url);
  // await WeeObject.deleteMany();
});

afterAll(async () => {
  // await WeeObject.insertMany(defaultObjects);
  await db.mongoose.connection.close();
});

describe('Server', () => {
  test('should return 404, when accessing an unknown endpoint', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });
  test('should return 200, when accessing /models endpoint', async () => {
    const response = await request(app).get('/models');
    expect(response.statusCode).toBe(200);
  })
});

describe('Test database connection', () => {
  test('should connect to the database', async () => {
    expect(db.mongoose.connection.readyState).toBe(1);
  });
});

describe('Database', () => {
  afterAll(async () => {
    await WeeObject.deleteOne({ title: 'Default Test Cube' });
    await WeeObject.deleteMany({ category: 'Dog'});
    await WeeObject.deleteMany({ category: 'Duck'});
  });

  test('should add object to database without errors', async () => {
    try {
      const mockWeeObject = new WeeObject(mockObjectData);
      await mockWeeObject.save();
    } catch (err) {
      throw err;
    }
  })

  test('should retrieve an object from database without errors', async () => {
    try {
      const weeObject = await WeeObject.findOne({ title: mockObjectData.title });
      expect(weeObject).toBeDefined();
      expect(weeObject?.title).toBe(mockObjectData.title);
    } catch (err) {
      throw err;
    }
  })

  test('should retrieve only objects of specific category', async () => {
    try {
      await WeeObject.insertMany(mockObjectsData);
      const dogWeeObjects = await WeeObject.find({ category: 'Dog' });
      expect(dogWeeObjects.every((object) => object.category === 'Dog')).toBe(true);
    } catch (err) {
      throw err;
    }
  })
});

describe('Model', () => {

  beforeAll(async () => {
    await WeeObject.insertMany(mockObjectsData);
  });

  afterAll(async () => {
    await WeeObject.deleteMany();
  });

  test('should retrieve a single object based on its name, and return it', async () => {
    try {
      const weeObject = await modelFunctions.getOne(mockObjectsData[0].title);
      expect(weeObject).toBeDefined();
      expect(weeObject!.title).toBe(mockObjectsData[0].title);
    } catch (err) {
      throw err;
    }
  });

  test('should retrieve all objects belonging to a specific category', async () => {
    try {
      const weeObjects = await modelFunctions.getCategory(mockObjectsData[0].category);
      expect(weeObjects).toBeDefined();
      expect(weeObjects!.every((object) => object.category === mockObjectsData[0].category)).toBe(true);
    } catch (err) {
      throw err;
    }
  });

  test('should retrieve all objects, and return them as an array', async () => {
    try {
      const weeObjects = await modelFunctions.getAll();
      expect(weeObjects).toBeDefined();
      expect(Array.isArray(weeObjects)).toBe(true);
      weeObjects!.map((object, index) => expect(object.title).toBe(mockObjectsData[index].title));
    } catch (err) {
      throw err;
    }
  });
});

describe('Router', () => {

})