import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import WeeObject from '../src/models/weeObjectSchema.m';

const defaultObjects = [
  new WeeObject({
    title: 'Default Cube',
    author: 'Unknown Artist',
    description: 'The famous default cube',
    glb: 'default_cube-transformed.glb',
    category: 'Default',
    source: '',
    scale: 1.5,
    date: 1690448981121,
  }),
  new WeeObject({
    title: 'Wired Icosphere',
    author: 'Artist Unknown',
    description: 'Wireframe icosphere',
    glb: 'default_ico_wired-transformed.glb',
    category: 'Default',
    source: '',
    scale: 1.5,
    date: 1690547882136,
  }),
  new WeeObject({
    title: 'Default Torus',
    author: 'Artist Unknown',
    description: 'Default torus shape',
    glb: 'default_torus-transformed.glb',
    category: 'Default',
    source: '',
    scale: 2,
    date: 1690620720422,
  }),
  new WeeObject({
    title: 'Rubber Duck',
    author: 'printable_models',
    description: "It's a duck",
    glb: 'rubber_duck.glb',
    category: 'Default',
    source: 'https://free3d.com/3d-model/rubber-duck-v1--614347.html',
    scale: 1,
    date: 1690620720422,
  }),
  new WeeObject({
    title: 'Knot',
    author: 'Unknown',
    description: '3D Knot',
    glb: 'knot.glb',
    category: 'Default',
    source: '',
    scale: 1,
    date: 1690651481963,
  }),
  new WeeObject({
    title: 'Head',
    author: 'allpolovinkina',
    description: 'Head - low poly version',
    glb: 'head_lowpoly.glb',
    category: 'Default',
    source:
      'https://www.turbosquid.com/3d-models/3d-free-bust-head-base-mesh-model-1832518',
    scale: 3,
    date: 1690800144064,
  }),
  new WeeObject({
    title: 'Cat',
    author: 'printable_models',
    description: 'Cat',
    glb: 'cat.glb',
    category: 'Default',
    source: 'https://free3d.com/3d-model/cat-v1--522281.html',
    scale: 2,
    date: 1690829240292,
  }),
];

async function run () {
  try {
    await mongoose.connect(String(process.env.DB_URL));
    console.log('>> Connected to database');
    for (let index = 0; index < defaultObjects.length; index++) {
      await defaultObjects[index].save();
      if (index === defaultObjects.length - 1) {
        console.log('>> Database successfully populated');
        mongoose.disconnect();
      }
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

run();
