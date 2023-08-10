import { Request, Response } from 'express';
import * as objects from '../models/object.model';
import { ObjectType } from '../types';
import { findOneAndUpdateModelIds } from '../models/category.model';
import { WObject } from '../models/object.schema';
import { Category } from '../models/category.schema';

/* Controller function for retrieving a single object by its id.
 * It expects the object id to be provided as a request parameter. */
export async function getOne (req: Request, res: Response) {
  try {
    // Retrieve the object’s id from the parameters
    const objectId = req.params.id;

    // Check if the object id is provided
    if (!objectId) {
      res.status(400);
      res.send('No object id provided in data.');
    }

    // Retrieve the specific object using the Objects model's getOne function
    const object = await objects.getOne(objectId);

    // Send the retrieved object as the response
    res.send(object);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
};

/* Controller function for retrieving objects belonging to a specific category.
 * It expects the category name to be provided as a request parameter. */
export async function getByCategory (req: Request, res: Response) {
  try {
    // Retrieve the category’s name from the parameters
    const categoryName = req.params.category;

    // Check if the category name is provided
    if (!categoryName) {
      res.status(400);
      res.send('No category name provided in data.');
    }

    // Retrieve objects belonging to the specified category using the Objects model's getCategory function
    const categoryObjects = await objects.getByCategory(categoryName);

    // Send the retrieved objects as the response
    res.send(categoryObjects);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
};

/* Controller function for retrieving all objects. */
export async function getAll (req: Request, res: Response) {
  try {
    // Retrieve all objects using the Objects model's getAll function
    const allObjects = await objects.getAll();

    // Send all retrieved objects as the response
    res.send(allObjects);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
};

/* Controller function for posting one object. */
export async function postOne (req: Request, res: Response) {
  try {
    const object = req.body;

    // Ensure all required properties were given
    if (!object.title || !object.glb) {
      res.status(400);
      res.send({
        error: true,
        message: 'Object is missing properties'
      });
    }

    // If the categories property is undefined,
    // set its value to an empty array
    if (!object.categories) {
      object.categories = [];
    }

    // Create object in database using the objects model’s postOne function
    const dbResponse = await objects.postOne(object);

    // If the categories property was given,
    // and there is at least one category in it,
    // add the model’s id to all category’s models array
    if (object.categories.length > 0) {
      // Add the newly created document’s id to the object
      object._id = dbResponse._id;
      updateModelIdsOfCategories(object);
    }

    // Send the response from the database
    res.send(dbResponse);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
};

/* Helper function */

// Update all categories’ models array, using the model
// model’s findOneAndUpdateCategories function
function updateModelIdsOfCategories (object: ObjectType) {
  for (let categoryName of object.categories) {
    findOneAndUpdateModelIds(categoryName, object._id);
  }
}

/* Controller function for deleting one object. */
export async function deleteOneFromCategory(req: Request, res: Response) {
  try {
    const categoryId = req.params.categoryId;
    const objectId = req.params.objectId;

    // Find the respective category and remove the object from its models array
    const categoryResponse = await Category.findOneAndUpdate(
      { _id: categoryId },
      { $pull: { models: { $in: [objectId] } } }
    );
    
    // Find the categoryObject, in order to access its title
    let categoryObject = await Category.findOne({_id: categoryId}).exec();
    
    // Find the respective object and remove the category from its categories array
    const objectResponse = await WObject.findOneAndUpdate(
      { _id: objectId },
      { $pull: { categories: { $in: [categoryObject.title] } } }
    );

    res.status(200).json({ categoryResponse, objectResponse });
  } catch (err) {
    res.status(500).send(err);
  }
}

/* Controller function for deleting one object. */
export async function deleteOne (req: Request, res: Response) {
  try {
    const objectId  = req.params.id;
    // Filter Categories that have the model in models array
    // Remove the models from the models array 
    await Category.updateMany(
      { models: { $in: [objectId] }}, 
      { $pull: { models: objectId} } 
    );
    // Then continue with the original task and delete the object
    const response = await objects.deleteOne(objectId)
    res.status(200);
    res.send(response);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

