const express = require("express");
const bodyParser = require("body-parser");

const app = express();

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));*/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

/*app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});*/

app.use("/api/list", (req, res, next) => {
  const Books = [
    {
      id: 11,
      book_name: "Harry Potter",
      author_name: "J.K Rowling",
     book_cover: "https://orig05.deviantart.net/e78f/f/2008/160/f/a/harry_potter_by_jonathan3333.jpg"
    },
    {
      id: 12, 
      book_name: "Game of Thrones",
      author_name: "G.R.R Martin",
     book_cover:  "https://tse2.mm.bing.net/th?id=OIP.FN55nUOxccDTpCPhYOmVfgHaLU&pid=15.1&P=0&w=300&h=300"

    },
    {
      id: 12, 
      book_name: "Lord of the Rings",
      author_name: "J.R.R Tolkien",
     book_cover:  "https://tse4.mm.bing.net/th?id=OIP.FZz1UZSbw_p_m5hdjUOM3AHaLF&pid=15.1&P=0&w=300&h=300"

    }
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    Books: Books
  });
});



app.use("/api/title", (req, res, next) => {
  const User_Info = {
    user_id:1,
    User_Name: 'Mohamed',
    User_Photo:'https://tse1.mm.bing.net/th?id=OIP.JchDxbr-ajB0-wbB1h5BBgAAAA&pid=15.1&P=0&w=300&h=300'
  };
    
  
  res.status(200).json({
    message: "User fetched successfully!",
    User_Info: User_Info
  });
});



module.exports = app;
