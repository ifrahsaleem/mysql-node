const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    // port: process.env.DB_PORT
});


exports.register = (req,res) => {
   const {email, password, name} = req.body; 

   db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) =>{ 
        if(error) {
           return res.status(400).json({success: false, message: error})
        }
        if(result.length > 0) {
            return res.status(400).json({success: false, message: 'That email is already taken!'})
        }

        let hashedPassword = await  bcrypt.hash(password, 8);

        console.log(hashedPassword);

        db.query('INSERT INTO users SET ? ', {name: name, email: email, password: hashedPassword}, (error, result) => {
            
            if(error) {
                console.log(result);
                return res.
                status(400).json({success: false, message: 'Could not register!'})
             }
             else {
                 return res.status(200).json({success: true, message: 'Successfully registered!'})
             }
        });

    }
   )
}

exports.login = async (req,res) => {
    try {
        const {email, password} = req.body; 

        if(!email || !password) { 
            return res.status(400).json({success: false, message: 'All fields are required!'})
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async(error, result) => {
            if(error) {
                return res.status(400).json({success: false, message: error});
            }
             
            if(!result || !(await bcrypt.compare(password, result[0].password))){
                return res.status(401).json({success: false, message: 'Email or password is incorrect!'})
            }

            else {
                const id = result[0].id;
                const token = jwt.sign({id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log(token);

                return res.status(200).json({success: true, message: {id, email, password, token}})
            }
        });
    }

    catch (error) { 
        console.log(error);
    }
}