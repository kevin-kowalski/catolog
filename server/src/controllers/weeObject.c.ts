import { Request, Response } from 'express';
import * as weeObjects from '../models/weeObject.m';

export async function getObject(req: Request, res: Response) {
  try {
    const objectName = req.params.title;
    if (!objectName) {
      res.status(400);
      res.send('No object title provided in data.');
    }
    const weeObject = await weeObjects.getOne(objectName);
    res.send(weeObject);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
}

export async function getCategory(req: Request, res: Response) {
  try {
    const categoryName = req.params.category;
    if (!categoryName) {
      res.status(400);
      res.send('No category name provided in data.');
    }
    const categoryObjects = await weeObjects.getCategory(categoryName);
    res.send(categoryObjects);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const allWeeObjects = await weeObjects.getAll();
    res.send(allWeeObjects);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
}
