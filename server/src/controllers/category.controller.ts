import { Request, Response } from 'express';
import * as category from '../models/category.model';
import { findOneAndUpdateCategories } from '../models/object.model';
import { CategoryType } from '../types';

/**
 * Controller function for retrieving all categories.
 */
export async function getAll(req: Request, res: Response) {
  try {
    // Retrieve all categories using the Category model's getAll function
    const allCategories = await category.getAll();

    // Send all retrieved categories as the response
    res.send(allCategories);
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
    const existingCategory = await category.getOne(category.title);

    if (existingCategory) {
      res.status(400);
      res.send({
        message: 'Category already exists'
      });
      return;
    }

    // If the models property is undefined,
    // set its value to an empty array
    if (!category.models) {
      category.models = [];
    }

    // Else if the models property was given,
    // loop through the array, and update each model’s
    // categories array
    else if (category.models.length > 0) {
      updateCategoriesOfModels(category);
    }

    // Create category in database using the
    // Category model’s postOne function
    const dbResponse = await category.postOne(category);

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
function updateCategoriesOfModels (category: CategoryType) {
  for (let modelId of category.models) {
    findOneAndUpdateCategories(modelId, category.title);
  }
};