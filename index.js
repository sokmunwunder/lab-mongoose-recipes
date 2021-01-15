const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    console.log('Connection has been established');
    /*return Recipe.create({
      title: 'Hainanese Chicken Rice',
      ingredients: ['chicken', 'rice', 'cucumber', 'garlic'],
      cuisine: 'Chinese',
      dishType: 'main_course',
      duration: 240
    });
    //console.log('Title of recipe:', data.title);*/
    return Recipe.create(data);
    //console.log('Titles of recipes:', data.title);
  })
  /*.then((data) => {
    console.log('Title of recipe:', data, data.title);
  })*/
  .then((data) => {
    console.log('Recipes were loaded:');
    data.forEach((recipe) => {
      console.log(recipe.title);
    });
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );
  })
  .then((data) => {
    console.log('Recipe updated');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
