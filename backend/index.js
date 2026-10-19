const express = require("express")
const cors = require("cors")
const httpServer = require("http")
const pool = require("./db")
const dotenv = require("dotenv")

const app = express()
const server  = httpServer.createServer(app)
const PORT = process.env.PORT || 3000
dotenv.config()

app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// routes
app.get("/",(req,res)=>{
    return res.send("Server is UP and running")
})

app.get("/check-user",(req,res)=>{
    return res.send("checking the user")
})

// add user to DB
app.post("/adduser",async(req,res)=>{
    const {username,email,password} = req.body
    console.log(username,email,typeof password)

    try{

        const userDb = await pool.query("INSERT INTO users(username,email,password) VALUES($1,$2,$3) RETURNING *",[username,email,password])
        const userDetails  = userDb.rows[0]
        console.log(userDetails)

        return res.send({
            status:201,
            message:"User added succesfully",
            data:userDetails
        })

    }
    catch(error){
        return res.send({
            status:500,
            message:"Intername server error",
            error:error.message
        })
    }

})


app.get("/get-user",async(req,res)=>{
    try{

        const userDetails  = await pool.query("SELECT * FROM users")
        console.log(userDetails.rows[0])
        return res.send({
            status:200,
            message:"User details fetched succesfully",
            data: userDetails.rows[0]
        })

    }
    catch(error){
        return res.send({
            status:500,
            message:"Internal server error",
            error:error.message
        })
    }
})


server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

