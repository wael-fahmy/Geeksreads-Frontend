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
app.use("/api/book",(req,res,next)=> {
  const book_details=[
    {
    book_title:'Hajimete no Gal',
    book_image:'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Hajimeta_no_Gal%2C_Volume_1.jpg/220px-Hajimeta_no_Gal%2C_Volume_1.jpg',
    book_author:'Sebastian',
    book_details_shown:'Spring. The "season of love" has arrived and it seems that finding himself a girlfriend was harder than Junichi believed. To break the status quo,',
    book_details_hidden:'Junichis friends have forced him into confessing to the gal, Yame Yukana. However, things do not go quite as he expected. A series of "firsts" begins!'
    },
    {
    book_title:'Black Butler',
    book_image:'https://i.pinimg.com/236x/d6/b0/7b/d6b07b9d0ee3df0168945910e2142bf5--black-butler-kuroshitsuji-shinigami.jpg',
    book_author:'WiessMan',
    book_details_shown:'Black Butler (Japanese: 黒執事 Hepburn: Kuroshitsuji) is a Japanese manga series written and illustrated by Yana Toboso. Since its debut on September 16, 2006,',
    book_details_hidden:' it has been serialized in Gangan Comics sshōnen manga magazine Monthly GFantasy. ... A live action film adaptation was released in Japan on January 18, 2014'
    },
    {
    book_title:'Gal Gohan',
    book_image:'https://pbs.twimg.com/media/DenR6slUcAA31YT.jpg',
    book_author:'Loyd',
    book_details_shown:'Home Economics Teacher, Shinji Yabe, is asked by the biggest gyaru in school, Miku Okazaki, to help her "bake cookies to give to the teachers". The principal told her to do this, after she flunked every subject and makeup-class they put her in. He gets her to successfully finish a batch of cookies after several mishaps and is touched by his students glee over her success.',
    book_details_hidden:'He decides to start a cooking club after this experience to get more time and connection with his students. Upon hearing this, Miku decides to join, since he was the first teacher that didnt shove her into makeup-lessons after her failings and pushed her to try harder instead.'
    }
  ];
    
  res.status(200).json({
    message: "User fetched successfully!",
    book_details: book_details
    });
  });
  app.use("/api/bookDetails",(req,res,next)=> {
    const book_details=[
      {
      book_edition:'Kindle Edition, 372 pages',
      book_published:'Published December 1st 2016 by Lake Union Publishing',
      book_ASIN:'B01DF0TM1Y',
      book_language:'English',
      book_title:'黒執事',
      book_awards: 'shōnen manga',
      book_characters: 'Sebastian, Ceil Phantomhive'
      },
      {
        book_edition:'Prime Edition, 500 pages',
        book_published:'Published October 14th 2014 by Lake Union Publishing',
        book_ASIN:'C11DF0TM1Y',
        book_language:'English',
        book_title:'黒執事',
        book_awards: 'Shoujo manga',
        book_characters: 'Yami, Jun'
      },
      {
        book_edition:'Beta Edition, 200 pages',
        book_published:'Published Novamber 3rd 2015 by Lake Union Publishing',
        book_ASIN:'DAB0F0TM1Y',
        book_language:'English',
        book_title:'黒執事',
        book_awards: 'Shoujo manga',
        book_characters: 'Yuma, Akari'
      }
    ];
    res.status(200).json({
      message: "User fetched successfully!",
      book_details: book_details
      });
    });
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
