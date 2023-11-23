import express from "express"
import mysql from "mysql"
import cors from "cors"
import multer from "multer"

const app=express()

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'crud'
})

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"uploads/");
  },
  filename:(req,file,cb)=>{
    db(null,Date.now()+"-"+file.originalname)
  }
})

const upload=multer({storage})

app.use("/uploads",express.static("uploads"))

app.get('/',(req,res)=>{
    res.send('Hello from backend')
})

app.get('/book',(req,res)=>{
    const getBook='SELECT * FROM book'
    db.query(getBook,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
      console.log(data)
    })
})

app.post('/book',upload.single("cover"),(req,res)=>{
    const createBook='insert into book (`title`,`desc`,`cover`,`price`) values (?)'
    const values=[
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ]
    if(!req.file){
      return res.status(400).send("No file uploaded")
    }res.send("File uploaded successfully")

    db.query(createBook,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json('Book has been created seccessfully!')
    })
})

app.delete("/book/:book_id", (req, res) => {
    const book_id = req.params.book_id;
    const q = " DELETE FROM book WHERE book_id = ? ";
  
    db.query(q, [book_id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
});

app.put("/book/:book_id", (req, res) => {
    const book_id = req.params.book_id;
    const q = "UPDATE book SET `title`=?, `desc`=?, `price`=?, `cover`=? WHERE book_id=?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
      book_id,
    ];
  
    db.query(q, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while updating the book." });
      }
      return res.json(data);
    });
  });

app.listen(8080,()=>{
    console.log('backend running http://localhost:8080')
})