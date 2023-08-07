import { Request, Response } from 'express';
import * as weeCategory from '../models/weeCategory.m';

/**
 * Controller function for retrieving all objects.
 */
export async function getAll(req: Request, res: Response) {
  try {
    // Retrieve all objects using the weeObjects model's getAll function
    const allWeeCategories = await weeCategory.getAll();

    // Send all retrieved objects as the response
    res.send(allWeeCategories);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
};
