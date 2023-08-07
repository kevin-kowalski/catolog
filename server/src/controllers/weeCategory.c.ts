import { Request, Response } from 'express';
import * as weeCategory from '../models/weeCategory.m';

/**
 * Controller function for retrieving all categories.
 */
export async function getAll(req: Request, res: Response) {
  try {
    // Retrieve all categories using the weeCategory model's getAll function
    const allWeeCategories = await weeCategory.getAll();

    // Send all retrieved categories as the response
    res.send(allWeeCategories);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
};

/**
 * Controller function for posting one category.
 */
export async function postOne (req: Request, res: Response) {
  try {
    const category = req.body;

    // Ensure all required properties were given
    if (!category.title) {
      res.status(400);
      res.send({
        error: true,
        message: 'Object is missing properties'
      });
    }

    // Create category in database using the weeCategory model’s postOne function
    const dbResponse = await weeCategory.postOne(category);

    // Send the response from the database
    res.send(dbResponse);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
};
