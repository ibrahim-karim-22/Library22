document.querySelector("#countBooksBtn").addEventListener('click', getAvailableBooks)
//create a class and constructor for Books:
//available parameter default value is set to true.
class Books {
    constructor(title, author, available = true) {
        //set parameters as properties of the object: 
        this.title = title;
        this.author = author;
        this.available = available;
    }
}
//create methods to manage books:
//create Library object:
const Library = {
    //array of books called books:
    books: [],
    //Methods to manage the books array:
    //method to add a new book too the library when a patron donates a book:
    //or addBook(title, author)
    addBook: function(title, author) {
        //create a sub class:
        const book = new Books(title, author);
        //add book to the books array by pushin sub class to main class:
        this.books.push(book);
        //console log a message to confirm book addition:
        console.log(`Added "${book.title}" by ${book.author} to the library! There are now ${this.books.length} books
        in the library's database.`)
    }, // comma rerquired between methods //
    /*method for when a library patron requests a specific book by its title, check to see if its
     available, and if so, check it out by marking it as unavailable */
     //check out method with parameter title:
    checkOutBook: function(title) {
        //a loop that would check if book is avaialble inside of books array:
        //for (let book of this.books) {
            /*if book title entered by user matches a title in the books array and if its available found will be true and the 
            book becomes unavailable from library*/
            //wrap the part in checkOutBook method where an error might occur:
            try{
                //for try methos to work must define declare found to false and must start a loop to check for errors:
                let found = false;
                //loop that will check the book entered is available in the books array:
                for (let book of this.books) {
            if (book.title === title && book.available) {
                found = true;
                book.available = false;
                //console log the book checked out if it matches during any iterations of the loop
                console.log(`Checked out: ${book.title}`)
                //exit the loop:
                break;
                }
            }
            if (!found) throw new Error(`The book: "${title}" was not found or already checked out.`);
        } catch(error) {
            console.error(error.message);
        }
    //}
    },//comma required between methods//
    //available books method to list all available books on the library shelves:
    getAvailableBooks: function() {
        //every time getAvailableBooks is executed, it not only processes the list of available books but also updates the button's text to display the current count of available books.
        const availableBooks = Library.books.filter(book => book.available);
        const countBtn = document.querySelector("#countBooksBtn");
        countBtn.textContent = `Available Books ${availableBooks.length}`;
        //create an array for bookList variable:
        let bookList = []
        //a loop that checks if book is avilable inside the books array:
        for (let book of this.books) {
            //during iteration check if book is available:
            if (book.available) {
                //if so add the booklist array to the book title parameter:
                bookList.push(book.title);
            }
        }
        //console log the amount and list of books in the library:
        console.log(`There are ${bookList.length} titles currently on the shelf: ${bookList.join(", ")}`);
    }

}
//use JSON Data to Add Books to the library:

/* create a JSON string called newBooks to store data about a set of books that the library
    recently ordered and will be revieving from the warehouse*/
const newBooks = `[
    
        {"title": "Eloquent JavaScript", "author": "Marijn Haverbeke"},
        {"title": "JavaScript: The Good Parts", "author": "Douglas Crockford"},
        {"title": "You Don't Know JS: Scope & Closures", "author": "Kyle Simpson"},
        {"title": "Effective JavaScript: 68 Specific Ways to Harness the power of JavaScript", "author": "David Herman"},
        {"title": "JavaScript Patterns", "author": "Stoyan Stefanov"},
        {"title": "Programming JavaScript Applications", "author": "Eric Elliott"},
        {"title": "Functional JavaScript", "author": "Michael Fogus"},
        {"title": "JavaScript: The Defenitive Guide", "author": "David Flanagan"},
        {"title": "Learning JavaScript Design Patterns", "author": "Addy Osmani"},
        {"title": "Node.js Design Patterns", "author": "Mario Casciaro"}
    
   
]`;
function receiveBooks(bookData) {
    console.log(`Adding new books to our shelves!`);
    const booksToAdd = JSON.parse(bookData);
    for (let book of booksToAdd) {
        Library.addBook(book.title, book.author);
    }
}


//tests
//console.log(`There are currently ${Library.books.length} books in the library's database.`);
Library.addBook("Eloquent JavaScript", "Marijn Haverbeke");
receiveBooks(newBooks);
console.log(`There are currently ${Library.books.length} books in the library's database.`);
Library.checkOutBook("Eloquent JavaScript");
Library.checkOutBook("Grokking the Coding Interview");
Library.getAvailableBooks();    
