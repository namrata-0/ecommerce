const dbConnect = require('../dbConfig/dbconfig')

const addToCartApi = async (req, res) => {
    const email = req.params.email
    const { price, name, id, discount, image } = req.body
    if (email) {
      const carts = await dbConnect('carts')
      const insertProductDetails = await carts.insertOne({
        price,
        name,
        id,
        discount,
        email, 
        image
      })
      if (insertProductDetails) {
        res.send({ message: 'Product Added Succesfully', status: 1 })
      } else {
        res.send({ message: 'Product Not added! Please try again', status: 0 })
      }
    } else {
      res.send({ message: 'Email not found', status: 0 })
    }
  }
  const allCartDataApi = async (req, res) => {
    const email = req.params.email
    var carts = await dbConnect('carts')
    var findCartData = await carts.find({ email: email }).toArray();
    if (findCartData) {
      res.send({
        message: 'User Cart Data Found',
        status: 1,
        user: findCartData,
        
      })
    } else {
      res.send({ message: 'User Details not Found', status: 0 })
    }
  }

  const deleteCartItemApi = async(req, res) =>{
      const email = req.params.email;
      // const id = req.body.id;
      if (email) {
          const carts = await dbConnect('carts');
          const findCartItem = await carts.findOne({ email:email });
          if (findCartItem) {
              const itemDelete = await carts.deleteOne({email})
              if (itemDelete) {
                  res.send({ message: "item deleted", status: 1 })
              } else {
                  res.send({ message: "item not deleted", status: 0 })
              }
          } else {
              res.send({ message: "item not found", status: 0 })
          }
      } else {
          res.send({ message: "enter email and product id required", status: 0 })
      }
  
  }
  module.exports = {addToCartApi, allCartDataApi, deleteCartItemApi};