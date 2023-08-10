import { ObjectType } from '../types';
import { WObject, WObjectDocument } from './object.schema';

/* Retrieves all objects, and returns them as an array */
export const getAll = async (): Promise<WObjectDocument[] | null> => {
  try {
    // Find all Objects
    const allObjects = await WObject.find({});

    // If no objects are found, throw an error
    if (!allObjects) console.log('No objects found');

    // Return all retrieved objects
    return allObjects;
  } catch (err) {
    console.log(err);
  }
};

/* Retrieves a single object based on its name, and returns it. */
export const getOne = async (id: string): Promise<WObjectDocument | null> => {
  try {
    // Find a Object with a title that matches the provided name (case-insensitive)
    const object = await WObject.findOne({
      _id: id
    });

    // If no object is found, throw an error
    if (!object) console.log('No object found');

    // Return the retrieved object
    return object;
  } catch (err) {
    console.log(err);
  }
};

/* Retrieves objects belonging to a specific category,
 * and returns them as an array */
export const getByCategory = async (categoryName: string): Promise<WObjectDocument[] | null> => {
  try {
    // Find Objects with a category that matches the provided name (case-insensitive)
    const categoryObjects = await WObject.find({
      categories: { $regex: new RegExp(categoryName, 'i') }
    });

    // If no objects are found, throw an error
    if (!categoryObjects) throw new Error('No objects found');

    // Return the retrieved objects
    return categoryObjects;
  } catch (err) {
    console.log(err);
  }
};

/* Creates one object, and returns it */
export const postOne = async (object: ObjectType): Promise<WObjectDocument | null> => {
  try {
    const response = await WObject.create(object);
    return response;
  } catch (err) {
    console.log(err);
  }
};

/* Finds one object by its title,
 * updates its categories array, and returns it */
export const findOneAndUpdateCategories = async (id: string, category: string): Promise<WObjectDocument | null> => {
  try {
    const modelData = await getOne(id);

    if (!modelData) {
      return null;
    }

    const filter = { _id: id };
    const update = { categories: [...modelData.categories, category] };
    const response = await WObject.findOneAndUpdate(filter, update);
    return response;
  } catch (err) {
    console.log(err);
  }
};

/* Deletes one object, and returns it */
export async function deleteOne (id: string) {
  try {
    const response = await WObject.deleteOne({
      _id: id
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};