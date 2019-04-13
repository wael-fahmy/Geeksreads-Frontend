const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post.book_id);
  res.status(201).json({
    message: "Post added successfully"
  });
});
app.use("/api/reviewcomments", (req, res, next) => {
    const comments_details = [{
        user_image: 'http://olegif.com/bin/gifs/00/28/96.gif',
        user_name: 'Vladimaier',
        user_id: '1231',
        user_date: '8 years ago',
        user_body: 'It has been serialized in Kadokawa Shotens shōnen manga magazine Monthly Shōnen Ace since November 2015 and has been collected in seven tankōbon volumes, A 10-episode anime television series adaptation by NAZ aired from July 12/ 2017 to September 13/ 2017.'
        },
        {
        user_image: 'https://image.shutterstock.com/image-vector/cute-vector-illustration-beautiful-chibi-450w-1143687146.jpg',
        user_name: 'Kurolucifer',
        user_id: '12564',
        user_date: '7 years ago',
        user_body: 'I so agree with your review, im ready to punch something also if I hear one more description of their designer clothing.'
        },
        {
        user_image: 'https://cdn.conceptartempire.com/images/03/4789/04-howto-draw-chibi-eyes.jpg',
        user_name: 'Bandie',
        user_id: '5342',
        user_date: '1 years ago',
        user_body: 'Ok so I agree with some of the stuff u mentioned. I honestly thought all the designer references were stupid. I also think that Mellisa de la Cruz dragged out the begining a bit too long. I started to lose intrest until I finally got farther in. Other than those two things I disagree with u. So first of all I happen to love the name schyler. And the fact that shes gothic and pretty is not a thing we see often. Usually its a girl that everyone likes (twilight) or the popular girl ( vampire diaries) no one even notices her until shes identified as a blue blood. The story was a refreshing take on vampires. Ive read all four books and the story really develops into something a lot more satisfying.'
        },
        {
        user_image: 'https://i.redd.it/78xux2ti42c11.png',
        user_name: 'Morningstar',
        user_id: '23123',
        user_date: '2 years ago',
        user_body: 'i dont know y everyone hates this book so much. I have to say i really enjoyed it. I didnt think there was much resemblance at all to twilight and the fact that mellisa de la cruz introduced some new and interesting things about vampires like silver bloods is really refreshing.'
        },
        {
        user_image: 'https://pm1.narvii.com/6518/bc8f0c3f7486d92c6054be6221a019bd7eea52f2_hq.jpg',
        user_name: 'Onmyuji',
        user_id: '5646',
        user_date: '5 years ago',
        user_body: 'I get what your saying, Amanda. I have read the book so I know theyre rich kids but really?? Half the book simply DESCRIBED what they were wearing. Ive read books about rich kids before but this is ridiculous and I never said having designer clothes was bad. But besides that, I didnt like the book for a HANDFUL of other reasons.'
        },
        {
        user_image: 'https://cdn.shopify.com/s/files/1/1158/2192/products/Hatsune-Miku-Chibi-Mic-Vocaloid-Decal_1024x1024.jpg?v=1455440701',
        user_name: 'karl',
        user_id: '4242',
        user_date: '6 years ago',
        user_body: 'Agree 100% with this review!'
        },
    ];

    res.status(200).json({
        message: "User fetched successfully!",
        comments_details: comments_details
    });
});
app.use("/api/reviewerdata", (req, res, next) => {
    const reviewer_details = [{
        book_title: 'Kuroshitsuji Black Bulter',
        book_image: 'https://cdn.myanimelist.net/images/manga/3/161407.jpg',
        book_author: 'Yuno Mashiro',
        book_read_date: 'january 2019',
        book_id: '1233',
        reviewer_id: '3424',
        reviewer_name: 'Meguru Ueno',
        reviewer_image: 'https://i.paigeeworld.com/user-media/1447891200000/55ae8c1544941e41e4a7925a_564e322f05e9bcd58f01dae9_320.jpg',
        reviewer_date: '5 months',
        reviewer_rate: '3',
        reviewer_likes: '80',
        reviewer_comments: '50',
        reviewer_body: 'It has been serialized in Kadokawa Shotens shōnen manga magazine Monthly Shōnen Ace since November 2015 and has been collected in seven tankōbon volumes, A 10-episode anime television series adaptation by NAZ aired from July 12/ 2017 to September 13/ 2017.'
        }
    ];

    res.status(200).json({
        message: "User fetched successfully!",
        reviewer_details: reviewer_details
    });
});
app.use("/api/reviewdata", (req, res, next) => {
    const review_details = [{
            reviewer_name: 'Meguru Ueno',
            reviewer_image: 'https://i.paigeeworld.com/user-media/1447891200000/55ae8c1544941e41e4a7925a_564e322f05e9bcd58f01dae9_320.jpg',
            reviewer_date: '5 months',
            reviewer_rate: '3',
            reviewer_likes: '80',
            reviewer_comments: '50',
            reviewer_body: 'It has been serialized in Kadokawa Shotens shōnen manga magazine Monthly Shōnen Ace since November 2015 and has been collected in seven tankōbon volumes, A 10-episode anime television series adaptation by NAZ aired from July 12/ 2017 to September 13/ 2017.'
        },
        {
            reviewer_name: 'Yana Toboso',
            reviewer_image: 'https://data.whicdn.com/images/195405628/large.jpg',
            reviewer_date: '6 months',
            reviewer_rate: '5',
            reviewer_likes: '70',
            reviewer_comments: '63',
            reviewer_body: 'Yana Toboso (枢 やな. Toboso Yana) born January 24/ 1984. and known by her other pen names Yanao Rock and Takaragi Yana is a Japanese manga artist. Her most significant work is the manga series Kuroshitsuji, She currently lives in Yokohama Kanagawa Prefecture. Yana Toboso draws herself as a devil with a black body and horns a round white head and a pointed tail Toboso is now thirty-four years old and there are currently no known pictures and documents of Tobosos real appearance given to the public'
        },
        {
            reviewer_name: 'FLoyd',
            reviewer_image: 'https://i.pinimg.com/originals/ef/f4/44/eff444400850867dd1ea4acb53b68992.jpg',
            reviewer_date: '10 months',
            reviewer_rate: '1',
            reviewer_likes: '100',
            reviewer_comments: '60',
            reviewer_body: 'FLoyd de la Cruz is the New York Times and USA Today best-selling author of many critically acclaimed and award-winning novels for teens including The Au Pairs series. the Blue Bloods series. the Ashleys series. the Angels on Sunset Boulevard series and the semi-autobiographical novel Fresh off the Boat. Her books for adults include the novel Cat’s Meow the anthology Girls Who Like Boys Who Like Boys and the tongue-in-chic handbooks How to Become Famous in Two Weeks or Less and The Fashionista Files: Adventures in Four-inch heels and Faux-Pas. She has worked as a fashion and beauty editor and has written for many publications including The New York Times. Marie Claire. Harper’s Bazaar. Glamour. Cosmopolitan. Allure, The San Francisco. Chronicle. McSweeney’s. Teen Vogue. CosmoGirl! and Seventeen. She has also appeared as an expert on fashion, trends and fame for CNN. E! and FoxNews. Melissa grew up in Manila and moved to San Francisco with her family. where she graduated high school salutatorian from The Convent of the Sacred Heart. She majored in art history and English at Columbia University and minored in nightclubs and shopping!. She now divides her time between New York and Los Angeles where she lives in the Hollywood Hills with her husband and daughter.'
        },
        {
            reviewer_name: 'Cloud',
            reviewer_image: 'https://data.whicdn.com/images/191743106/large.png',
            reviewer_date: '2 months',
            reviewer_rate: '5',
            reviewer_likes: '20',
            reviewer_comments: '34',
            reviewer_body: 'Cloud de la Cruz. It has been serialized in Kadokawa Shotens shōnen manga magazine Monthly Shōnen Ace since November 2015 and has been collected in seven tankōbon volumes, A 10-episode anime television series adaptation by NAZ aired from July 12/ 2017 to September 13/ 2017.'
        },
        {
            reviewer_name: 'Slothe',
            reviewer_image: 'https://data.whicdn.com/images/137995561/superthumb.jpg?t=1411225482',
            reviewer_date: '3 months',
            reviewer_rate: '4',
            reviewer_likes: '60',
            reviewer_comments: '120',
            reviewer_body: 'Slothe de la Cruz. It has been serialized in Kadokawa Shotens shōnen manga magazine Monthly Shōnen Ace since November 2015 and has been collected in seven tankōbon volumes, A 10-episode anime television series adaptation by NAZ aired from July 12/ 2017 to September 13/ 2017.'
        },
        {
            reviewer_name: 'Sharl',
            reviewer_image: 'https://simg.nicepng.com/png/small/162-1622259_cute-anime-girl-chibi.png',
            reviewer_date: '7 months',
            reviewer_rate: '5',
            reviewer_likes: '10',
            reviewer_comments: '9',
            reviewer_body: 'Sharl de la Cruz. It has been serialized in Kadokawa Shotens shōnen manga magazine Monthly Shōnen Ace since November 2015 and has been collected in seven tankōbon volumes, A 10-episode anime television series adaptation by NAZ aired from July 12/ 2017 to September 13/ 2017.'
        }
    ];

    res.status(200).json({
        message: "User fetched successfully!",
        review_details: review_details
    });
});
app.use("/api/genredetails", (req, res, next) => {
  const genre_details = [
    {
      genre_one: "Romance",
      genre_two: "Slice Of Life",
      genre_three: "School",
      genre_four: "Food",
      genre_five: "Shojou"
    },
    {
      genre_one: "Demon",
      genre_two: "Shounen",
      genre_three: "Slice OF Life",
      genre_four: "History",
      genre_five: "War"
    },
    {
      genre_one: "Romance",
      genre_two: "Slice Of Life",
      genre_three: "Drama",
      genre_four: "Comedy",
      genre_five: "Shojou"
    }
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    genre_details: genre_details
  });
});

app.use("/api/suggestedbook", (req, res, next) => {
  const suggestedbook_details = [
    {
      suggestedbook_title: "Blame",
      suggestedbook_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgB_-fjEHUeR3AT1rJNOAP6M_LwD2Lk-YYVAjEO7_1Rg1Y7bdAqw",
      suggestedbook_author: "Chronous",
      suggestedbook_id: "231312",
      suggestedbook_authorid: "231231"
    },
    {
      suggestedbook_title: "Bleach",
      suggestedbook_image:
        "https://i.pinimg.com/236x/e2/d4/9c/e2d49c2ecbd3c1993b5471b4679c8b4c--list-bleach.jpg",
      suggestedbook_author: "Badon",
      suggestedbook_id: "343",
      suggestedbook_authorid: "34"
    },
    {
      suggestedbook_title: "Magi",
      suggestedbook_image:
        "https://vignette.wikia.nocookie.net/magi/images/1/1d/Volume_27.png/revision/latest?cb=20151103001522",
      suggestedbook_author: "kuro",
      suggestedbook_id: "776",
      suggestedbook_authorid: "54"
    },
    {
      suggestedbook_title: "HellSing",
      suggestedbook_image:
        "https://geekandsundry.com/wp-content/uploads/2015/05/Hellsing-Cover.jpg",
      suggestedbook_author: "Kohta Hirano",
      suggestedbook_id: "775",
      suggestedbook_authorid: "87"
    },
    {
      suggestedbook_title: "Radiant",
      suggestedbook_image:
        "https://www.rightstufanime.com/images/productImages/9781974703814_manga-radiant-1-primary.jpg",
      suggestedbook_author: "Tony Valente",
      suggestedbook_id: "989",
      suggestedbook_authorid: "2313"
    },
    {
      suggestedbook_title: "Bungo Stray Dogs",
      suggestedbook_image:
        "https://images.squarespace-cdn.com/content/5a6f4bcb64b05fab1682b0b1/1550247473973-8A54LJPOSCV8F9SFMJ6W/",
      suggestedbook_author: "Kami",
      suggestedbook_id: "121",
      suggestedbook_authorid: "4241"
    },
    {
      suggestedbook_title: "Grand Blue",
      suggestedbook_image:
        "https://www.monstersandcritics.com/wp-content/uploads/2018/09/Grand-Blue-Dreaming-Manga-Volume-7-Cover.jpg",
      suggestedbook_author: "Kenji Inoue",
      suggestedbook_id: "453",
      suggestedbook_authorid: "132"
    },
    {
      suggestedbook_title: "Spice & Wolf",
      suggestedbook_image:
        "https://www.anime-contemplation.com/wp-content/uploads/2012/12/Spice-and-Wolf-Manga-Volume-7-Cover.jpg",
      suggestedbook_author: "Isuna Hasekura",
      suggestedbook_id: "563",
      suggestedbook_authorid: "342"
    },
    {
      suggestedbook_title: "Baka To Test",
      suggestedbook_image:
        "https://www.baka-tsuki.org/project/thumb.php?f=BakaTestV1cover.jpg&width=325",
      suggestedbook_author: "Kenji",
      suggestedbook_id: "545",
      suggestedbook_authorid: "242"
    },
    {
      suggestedbook_title: "One Punch Man",
      suggestedbook_image:
        "https://pre00.deviantart.net/d461/th/pre/i/2016/163/a/f/one_punch_man_cover_by_visionarydaydreamer-da5x72m.jpg",
      suggestedbook_author: "Hakura",
      suggestedbook_id: "23",
      suggestedbook_authorid: "3434"
    }
  ];
  res.status(200).json({
    message: "User fetched successfully!",
    suggestedbook_details: suggestedbook_details
  });
});
app.use("/api/book", (req, res, next) => {
  const book_details = [
    {
      book_title: "Hajimete no Gal",
      book_image:
        "https://cdna.artstation.com/p/assets/images/images/003/765/026/large/mark-valeri-sao-manga-front-cover.jpg?1477271070",
      book_author: "Sebastian",
      book_details_shown:
        'Spring. The "season of love" has arrived and it seems that finding himself a girlfriend was harder than Junichi believed. To break the status quo,',
      book_details_hidden:
        'Junichis friends have forced him into confessing to the gal, Yame Yukana. However, things do not go quite as he expected. A series of "firsts" begins!'
    },
    {
      book_title: "Black Butler",
      book_image:
        "https://i.pinimg.com/236x/d6/b0/7b/d6b07b9d0ee3df0168945910e2142bf5--black-butler-kuroshitsuji-shinigami.jpg",
      book_author: "WiessMan",
      book_details_shown:
        "Black Butler (Japanese: 黒執事 Hepburn: Kuroshitsuji) is a Japanese manga series written and illustrated by Yana Toboso. Since its debut on September 16, 2006,",
      book_details_hidden:
        " it has been serialized in Gangan Comics sshōnen manga magazine Monthly GFantasy. ... A live action film adaptation was released in Japan on January 18, 2014"
    },
    {
      book_title: "Gal Gohan",
      book_image:
        "http://momoandcream.com/wp-content/uploads/2015/03/Nisekoi-volume-1-cover.jpg",
      book_author: "Loyd",
      book_details_shown:
        'Home Economics Teacher, Shinji Yabe, is asked by the biggest gyaru in school, Miku Okazaki, to help her "bake cookies to give to the teachers". The principal told her to do this, after she flunked every subject and makeup-class they put her in. He gets her to successfully finish a batch of cookies after several mishaps and is touched by his students glee over her success.',
      book_details_hidden:
        "He decides to start a cooking club after this experience to get more time and connection with his students. Upon hearing this, Miku decides to join, since he was the first teacher that didnt shove her into makeup-lessons after her failings and pushed her to try harder instead."
    }
  ];

  res.status(200).json({
    message: "User fetched successfully!",
    book_details: book_details
  });
});
app.use("/api/authordata", (req, res, next) => {
  const author_details = [
    {
      author_name: "Meguru Ueno",
      author_image:
        "https://i.paigeeworld.com/user-media/1447891200000/55ae8c1544941e41e4a7925a_564e322f05e9bcd58f01dae9_320.jpg",
      author_followers: "20,334",
      author_details_shown:
        "It has been serialized in Kadokawa Shotens shōnen manga magazine Monthly Shōnen Ace since November 2015, and has been collected in seven tankōbon volumes.",
      author_details_hidden:
        "A 10-episode anime television series adaptation by NAZ aired from July 12, 2017 to September 13, 2017."
    },
    {
      author_name: "Yana Toboso",
      author_image: "https://data.whicdn.com/images/195405628/large.jpg",
      author_followers: "13,223",
      author_details_shown:
        "Yana Toboso (枢 やな, Toboso Yana), born January 24, 1984, and known by her other pen names Yanao Rock and Takaragi Yana, is a Japanese manga artist. Her most significant work is the manga series Kuroshitsuji.",
      author_details_hidden:
        "She currently lives in Yokohama, Kanagawa Prefecture. Yana Toboso draws herself as a devil with a black body and horns, a round white head, and a pointed tail. Toboso is now thirty-four years old, and there are currently no known pictures and documents of Tobosos real appearance given to the public"
    },
    {
      author_name: "Loyd",
      author_image:
        "https://i.pinimg.com/originals/2b/be/76/2bbe76c039a57c17d1779509dba6ea84.jpg",
      author_followers: "113,435",
      author_details_shown:
        "Loyd de la Cruz is the New York Times and USA Today best-selling author of many critically acclaimed and award-winning novels for teens including The Au Pairs series, the Blue Bloods series, the Ashleys series, the Angels on Sunset Boulevard series and the semi-autobiographical novel Fresh off the Boat. Her books for adults include the novel Cat’s Meow, the anthology Girls Who Like Boys Who Like Boys and the tongue-in-chic handbooks How to Become Famous in Two Weeks or Less and The Fashionista Files: Adventures in Four-inch heels and Faux-Pas. She has worked as a fashion and beauty editor and has written for many publications including The New York Times, Marie Claire, Harper’s Bazaar, Glamour, Cosmopolitan, Allure, The San Francisco",
      author_details_hidden:
        "Chronicle, McSweeney’s, Teen Vogue, CosmoGirl! and Seventeen. She has also appeared as an expert on fashion, trends and fame for CNN, E! and FoxNews. Melissa grew up in Manila and moved to San Francisco with her family, where she graduated high school salutatorian from The Convent of the Sacred Heart. She majored in art history and English at Columbia University and minored in nightclubs and shopping!. She now divides her time between New York and Los Angeles, where she lives in the Hollywood Hills with her husband and daughter."
    }
  ];

  res.status(200).json({
    message: "User fetched successfully!",
    author_details: author_details
  });
});
app.use("/api/authorbook", (req, res, next) => {
  const suggestedauthorbook_details = [
    {
      suggestedauthorbook_title: "OverLord",
      suggestedauthorbook_image:
        "https://cdn.myanimelist.net/images/manga/3/161407.jpg",
      suggestedauthorbook_author: "Wiesman"
    },
    {
      suggestedauthorbook_title: "Hero Academia",
      suggestedauthorbook_image:
        "https://mangahelpers.com/forum/media/wsj-cover-issue-9-2016.19683/full?d=1454154995",
      suggestedauthorbook_author: "Wiesman"
    },
    {
      suggestedauthorbook_title: "Sword Art Online",
      suggestedauthorbook_image:
        "https://vignette.wikia.nocookie.net/swordartonline/images/1/19/Calibur_Manga_Cover.png/revision/latest?cb=20161009045733",
      suggestedauthorbook_author: "Wiesman"
    },
    {
      suggestedauthorbook_title: "Tokyo Ghoul",
      suggestedauthorbook_image:
        "https://vignette.wikia.nocookie.net/tokyoghoul/images/6/6a/Volume_01.jpg/revision/latest?cb=20161203075330",
      suggestedauthorbook_author: "Wiesman"
    },
    {
      suggestedauthorbook_title: "Tokyo Ghoul Root",
      suggestedauthorbook_image: "https://i.redd.it/9fkinvfcum3z.jpg",
      suggestedauthorbook_author: "Wiesman"
    },
    {
      suggestedauthorbook_title: "Goblin Slayer",
      suggestedauthorbook_image:
        "https://vignette.wikia.nocookie.net/goblin-slayer/images/f/f4/LN_Vol_03_cover.jpg/revision/latest?cb=20180219173004",
      suggestedauthorbook_author: "Wiesman"
    },
    {
      suggestedauthorbook_title: "Danganronpa",
      suggestedauthorbook_image:
        "https://d2lzb5v10mb0lj.cloudfront.net/covers/600/29/29259.jpg",
      suggestedauthorbook_author: "Wiesman"
    },
    {
      suggestedauthorbook_title: "Fuuka",
      suggestedauthorbook_image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/6/62/F%C5%ABka_%28manga%29_cover.jpeg/220px-F%C5%ABka_%28manga%29_cover.jpeg",
      suggestedauthorbook_author: "Wiesman"
    },
    {
      suggestedauthorbook_title: "Gangsta",
      suggestedauthorbook_image:
        "https://iwantedwings.files.wordpress.com/2014/03/1.jpg",
      suggestedauthorbook_author: "Wiesman"
    },
    {
      suggestedauthorbook_title: "Pandora Hearts",
      suggestedauthorbook_image:
        "https://qph.fs.quoracdn.net/main-qimg-1478fcfef2d268deee3d437a8dd725f5.webp",
      suggestedauthorbook_author: "Wiesman"
    }
  ];
  res.status(200).json({
    message: "User fetched successfully!",
    suggestedauthorbook_details: suggestedauthorbook_details
  });
});
app.use("/api/bookDetails", (req, res, next) => {
  const book_details = [
    {
      book_edition: "Kindle Edition, 372 pages",
      book_published: "Published December 1st 2016 by Lake Union Publishing",
      book_ASIN: "B01DF0TM1Y",
      book_language: "English",
      book_title: "黒執事",
      book_awards: "shōnen manga",
      book_characters: "Sebastian, Ceil Phantomhive"
    },
    {
      book_edition: "Prime Edition, 500 pages",
      book_published: "Published October 14th 2014 by Lake Union Publishing",
      book_ASIN: "C11DF0TM1Y",
      book_language: "English",
      book_title: "黒執事",
      book_awards: "Shoujo manga",
      book_characters: "Yami, Jun"
    },
    {
      book_edition: "Beta Edition, 200 pages",
      book_published: "Published Novamber 3rd 2015 by Lake Union Publishing",
      book_ASIN: "DAB0F0TM1Y",
      book_language: "English",
      book_title: "黒執事",
      book_awards: "Shoujo manga",
      book_characters: "Yuma, Akari"
    }
  ];
  res.status(200).json({
    message: "User fetched successfully!",
    book_details: book_details
  });
});

app.use("/api/bookDetails", (req, res, next) => {
  const book_details = [
    {
      book_edition: "Kindle Edition, 372 pages",
      book_published: "Published December 1st 2016 by Lake Union Publishing",
      book_ASIN: "B01DF0TM1Y",
      book_language: "English",
      book_title: "黒執事",
      book_awards: "shōnen manga",
      book_characters: "Sebastian, Ceil Phantomhive"
    },
    {
      book_edition: "Prime Edition, 500 pages",
      book_published: "Published October 14th 2014 by Lake Union Publishing",
      book_ASIN: "C11DF0TM1Y",
      book_language: "English",
      book_title: "黒執事",
      book_awards: "Shoujo manga",
      book_characters: "Yami, Jun"
    },
    {
      book_edition: "Beta Edition, 200 pages",
      book_published: "Published Novamber 3rd 2015 by Lake Union Publishing",
      book_ASIN: "DAB0F0TM1Y",
      book_language: "English",
      book_title: "黒執事",
      book_awards: "Shoujo manga",
      book_characters: "Yuma, Akari"
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
      book_id: 11,
      book_name: "Harry Potter",
      author_name: "J.K Rowling",
      book_cover:
        "https://orig05.deviantart.net/e78f/f/2008/160/f/a/harry_potter_by_jonathan3333.jpg",
      state: "read"
    },
    {
      book_id: 12,
      book_name: "Game of Thrones",
      author_name: "G.R.R Martin",
      book_cover:
        "https://tse2.mm.bing.net/th?id=OIP.FN55nUOxccDTpCPhYOmVfgHaLU&pid=15.1&P=0&w=300&h=300",
      state: "read"
    },
    {
      book_id: 13,
      book_name: "Lord of the Rings",
      author_name: "J.R.R Tolkien",
      book_cover:
        "https://tse4.mm.bing.net/th?id=OIP.FZz1UZSbw_p_m5hdjUOM3AHaLF&pid=15.1&P=0&w=300&h=300",
      state: "want to read"
    }
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    Books: Books
  });
});

app.use("/api/title", (req, res, next) => {
    const User_Info = {
        user_id: 1,
        User_Name: 'Mohamed Medhat',
        User_Photo: 'https://tse4.mm.bing.net/th?id=OIP.FZz1UZSbw_p_m5hdjUOM3AHaLF&pid=15.1&P=0&w=300&h=300'
    };

  res.status(200).json({
    message: "User fetched successfully!",
    User_Info: User_Info
  });
});

app.post("/api/sign-in", (req, res, next) => {
  email = "omar@gmail.com";
  pass = "1234";

  console.log('data' , req.body)

  if ((req.body.email == email) & (pass == req.body.pass))
    res.status(200).json({
      message: "You entered the data correctly"
    });
  else
    res.status(200).json({
      message: "you entered the wrong data"
    });
});
app.post("/api/sign-up", (req, res, next) => {
  Name="Omar Osama"
  email = "omar@gmail.com";
  pass = "1234";



  console.log('data' , req.body)



  if ((req.body.email == email) & (pass == req.body.pass) & (req.body.Name == Name))
    res.status(200).json({
      message: "you entered the data correctly"
    });
  else
    res.status(200).json({
      message: "you entered the wrong data"
    });
});

port = 3001
app.listen(port, () => console.log('Example app listening on port ${port}!'))
module.exports = app;
