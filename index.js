const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(express.json())

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

const books =[
    {id:1, title:'Node.js'},
    {id:2, title:'RestFull APi'}
];

app.get('/',(req,res)=>{
    res.json(books);
})

app.get('/:id',(req, res)=>{
    const bookId = parseInt(req.params.id)
    let book = null

   for(let i = 0; i<books.length; i++){
       if (books[i].id === bookId){
           book = books[i]
           }
}
    if(book ===null) {
       res.json({message:'No book found'})
} 
else{
    res.json(book)
}

})
app.post('/add', (req,res)=>{
    const newBook = req.body;
     newBook.id = books.length + 1
    books.push(newBook);    
    res.json(newBook)
})

app.put('/books/:id',(req,res)=>{
    const bookId = parseInt(req.params.id)
    const index = books.findIndex((b)=>b.id ===bookId)
    const newTitle = req.body

   if(index  === -1) {
    return res.status(404).json({error:'No Book Found'})
   }
    
   if(newTitle.title) {
    books[index].title = newTitle.title
   }
   res.json(books[index])
})
app.delete('/delete/:id',(req, res)=>{
    const bookId = parseInt(req.params.id)
    const index = books.findIndex((b)=>b.id===bookId)

    if(index === -1) {
        return res.status(404).json({error:'No Book Found'})
    }
  const removeBook = books.splice(index,1)
  res.json(removeBook[0])
})