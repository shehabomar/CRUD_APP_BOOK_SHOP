import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const dp = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"Mora@1223",
	database:"test"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) =>{
	res.json("hi this is the backend ")
})

app.get("/books", (req, res)=>{
	const q = "SELECT * FROM books"
	dp.query(q, (err,data)=>{
		if(err) return res.json(err)
		return res.json(data)
	})
})

app.post("/books", (req,res)=>{
	const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)"
	const values = [
		req.body.title,
		req.body.desc,
		req.body.price,
		req.body.cover

	];

	dp.query(q, [values], (err,data)=>{
		if(err) return res.json(err)
		return res.json("Book has been added successfully.")
	}) 
})

app.delete("/books/:id", (req,res)=>{
	const bookId = req.params.id;
	const q = "DELETE FROM books WHERE id = ?"

	dp.query(q, [bookId], (err,data)=>{
		if(err) return res.json(err)
		return res.json("Book has been deleted successfully.")
	}) 
})

app.put("/books/:id", (req,res)=>{
	const bookId = req.params.id;
	const q = "UPDATE books SET `title`= ?, `desc`= ?, `price` = ?, `cover` = ? WHERE id = ?"

	const values = [
		req.body.title,
		req.body.desc,
		req.body.price,
		req.body.cover
	]

	dp.query(q, [...values,bookId], (err,data)=>{
		if(err) return res.json(err)
		return res.json("Book has been updated successfully.")
	}) 
})

app.listen(8800, ()=>{
	console.log("connected to backend")
})