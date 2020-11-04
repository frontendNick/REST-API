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

module.exports = router
