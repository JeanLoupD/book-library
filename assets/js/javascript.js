// form fields values
const newTitle = document.getElementById('title');
const newAuthor = document.getElementById('author');
const newTotal = document.getElementById('pages');
const newDate = document.getElementById('publish_date');
const newStatus = document.getElementById('status');

//form submit button
const addBtn = document.getElementById('addBtn');

// form error message
let error = document.getElementById('errorMsg');

let statusBtn;
let bookStatus;
let delBtn;

//books array
let bookLibrary = [];

//book constructor
function Book(title, author, pages, date, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.date = date;
    this.read = read;
}

// creating books
const myBook = new Book("Papillon", "Henri Charrière", "555", "1959", "Read");
bookLibrary.push(myBook);
const myBook2 = new Book("1984", "George Orwell", "400", "1949", "Read");
bookLibrary.push(myBook2);
const myBook3 = new Book("Catch 22", "Joseph Heller", "638", "1961", "Not Read");
bookLibrary.push(myBook3);

// fields validation function
function validateFields(event) {
    event.preventDefault();

    if (!newTitle.value || !newAuthor.value || !newTotal.value || !newDate.value) {
        error.classList.remove('invisible');
        error.classList.add('visible');

        return false;
    } else {
        error.classList.remove('visible');
        error.classList.add('invisible');

        return true;
    }
}

//Function to create a new object of a book
function addBookToLibrary() {
    let title = newTitle.value;
    let author = newAuthor.value;
    let pages = newTotal.value;
    let date = newDate.value;
    let statusText = newStatus.options[newStatus.selectedIndex].text;
    let newBook = new Book(title, author, pages, date, statusText);

    bookLibrary.push(newBook);
}

// function to display the default books
function displayDefaultBooks() {
    bookLibrary.forEach((obj, index) => {
        // calling the create book element function
        createBookHtmlElement(obj, index);
    });
}

// Function to display the new book on the html page
function displayNewBooks() {
    bookLibrary.forEach((obj, index, arr) => {
        if (index === arr.length - 1) {
            // calling the create book element function
            createBookHtmlElement(obj, index);
        }
    });
}

// function to create book html elements
function createBookHtmlElement(obj, index) {
    // card parent container
    const mainCtn = document.getElementById('cardContainer');

    // flex container
    const flexCtn = document.createElement('div');
    flexCtn.classList.add('flex');

    // card container
    const cardCtn = document.createElement('div');
    cardCtn.classList.add('flex', 'flex-col', 'p-3', 'bg-gray-100');
    cardCtn.setAttribute('id', 'card-' + index);
    mainCtn.appendChild(cardCtn);

    // book title
    const bookTitle = document.createElement('h2');
    bookTitle.classList.add('font-myFont', 'text-xl', 'font-bold', 'tracking-wide', 'text-myDarkGreen', 'mb-5');
    bookTitle.textContent = obj.title;
    cardCtn.appendChild(bookTitle);

    // card inner container
    const cardInnerCtn = document.createElement('div');
    cardInnerCtn.classList.add('flex', 'flex-col', 'justify-end', 'h-full');
    cardCtn.appendChild(cardInnerCtn);

    // author and pages number container
    const authorCtn = document.createElement('div');
    authorCtn.classList.add('flex', 'justify-between', 'mb-2');
    cardInnerCtn.appendChild(authorCtn);

    // book author
    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('text-base')
    bookAuthor.textContent = 'By: ' + obj.author;

    // book pages
    const bookPages = document.createElement('p');
    bookPages.classList.add('text-base')
    bookPages.textContent = obj.pages + ' pages';
    authorCtn.appendChild(bookAuthor);
    authorCtn.appendChild(bookPages);

    // year container
    const yearCtn = document.createElement('div');
    yearCtn.classList.add('flex', 'mb-2');
    cardInnerCtn.appendChild(yearCtn);

    //year of publishing
    const bookYear = document.createElement('p');
    bookYear.classList.add('text-base')
    bookYear.textContent = 'Published: ' + obj.date;
    yearCtn.appendChild(bookYear);

    // status container
    const statusCtn = document.createElement('div');
    statusCtn.classList.add('flex', 'mb-5');
    cardInnerCtn.appendChild(statusCtn);

    // book status
    bookStatus = document.createElement('p');
    bookStatus.classList.add('text-base', 'status-text');
    bookStatus.textContent = 'Status: ' + obj.read;

    //set custom attribute to status button
    bookStatus.setAttribute('id', index);

    // append status to the container
    statusCtn.appendChild(bookStatus);

    // buttons container
    const buttonCtn = document.createElement('div');
    buttonCtn.classList.add('flex', 'justify-between', 'items-center', 'w-full');
    cardInnerCtn.appendChild(buttonCtn);

    // status button
    statusBtn = document.createElement('button');
    statusBtn.textContent = obj.read;

    //set custom attribute to status button
    statusBtn.setAttribute('book-index', index);

    //append button
    buttonCtn.appendChild(statusBtn);

    // setting the button style depending on book status
    if (statusBtn.textContent === "Read") {
        statusBtn.classList.add('bg-myGreen', 'hover:bg-myHoverGreen', 'text-white', 'font-semibold', 'py-1', 'px-4', 'shadow', 'funny-class');
    } else {
        statusBtn.classList.add('bg-myRed', 'hover:bg-myHoverRed', 'text-white', 'font-semibold', 'py-1', 'px-4', 'shadow', 'funny-class');
    }

    //add event listener
    statusBtn.addEventListener('click', function(e) {
        readUnreadButton(e, index);
    });

    // delete button
    delBtn = document.createElement('a');
    delBtn.classList.add('w-8', 'h-8');
    delBtn.setAttribute('href', '#');
    //add event listener
    delBtn.addEventListener('click', function(e) {
        deleteBook(cardCtn);
    });

    // icon for the delete button
    const trashIcon = document.createElement('img');
    trashIcon.src = 'assets/icons/trash-can.png';
    delBtn.appendChild(trashIcon);

    // append delete button
    buttonCtn.appendChild(delBtn);
}

// function to delete a book from the array
function deleteBook(card) {
    // get the index from the card's ID
    const index = parseInt(card.id.replace("card-", ""));

    if (index >= 0 && index < bookLibrary.length) {
        bookLibrary.splice(index, 1);
        
        // remove the card from the HTML
        card.remove();

        // update the id of the remaining cards
        const remainingCards = document.querySelectorAll('.bg-gray-100');
        remainingCards.forEach((remainingCard, newIndex) => {
            remainingCard.setAttribute('id', 'card-' + newIndex);
        });

        // update the book-index attributes of the status buttons
        const statusButtons = document.querySelectorAll('.funny-class');
        statusButtons.forEach((statusBtn, newIndex) => {
            statusBtn.setAttribute('book-index', newIndex);
        });
    } else {
        console.error('Invalid index:', index);
    }
}

// function to set/unset de read button status
function readUnreadButton(event, index) {
    //save event listener into a variable
    const btnClicked = event.target;

    //get element using attribute
    const bookIndex = btnClicked.getAttribute('book-index');

    //get book from array using index
    const book = bookLibrary[bookIndex];

    const testIndex = document.getElementById('card-' + bookIndex);

    //check status of book
    if (book.read === "Read") {
        book.read = "Not Read";
        btnClicked.textContent = "Not Read";
        btnClicked.classList.remove('bg-myGreen', 'hover:bg-myHoverGreen', 'text-white', 'font-semibold', 'py-1', 'px-4', 'shadow', 'funny-class');
        btnClicked.classList.add('bg-myRed', 'hover:bg-myHoverRed', 'text-white', 'font-semibold', 'py-1', 'px-4', 'shadow', 'funny-class');

        testIndex.querySelector('.status-text').textContent = "Status: Not Read";
    } else {
        book.read = "Read";
        btnClicked.textContent = "Read";
        btnClicked.classList.remove('bg-myRed', 'hover:bg-myHoverRed', 'text-white', 'font-semibold', 'py-1', 'px-4', 'shadow', 'funny-class');
        btnClicked.classList.add('bg-myGreen', 'hover:bg-myHoverGreen', 'text-white', 'font-semibold', 'py-1', 'px-4', 'shadow', 'funny-class');

        testIndex.querySelector('.status-text').textContent = "Status: Read";
    }
}

//calling the display function on load to display the first book
displayDefaultBooks();

// add new book button
addBtn.addEventListener('click', (e) => {
    if (validateFields(e)) {
        addBookToLibrary();
        displayNewBooks();
    }
});
