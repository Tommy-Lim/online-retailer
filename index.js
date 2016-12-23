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

app.get('/', function(req,res){
  res.render('site/home');
});

app.get('/about', function(req,res){
  res.render('site/about');
});

app.get('/account', function(req,res){
  res.render('site/account');
});

app.get('/cart', function(req,res){
  res.render('site/cart');
});

app.get('/contact', function(req,res){
  res.render('site/contact');
});

app.get('/search', function(req,res){
  console.log(req.query);
  console.log(req.query.title);
  query = req.query;
  q = query.search;
  db.product.findAll().then(function(products){
    var results = [];
    products.forEach(function(product){

      title = product.title.toLowerCase();
      details = product.details.toLowerCase();
      location = product.location.toLowerCase();
      make = product.make.toLowerCase();
      model = product.model.toLowerCase();
      ownerID = product.ownerID.toLowerCase();

      if(title.indexOf(q)>=0||details.indexOf(q)>=0||location.indexOf(q)>=0||make.indexOf(q)>=0||model.indexOf(q)>=0||ownerID.indexOf(q)>=0){
        results.push(product);
      }

    });
    res.render('post/search-results',{products:results, query: query});
  });
});

app.get('/post/all', function(req,res){
  db.product.findAll().then(function(products){
    res.render('post/index',{products:products});
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
