/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */
const listOfbooks = document.querySelector('.book-list');
const head = document.querySelector('.title-container');
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.bookid = Math.random().toFixed(1);
  }
}

class StoreBook {
  constructor() {
    // Array of objects for the book items
    this.BookData = [];
  }

  // Adding new book
  addBook = (newbook) => {
    this.BookData.push(newbook);
    localStorage.setItem('AllBooks', JSON.stringify(this.BookData));
    DisplayBooks(newbook);
  }

  // Removing book from the list
  removeBook = (bookid) => {
    const rmvbook = document.getElementById(bookid);
    rmvbook.remove();
    removeSuccess();
    this.BookData = this.BookData.filter((x) => x.bookid !== bookid);
    localStorage.setItem('AllBooks', JSON.stringify(this.BookData));
  }
}

const savebook = new StoreBook();
// Get input value
const getformInput = () => {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  const insertbook = new Book(title.value, author.value);
  return insertbook;
};

// Display teh list of books on the web page
let DisplayBooks = (index) => {
  let bgcolor = '';
  if (savebook.BookData.indexOf(index) % 2 !== 0) {
    bgcolor = 'white';
  } else {
    bgcolor = 'light';
  }
  const displaybook = document.createElement('div');
  displaybook.classList.add('book-item');
  displaybook.classList.add(bgcolor);
  displaybook.setAttribute('id', index.bookid);
  displaybook.innerHTML = `<p>${index.title} by ${index.author}</p>`;
  const removeBook = document.createElement('button');
  removeBook.innerHTML = 'Remove';
  removeBook.addEventListener('click', () => savebook.removeBook(index.bookid));
  displaybook.appendChild(removeBook);
  listOfbooks.appendChild(displaybook);
};

const title = document.querySelector('.title');
const author = document.querySelector('.author');
// Add Button
const addnewBook = document.querySelector('.add-btn');
addnewBook.addEventListener('click', () => {
  if (title.value === '' || author.value === '') {
    showAlert();
  } else {
    const item = getformInput();
    savebook.addBook(item);
    success();
  }
});

window.onload = () => {
  savebook.BookData = JSON.parse(localStorage.getItem('AllBooks' || '[]'));
  if (savebook.BookData === null) {
    savebook.BookData = [];
    return;
  }
  savebook.BookData.forEach((item) => DisplayBooks(item));
};



