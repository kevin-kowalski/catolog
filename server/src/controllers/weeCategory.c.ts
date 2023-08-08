import { Request, Response } from 'express';
import * as weeCategory from '../models/weeCategory.m';
import { findOneAndUpdateCategories } from '../models/weeObject.m';
import { Category } from '../types';

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
        message: 'Category is missing properties'
      });
      return;
    }

    // Ensure that the category does not already exist
    const existingCategory = await weeCategory.getOne(category.title);
    console.log(existingCategory);
    console.log(existingCategory.length);

    if (existingCategory.length > 0) {
      res.status(400);
      res.send({
        message: 'Category already exists'
      });
      return;
    }

    // If no models exist in the category, add an empty
    // array as the value of the models property
    if (!category.models) {
      category.models = [];
    }

    // Else if it includes a non-empty models array,
    // loop through the array, and update each model’s
    // categories array
    else if (category.models.length > 0) {
      updateCategoriesOfModels(category);
    }

    // Create category in database using the
    // weeCategory model’s postOne function
    const dbResponse = await weeCategory.postOne(category);

    // Send the response from the database
    res.send(dbResponse);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
};

/**
 * Helper function
 */

// Update all models’ categories array, using the model
// model’s findOneAndUpdateCategories function
function updateCategoriesOfModels (category: Category) {
  for (let modelId of category.models) {
    findOneAndUpdateCategories(modelId, category.title);
  }
};