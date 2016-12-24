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
  res.render('site/home',{showOptions:false});
});

//about page
app.get('/about', function(req,res){
  res.render('site/about',{showOptions:false});
});

// account page
app.get('/account', function(req,res){
  res.render('site/account',{showOptions:false});
});

// cart page
app.get('/cart', function(req,res){
  res.render('site/cart',{showOptions:false});
});

// contact page
app.get('/contact', function(req,res){
  res.render('site/contact',{showOptions:false});
});

// search function with checkboxes
app.get('/search', function(req,res){

  // setup submission output and query string
  query = req.query;
  q = query.search;

  console.log(query);
  console.log(query.title);
  console.log(query.details);

  // check if the box is equal to true and if so, does the value include the query
  function isMatch(checkValue, value, query){
    value = value.toLowerCase();
    query = query.toLowerCase();
    // console.log(value);
    // console.log(checkValue);
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
  res.render('post/new',{showOptions:false});
});

app.post('/post/new', function(req,res){
  db.product.create(req.body).then(function(){
    res.redirect('/post/all');
  });
});

app.get('/post/:id', function(req,res){
  var id = req.params.id;
  db.product.findById(id).then(function(product){
    res.render('post/show',{product:product,showOptions:false});
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
    res.render('post/edit',{product:product,showOptions:false});
  });
});

// ERROR HANDLING
app.get('*********', function(req,res){
  res.render('site/error',{showOptions:false});
});

// LISTEN
app.listen(3000); //boilerplate
