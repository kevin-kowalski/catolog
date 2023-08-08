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
 * Retrieves one category by name, and returns it
 */
export const getOne = async (categoryName: string) => {
  try {
    const response = await WeeCategory.find({
      title: categoryName
    });
    return response;
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

/**
 * Finds one category by its title,
 * updates its models array, and returns it
 */
export const findOneAndUpdateModels = async (category: Category) => {
  try {
    const filter = { title: category.title };
    const update = { categories: category.models };
    const response = await WeeCategory.findOneAndUpdate(filter, update);
    return response;
  } catch (err) {
    console.error(err);
  }
};