const mongoose = require('mongoose');
const db = require('../models/index');
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
    ypos: -1.85,
    date: 1690620720422,
  }),
  new WeeObj({
    title: 'Knot',
    author: 'Unknonw',
    description: '3D Knot',
    glb: 'knot.glb',
    category: 'Default',
    source: '',
    scale: 1,
    ypos: 0,
    date: 1690651481963,
  }),
];

mongoose
  .connect(String(db.url), { useNewUrlParser: true })
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
