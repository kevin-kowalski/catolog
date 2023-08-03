import WeeObject from './weeObjectSchema.m';

export const getOne = async (name: string) => {
  try {
    const weeObject = await WeeObject.findOne({
      title: { $regex: name, $options: 'i' },
    });
    if (!weeObject) throw new Error('No object found');
    return weeObject;
  } catch (err) {
    console.error(err);
  }
};

export const getCategory = async (name: string) => {
  try {
    const categoryObjects = await WeeObject.find({
      category: { $regex: name, $options: 'i' },
    }).exec();
    if (!categoryObjects) throw new Error('No objects found');
    return categoryObjects;
  } catch (err) {
    console.error(err);
  }
};

export const getAll = async () => {
  try {
    const allObjects = await WeeObject.find({});
    if (!allObjects) throw new Error('No objects found');
    return allObjects;
  } catch (err) {
    console.error(err);
  }
};