
var { ProductCategory } = require('../models/ProductCategory');

exports.sellerService = function sellerService(msg, callback) {
    console.log("In seller topic Service path:", msg.path);
    switch (msg.path) {
        case "addProduct":
            addProduct(msg, callback);
            break;

    }
};


function addProduct(msg, callback) {
    let response = {};
    let err = {};
    console.log("In seller topic service. Msg: ", msg);

    ProductCategory.find({
        $and: [{ "productCategoryName": msg.body.productCategory }, { "seller": msg.user._id }]
    }).select().then(async result => {
        console.log("product received");
        console.log(result);

        // create new product category and add product 
        if (result.length === 0) {
            var newProductCategory = new ProductCategory({
                productCategoryName: msg.body.productCategory,
                seller: msg.user._id,
            })

            newProductCategory.save(async (error, result1) => {
                if (error) {
                    console.log(error);
                    err.status = 410;
                    err.message = "could not create new product category";
                    err.data = error;
                    return callback(err, null);
                } else {
                    console.log("product category created " + result1);
                    var newProduct = {
                        productName: msg.body.productName,
                        productPrice: msg.body.productPrice,
                        productDescription: msg.body.productDescription,
                        productImage: msg.images.productImage,
                    }
                    ProductCategory.update(
                        { _id: result1._id },
                        { $push: { products: newProduct } },
                        { new: true }
                    )
                        .then(result2 => {
                            console.log("product added" + result2);
                            response.status = 200;
                            response.message = "product added";
                            return callback(null, response);
                        })
                        .catch(error => {
                            console.log(error);
                            err.status = 410;
                            err.message = "could not append to product category";
                            err.data = error;
                            return callback(err, null);
                        })
                }
            })
        }
        else {
            // append to existing product category
            console.log("append to product category");

            var newProduct = {
                productName: msg.body.productName,
                productPrice: msg.body.productPrice,
                productDescription: msg.body.productDescription,
                productImage: msg.images.productImage,
            }
            console.log(msg.images.productImage);
            console.log(newProduct);

            ProductCategory.update(
                { _id: result[0]._id },
                //  { $push: { products: newProduct } },
                { $addToSet: { products: newProduct } },
                { new: true }
            )
                .then(result3 => {
                    console.log("product added" + result3);
                    response.status = 200;
                    response.message = "product added";
                    return callback(null, response);
                })
                .catch(error => {
                    console.log(error);
                    err.status = 411;
                    err.message = "could not append to product category";
                    err.data = error;
                    return callback(err, null);
                })
        }

    }).catch(error => {
        console.log(error);
        err.status = 412;
        err.message = "could not get product category";
        err.data = error;
        return callback(err, null);
    })

}