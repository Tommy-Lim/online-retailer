// REQUIRES
var express = require('express'); //boilerplate
var bodyParser = require('body-parser'); //boilerplate
var ejsLayouts = require('express-ejs-layouts'); //boilerplate
var path = require('path'); //boilerplate


// APP VARIABLES
app = express(); //boilerplate
var db = require('./models'); //boilerplate


//  SET/USE STATEMENTS
app.set('view engine', 'ejs'); //boilerplate
app.use(ejsLayouts); //boilerplate
app.use(bodyParser.urlencoded({extended: false})); //boilerplate

// this sets a static directory for the views
app.use(express.static(path.join(__dirname, 'static'))); //boilerplate


// ROUTES

// home page
app.get('/', function(req,res){
  res.render('site/home');
});

//about page
app.get('/about', function(req,res){
  res.render('site/about');
});

// account page
app.get('/account', function(req,res){
  res.render('site/account');
});

// cart page
app.get('/cart', function(req,res){
  res.render('site/cart');
});

// contact page
app.get('/contact', function(req,res){
  res.render('site/contact');
});

// search function with checkboxes
app.get('/search', function(req,res){

  // setup submission output and query string
  query = req.query;
  q = query.search;

  // check if the box is equal to true and if so, does the value include the query
  function isMatch(checkValue, value, query){
    value = value.toLowerCase();
    query = query.toLowerCase();
    return checkValue === 'true' && value.includes(query);
  }

  //
  db.product.findAll().then(function(products){
    var results = [];

    products.forEach(function(product){

      title = product.title;
      details = product.details;
      location = product.location;
      make = product.make;
      model = product.model;
      ownerID = product.ownerID;

      if (isMatch(query.title, title, q) ||
          isMatch(query.details, details, q) ||
          isMatch(query.location, location, q) ||
          isMatch(query.make, make, q) ||
          isMatch(query.model, model, q) ||
          isMatch(query.ownerID, ownerID, q)){
            results.push(product);
          }
    });
    res.render('post/index',{
      products:results,
      query: query,
      showOptions: true,
      page: 'search'
    });
  });
});

app.get('/post/all', function(req,res){
  db.product.findAll().then(function(products){
    res.render('post/index',{
      products:products,
      showOptions: true,
      page: 'all'
    });
  });
});

app.get('/post/new', function(req,res){
  res.render('post/new');
});

app.post('/post/new', function(req,res){
  db.product.create(req.body).then(function(){
    res.redirect('/post/all');
  });
});

app.get('/post/:id', function(req,res){
  var id = req.params.id;
  db.product.findById(id).then(function(product){
    res.render('post/show',{product:product});
  });
});

app.delete('/post/:id', function(req,res){
  var id = req.params.id;
  db.product.findById(id).then(function(product){
    product.destroy();
    res.send('delete success');
  });
});

app.put('/post/:id', function(req,res){
  var id = req.params.id;
  db.product.findById(id).then(function(product){
    product.update(req.body);
    res.send('put success');
  });
});

app.get('/post/:id/edit', function(req,res){
  var id = req.params.id;
  db.product.findById(id).then(function(product){
    res.render('post/edit',{product:product});
  });
});

// ERROR HANDLING
app.get('*********', function(req,res){
  res.render('site/error');
});

// LISTEN
app.listen(3000); //boilerplate
