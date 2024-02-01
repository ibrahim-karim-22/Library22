document.addEventListener("DOMContentLoaded", function() {

document.querySelector("#countBooksBtn").addEventListener('click', function() {
    Library.getAvailableBooks();
});
});
document.addEventListener("DOMContentLoaded", function() {

    document.querySelector("#checkOutBtn").addEventListener('click', function() {
        Library.promptCheckOutBook();
    });
});
document.addEventListener("DOMContentLoaded", function() {

    document.querySelector("#addBookBtn").addEventListener('click', function() {
        Library.promptAddBook();
    });
});



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
        document.getElementById("addBookDisplay").textContent = `'${title}' by '${author}' was added`;
        document.getElementById("addBookDisplay").style.color = "green";  // Changes the text color to blue
        document.getElementById("addBookDisplay").style.fontFamily = 'Sixtyfour', 'sans-serif';  // Changes the font to Arial
        document.getElementById("addBookDisplay").style.fontSize = "22px"; 
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
             //for try methos to work must define declare found to false and must start a loop to check for errors?:
            let found = false;
            try{
                //loop that will check the book entered is available in the books array:
                for (let book of this.books) {
            if (book.title === title && book.available) {
                found = true;
                book.available = false;
                //console log the book checked out if it matches during any iterations of the loop
                console.log(`Checked out: ${book.title}`)
                //update UI to reflect the book is checked out
                document.getElementById("checkOutDisplay").textContent = `Checked Out:  ${book.title}`;
                document.getElementById("checkOutDisplay").style.color = "green";  // Changes the text color to blue
                document.getElementById("checkOutDisplay").style.fontFamily ='Sixtyfour', 'sans-serif';  // Changes the font to Arial
                document.getElementById("checkOutDisplay").style.fontSize = "22px"; 
                //exit the loop:
                break;
                }
            }
            if (!found) throw new Error(`The book: "${title}" was not found or already checked out.`);
        } catch(error) {
            console.error(error.message);
            document.getElementById("checkOutDisplay").textContent = `'${title}' (not found)`;
            document.getElementById("checkOutDisplay").style.color = "green";  // Changes the text color to blue
            document.getElementById("checkOutDisplay").style.fontFamily = 'Sixtyfour', 'sans-serif';  // Changes the font to Arial
            document.getElementById("checkOutDisplay").style.fontSize = "22px"; 
        }
    //}
    },//comma required between methods//
    //available books method to list all available books on the library shelves:
    getAvailableBooks: function() {
        //every time getAvailableBooks is executed, it not only processes the list of available books but also updates the button's text to display the current count of available books.
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

        const availableBooks = Library.books.filter(book => book.available);
        const countBtn = document.querySelector("#countBooksBtn");
        countBtn.textContent = `Available Books ${availableBooks.length} (press to update)`;
        document.getElementById("countDisplay").textContent = `There are ${bookList.join(", ")}`;
        document.getElementById("countDisplay").style.color = "green";  // Changes the text color to blue
        document.getElementById("countDisplay").style.fontFamily = 'Sixtyfour', 'sans-serif';  // Changes the font to Arial
        document.getElementById("countDisplay").style.fontSize = "22px"; 
    },
         promptCheckOutBook: function(title) {
        // Prompt the user to enter the book title
        var title = prompt("Please enter the title of the book you want to check out:");
        
        // Check if the user entered a book title
        if (title) {
            // Call your checkOutBook method using the entered book title
            Library.checkOutBook(title);
        } else {
            // Handle the case where no book title was entered
            console.log("No book title entered.");
            // Optionally update the UI to inform the user
            document.getElementById("checkOutDisplay").textContent = "No book title entered. Copy and paste from library above or type in exact book title";
            document.getElementById("checkOutDisplay").style.color = "green";  // Changes the text color to blue
            document.getElementById("checkOutDisplay").style.fontFamily = 'Sixtyfour', 'sans-serif';  // Changes the font to Arial
            document.getElementById("checkOutDisplay").style.fontSize = "22px"; 
        }
    },
        promptAddBook: function(title, author) {
        title = prompt("Enter the book title:");
        author = prompt("Enter the author's name:");
        if (title && author) { // Make sure the user entered both title and author
            Library.addBook(title, author); // Assuming `library` is your Library instance
            document.getElementById("addBookDisplay").textContent = `Added "${title}" by ${author} to the library!`;
            document.getElementById("addBookDisplay").style.color = "green";  // Changes the text color to blue
            document.getElementById("addBookDisplay").style.fontFamily = 'Sixtyfour', 'sans-serif';  // Changes the font to Arial
            document.getElementById("addBookDisplay").style.fontSize = "22px"; 
        } else {
            document.getElementById("addBookDisplay").textContent = "You must enter both a title and an author.";
            document.getElementById("addBookDisplay").style.color = "green";  // Changes the text color to blue
            document.getElementById("addBookDisplay").style.fontFamily = 'Sixtyfour', 'sans-serif';  // Changes the font to Arial
            document.getElementById("addBookDisplay").style.fontSize = "22px"; 
        }
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
//Library.addBook("Eloquent JavaScript", "Marijn Haverbeke");
receiveBooks(newBooks);
console.log(`There are currently ${Library.books.length} books in the library's database.`);
Library.checkOutBook("No book title entered. Copy and paste from library above or type in exact book title");
//Library.promptCheckOutBook();
//Library.promptAddBook();
//Library.checkOutBook("Grokking the Coding Interview");
Library.getAvailableBooks();    

