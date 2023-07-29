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
    scale: 1.5,
    date: 1690448981121,
  }),
  new WeeObj({
    title: 'Wired Cube',
    author: 'Artist Unknown',
    description: 'Wireframe cube',
    glb: 'cube_wired.glb',
    category: 'Default',
    scale: 1.5,
    date: 1690536651458,
  }),
  new WeeObj({
    title: 'Wired Icosphere',
    author: 'Artist Unknown',
    description: 'Wireframe icosphere',
    glb: 'ico_wired-transformed.glb',
    category: 'Default',
    scale: 1.5,
    date: 1690547882136,
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
