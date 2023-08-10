import { CategoryType } from "../types";
import { Category, CategoryDocument } from "./category.schema";

/* Retrieves all objects, and returns them as an array */
export const getAll = async (): Promise<CategoryDocument[] | null> => {
  try {
    // Find all Objects
    const allCategories = await Category.find({});

    // If no objects are found, throw an error
    if (!allCategories) throw new Error('No categories found');

    // Return all retrieved objects
    return allCategories;
  } catch (err) {
    console.error(err);
  }
};

/* Retrieves one category by name, and returns it */
export const getOne = async (categoryName: string): Promise<CategoryDocument | null> => {
  try {
    const response = await Category.findOne({
      title: categoryName
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

/* Creates one category, and returns it */
export const postOne = async (category: CategoryType): Promise<CategoryDocument | null> => {
  try {
    const response = await Category.create(category);
    return response;
  } catch (err) {
    console.error(err);
  }
};

/* Finds one category by its title,
 * updates its models array, and returns it */
export const findOneAndUpdateModelIds = async (categoryName: string, id: string): Promise<CategoryDocument | null> => {
  try {
    const categoryData = await getOne(categoryName);
    const filter = { title: categoryName };
    const update = { models:  [...categoryData.models, id] };
    const response = await Category.findOneAndUpdate(filter, update);
    return response;
  } catch (err) {
    console.error(err);
  }
};

/* Deletes one category, and returns it */
export async function deleteOne (id: string) {
  try {
    const response = await Category.deleteOne({
      _id: id
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};