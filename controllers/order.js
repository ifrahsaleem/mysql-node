const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    // port: process.env.DB_PORT
});

exports.placeorder = (req,res) => {
   const {userId, TotalPrice, Orderdetails} = req.body; 
   const PaymentMode = 'COD'; //cash on delivery
   const Orderdate = Date.now();
   const OrderStatus = 'Confirmed';

   db.query('INSERT INTO orders SET ? ', {userId, TotalPrice, OrderStatus, PaymentMode, Orderdate, OrderStatus}, (error, result) =>{ 
    // const OrderID = result.insertId
    if(error) {
           return res.status(400).json({success: false, message: error})
        }

        Orderdetails.map((detail)=> {
            console.log(detail);
            detail.push(result.insertId);
            detail.push(userId);
        })
        console.log(Orderdetails);
        db.query('INSERT INTO orderdetails (pid, price, quantity, orderID, userId) VALUES ?', [Orderdetails], (error, results) => {
                if(error) {
                    console.log(error);
                    return res.status(400).json({success: false, message: error})
                    }
                
                return res.status(200).json({success: true, message: 'Successfully placed order!'})
        });
            
    }
   )
}

exports.vieworders = (req,res) => {
    const {userId} = req.body;

    db.query('SELECT * FROM orders INNER JOIN orderdetails on orderdetails.userId = orders.userId WHERE orders.userId = ? ',[userId] ,(error,result) => {
        if(error) {
            return res.status(400).json({success: false, message: error})
         }
         return res.status(200).json({success: true, message: result})
    });

}