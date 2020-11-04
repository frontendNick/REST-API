const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');

const books = [
    {
        id: 1,
        title: 'The first man on the planet.',
        author: 'Unknown',
        pages: 137
    },
    {
        id: 2,
        title: 'The Game Shit',
        author: 'The one',
        pages: 2
    },
    {
        id: 3,
        title: 'The last man on the platen',
        author: 'The last',
        pages: 32323
    }
]

router.get( '/', ( req, res, next) => {
    res.json(books)
})
router.get( '/:id', ( req, res, next) => {
    //  понеслась
    const booksId = parseInt(req.params.id, 10)
    const book = books.find(book => book.id === booksId)
    if (book){
        return res.json(book)
    } else {
        res.status(404).json({
            status: 'Not found'
        })
    }
})

//  post - добавление данных
router.post('/', (req, res, next) => {
    const book = {
        title: req.body.title || 'default',
        author: req.body.author || 'default',
        //  уникальный айди
        id: uuidv4()
    }
    books.push(book)
    return res.json(book)
})

//  put - обновление данных
router.put('/:id', ( req, res, next ) => {
    const booksId = parseInt(req.params.id, 10)
    const book = books.find(book => book.id === booksId)
    if (book){
        book.title = req.body.title
        book.author = req.body.author
    }
    return res.json(book)
})

//  delete
router.delete('/:id', ( req, res, next ) => {
    const booksId = parseInt(req.params.id, 10)
    //  не давать одинаковых названий блять переменным
    const returnedBooks = books.filter(book => book.id !== booksId)
    const existBook = returnedBooks.find(book => book.id === booksId)

    if (!existBook){
        return res.send(`Book with id '${booksId}' was deleted`).status(200)
    } else {
        return res.send('Smth wrond').status(400)
    }
})

module.exports = router
