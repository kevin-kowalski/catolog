import { Request, Response } from 'express';
import * as weeObjects from '../models/weeObject.m';

/**
 * Controller function for retrieving a single object by its id.
 * It expects the object id to be provided as a request parameter.
 */
export async function getObject(req: Request, res: Response) {
  try {
    // Retrieve the object’s id from the parameters
    const objectId = req.params.id;

    // Check if the object id is provided
    if (!objectId) {
      res.status(400);
      res.send('No object id provided in data.');
    }

    // Retrieve the specific object using the weeObjects model's getOne function
    const weeObject = await weeObjects.getOne(objectId);

    // Send the retrieved object as the response
    res.send(weeObject);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
};

/**
 * Controller function for retrieving objects belonging to a specific category.
 * It expects the category name to be provided as a request parameter.
 */
export async function getCategory(req: Request, res: Response) {
  try {
    // Retrieve the category’s name from the parameters
    const categoryName = req.params.category;

    // Check if the category name is provided
    if (!categoryName) {
      res.status(400);
      res.send('No category name provided in data.');
    }

    // Retrieve objects belonging to the specified category using the weeObjects model's getCategory function
    const categoryObjects = await weeObjects.getCategory(categoryName);

    // Send the retrieved objects as the response
    res.send(categoryObjects);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
};

/**
 * Controller function for retrieving all objects.
 */
export async function getAll(req: Request, res: Response) {
  try {
    // Retrieve all objects using the weeObjects model's getAll function
    const allWeeObjects = await weeObjects.getAll();

    // Send all retrieved objects as the response
    res.send(allWeeObjects);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
};
