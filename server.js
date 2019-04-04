var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/postpin')
var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())

var User = require('./model/user');
var Product = require('./model/product');
var WishList = require('./model/wishlist')

app.get('/users' , function(request, response){
    User.find({}, function(error, users){
        if(error) {
            response.status(500).send('error getting users');
        } else {
            response.send(users)
        }
    })
})

app.post('/users', function(request, response){
    var user = new User();
    console.log(request)
    user.userName = request.body.userName;
    user.password = request.body.password;
    user.email = request.body.email;
    user.save(function(error, savedUser){
        if(error) {
            response.status(500).send("Cannot save product ");
        } else {
            response.send(savedUser);
        }

    })
})

app.delete('/users', function(request,response){
    var user = request.body.userName;
    User.remove({"userName": user}, function(error, userdeleted) {
        if(error) {
            response.status(500).send("Cannot find and delete user ");
        } else {
            response.send(userdeleted);
        }
    })
});

//--------------------------products---------------------------------
app.get('/products', function(request,response){
    Product.find({}, function(error, products){
        if(error) {
            response.status(200).send("cannot get product");
        } else {
            response.status(500).send(products);
        }
    });
});


app.post('/products', function(request, response){
    var product = new Product();
    product.title = request.body.title;
    product.price = request.body.price;
    product.likes = request.body.likes;
    product.save(function(error, savedProduct){
        if(error) {
            response.status(500).send("cannot save product to database");
        } else {
            response.send(savedProduct);
        }
    });
});

//--------------------------wishlist---------------------------------

app.get('/wishlist', function(request,response) {
    WishList.find({}).populate({path:'products', model: 'Product'}).exec(function(error, wishList){
        if(error) {
            response.status(200).send("cannot get product");
        } else {
            response.status(500).send(wishList);
        }
    })
})

app.post('/wishlist', function(request, response){
    var wishList = new WishList();
    wishList.title = request.body.title;
    wishList.save(function(error, wishlist){
        if(error) {
            response.status(200).send("cannot save wishlist");
        } else {
            response.status(500).send(wishlist)
        }
    })
})

app.put('/wishlist/product/add', function(request,response){
    Product.findOne({_id:request.body.productId}, function(error, product){
        if(error) {
            response.status(500).send("Cannot find product ");
        } else {
            WishList.update({_id:request.body.wishListId}, {$addToSet:
                {products: product._id}}, function(error, wishList){
                    if(error) {
                        response.status(200).send("cannot add product to wishlist");
                    } else {
                        response.status(500).send(wishList)
                    }
                });
        }
    })
})


app.listen(3001, function() {
    console.log('listening to port 3001');
});