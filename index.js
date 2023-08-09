const jsonServer = require("json-server");
const fs = require("fs");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middleware = jsonServer.defaults();
const bodyParser = require("body-parser");

server.use(bodyParser.json());
server.use(middleware);

const port=8080;



server.get("/server",(req,res)=>{
    res.send("home page")
})

server.post("/freelancers",(req,res)=>{
    const {name,profile_picture,email,password,profession,skills,hourly_rate,isBooked} = req.body;
    fs.readFile("./db.json",(err,data)=>{
        if(err){
            res.send({mesage:"something went wrong",err})
            return
        }

        var data = JSON.parse(data.toString());
        var last_id = data.users[data.users.length-1].id;
        console.log(last_id)
        data.users.push({"id":last_id+1,name,profile_picture,email,password,profession,skills,hourly_rate,isBooked})

        var writedata = fs.writeFile("./db.json",JSON.stringify(data),(err,result)=>{
            if(err){
                res.send(err)
            }
        })
        res.send("registered")
    })
})

server.get("/freelancers",(req,res)=>{
    fs.readFile("./db.json",(err,data)=>{
        if(err){
            res.send({mesage:"something went wrong",err})
            return
        }

        var data = JSON.parse(data.toString());
        res.send(data)
    })
})




server.use(router);
server.listen(port,()=>{
      console.log("running on port 8080")
})