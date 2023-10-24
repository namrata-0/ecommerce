const dbConnect = require("../dbConfig/dbconfig")

const ordersBookedApi = async(req, res) => {
    const email = req.params.email;
    const {Address,
        Price,
        Payment_Mode,
        Delivery_date,
        Status, Order_Id, Product_Id, Product_Name} = req.body;
    if(email){
        const orders = await dbConnect("orders")
        var insertData = await orders.insertOne({
            Address,
            Price,
            Payment_Mode,
            Delivery_date,
            Status,
            Order_Id,
            Product_Id,
            Product_Name
        });
        if(insertData){
            res.send({message: "Congratulations! Your Order Placed Successfully.It will be delivered soon.", status:1})
        }
        else{
            res.send({message: "User not found", status:0})
        }
    }else{
        res.send({message: "Email not  Found", status:0})
    }
}
const showOrderApi = async(req,res) =>{
    const email = req.params.email;
    if(email){
        const orders = await dbConnect("orders")
        const findOrdersDetails = await orders.find().toArray();
        if(findOrdersDetails){
            res.send({message:"Order Details found Succesfully", status:1, data:findOrdersDetails})
        }else{
            res.send({message:"Order Not found ", status:0})
        }
    }
    else{
            res.send({message:"Email Not found ", status:0})
        }
}


module.exports={ordersBookedApi, showOrderApi}