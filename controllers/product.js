const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    // port: process.env.DB_PORT
});

exports.addproduct = (req,res) => {
   const {name, quantity, size, price} = req.body; 

   db.query('INSERT INTO product SET ? ', {name, quantity, size, price}, async (error, result) =>{ 
        if(error) {
           return res.status(400).json({success: false, message: error})
        }
        else {
            return res.status(200).json({success: true, message: {name, quantity, size, price}})
        }
    }
   )
}

exports.updateproduct = (req,res) => {
    const {name, quantity, size, price, pid} = req.body; 
 
    db.query('UPDATE product SET name = ? , quantity = ?, size = ?, price = ? WHERE pid = ?', [name, quantity, size, price, pid], async (error, result) =>{ 
         if(error) {
            return res.status(400).json({success: false, message: error})
         }
         else {
             return res.status(200).json({success: true, message: {name, quantity, size, price, pid}})
         }
     }
    )
 }

 exports.deleteproduct = (req,res) => {
    const {pid} = req.body; 
 
    db.query('DELETE FROM product WHERE pid = ?', [pid], async (error, result) =>{ 
         if(error) {
            return res.status(400).json({success: false, message: error})
         }
         else {
             return res.status(200).json({success: true, message: 'Successfully deleted!'})
         }
     }
    )
 }

 exports.viewall = (req,res) => {
 
    db.query('SELECT * FROM product', async (error, result) =>{ 
         if(error) {
            return res.status(400).json({success: false, message: error})
         }
         else {
             return res.status(200).json({success: true, message: result})
         }
     }
    )
 }

 exports.viewsingle = (req,res) => {
 
    const {pid} = req.body;

    db.query('SELECT * FROM product WHERE pid = ? ',[pid], async (error, result) =>{ 
         if(error) {
            return res.status(400).json({success: false, message: error})
         }
         else {
             return res.status(200).json({success: true, message: result})
         }
     }
    )
 }