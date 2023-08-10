import { Request, Response } from 'express';
import * as category from '../models/category.model';
import { findOneAndUpdateCategories } from '../models/object.model';
import { CategoryType } from '../types';
import { Model } from 'mongoose';
import { WObject } from '../models/object.schema';
import { Category } from '../models/category.schema';

/* Controller function for retrieving all categories. */
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

/* Controller function for posting one category. */
export async function postOne (req: Request, res: Response) {
  try {
    const categoryData = req.body;

    // Ensure all required properties were given
    if (!categoryData.title) {
      res.status(400);
      res.send({
        message: 'Category is missing properties'
      });
      return;
    }

    // Ensure that the category does not already exist
    const existingCategory = await category.getOne(categoryData.title);

    if (existingCategory) {
      res.status(400);
      res.send({
        message: 'Category already exists'
      });
      return;
    }

    // If the models property is undefined,
    // set its value to an empty array
    if (!categoryData.models) {
      categoryData.models = [];
    }

    // Else if the models property was given,
    // loop through the array, and update each model’s
    // categories array
    else if (categoryData.models.length > 0) {
      const response = updateCategoriesOfModels(categoryData);
      if (!response) {
        res.status(400);
        res.send({
          message: 'One or more models were not found'
        });
        return;
      }
    }

    // Create category in database using the
    // Category model’s postOne function
    const dbResponse = await category.postOne(categoryData);

    // Send the response from the database
    res.send(dbResponse);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
};

/* Helper function */

// Update all models’ categories array, using the "object"
// model’s findOneAndUpdateCategories function
function updateCategoriesOfModels (category: CategoryType): boolean | null {
  for (let modelId of category.models) {
    const dbResponse = findOneAndUpdateCategories(modelId, category.title);
    if (!dbResponse) {
      return null;
    }
  }
  return true;
};

/* Controller function for deleting one category. */
export async function deleteOne (req: Request, res: Response) {
  try {
    const categoryId  = req.params.id;
    // Find out the category name with a database query
    let categoryObject = await Category.findOne({_id: categoryId}).exec();
    // Filter documents that have the category in categories array
    // Remove the category from categories array
    await WObject.updateMany(
      { categories: { $in: [categoryObject.title] } }, 
      { $pull: { categories: categoryObject.title } } 
    );
    // Then continue with the original task and delete the category
    const response = await category.deleteOne(categoryId);
    res.status(200);
    res.send(response);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

