const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const WeeObj = require('../models/weeobjects_schema.js');

const defaultObjects = [
  new WeeObj({
    title: 'Default Cube',
    author: 'Unknown Artist',
    description: 'The famous default cube',
    glb: 'default_cube-transformed.glb',
    category: 'Default',
    source: '',
    scale: 1.5,
    date: 1690448981121,
  }),
  new WeeObj({
    title: 'Wired Icosphere',
    author: 'Artist Unknown',
    description: 'Wireframe icosphere',
    glb: 'default_ico_wired-transformed.glb',
    category: 'Default',
    source: '',
    scale: 1.5,
    date: 1690547882136,
  }),
  new WeeObj({
    title: 'Default Torus',
    author: 'Artist Unknown',
    description: 'Default torus shape',
    glb: 'default_torus-transformed.glb',
    category: 'Default',
    source: '',
    scale: 2,
    date: 1690620720422,
  }),
  new WeeObj({
    title: 'Rubber Duck',
    author: 'printable_models',
    description: "It's a duck",
    glb: 'rubber_duck.glb',
    category: 'Default',
    source: 'https://free3d.com/3d-model/rubber-duck-v1--614347.html',
    scale: 1,
    date: 1690620720422,
  }),
  new WeeObj({
    title: 'Knot',
    author: 'Unknown',
    description: '3D Knot',
    glb: 'knot.glb',
    category: 'Default',
    source: '',
    scale: 1,
    date: 1690651481963,
  }),
  new WeeObj({
    title: 'Head',
    author: 'allpolovinkina',
    description: 'Head - low poly version',
    glb: 'head_lowpoly.glb',
    category: 'Default',
    source:
      'https://www.turbosquid.com/3d-models/3d-free-bust-head-base-mesh-model-1832518',
    scale: 3.5,
    date: 1690800144064,
  }),
  new WeeObj({
    title: 'Cat',
    author: 'printable_models',
    description: 'Cat',
    glb: 'cat.glb',
    category: 'Default',
    source: 'https://free3d.com/3d-model/cat-v1--522281.html',
    scale: 1,
    date: 1690829240292,
  }),
];

mongoose
  .connect(String(process.env.DB_URL), { useNewUrlParser: true })
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log('connected to db in development environment');
  });

defaultObjects.map(async (p, index) => {
  await p.save();
  if (index === defaultObjects.length - 1) {
    console.log('DONE!');
    mongoose.disconnect();
  }
});
