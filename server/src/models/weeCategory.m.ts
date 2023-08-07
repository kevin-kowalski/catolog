import { Category } from "../types";
import WeeCategory from "./weeCategorySchema.m";

/**
 * Retrieves all objects, and returns them as an array
 */
export const getAll = async () => {
  try {
    // Find all WeeObjects
    const allCategories = await WeeCategory.find({});

    // If no objects are found, throw an error
    if (!allCategories) throw new Error('No categories found');

    // Return all retrieved objects
    return allCategories;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Creates one category, and returns it
 */
export const postOne = async (category: Category) => {
  try {
    const response = await WeeCategory.create(category);
    return response;
  } catch (err) {
    console.error(err);
  }
};