import WeeObject from './weeObjectSchema.m';

/**
 * Retrieves a single object based on its name, and returns it.
 */
export const getOne = async (title: string) => {
  try {
    // Find a WeeObject with a title that matches the provided name (case-insensitive)
    const weeObject = await WeeObject.findOne({
      title: { $regex: title, $options: 'i' },
    });

    // If no object is found, throw an error
    if (!weeObject) throw new Error('No object found');

    // Return the retrieved object
    return weeObject;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Retrieves objects belonging to a specific category,
 * and returns them as an array
 */
export const getCategory = async (name: string) => {
  try {
    // Find WeeObjects with a category that matches the provided name (case-insensitive)
    const categoryObjects = await WeeObject.find({
      category: { $regex: name, $options: 'i' },
    }).exec();

    // If no objects are found, throw an error
    if (!categoryObjects) throw new Error('No objects found');

    // Return the retrieved objects
    return categoryObjects;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Retrieves all objects, and returns them as an array
 */
export const getAll = async () => {
  try {
    // Find all WeeObjects
    const allObjects = await WeeObject.find({});

    // If no objects are found, throw an error
    if (!allObjects) throw new Error('No objects found');

    // Return all retrieved objects
    return allObjects;
  } catch (err) {
    console.error(err);
  }
};