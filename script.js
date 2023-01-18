/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */
const listOfbooks = document.querySelector('.book-list');

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

// Display the list of books on the web page
let DisplayBooks = (index) => {
  let bgcolor = '';
  if (savebook.BookData.indexOf(index) % 2 !== 0) {
    bgcolor = 'dark';
  } else {
    bgcolor = 'light';
  }
  const displaybook = document.createElement('div');
  displaybook.classList.add('book-item');
  displaybook.classList.add(bgcolor);
  displaybook.setAttribute('id', index.bookid);
  displaybook.innerHTML = `<p>${index.title} by ${index.author}</p>`;
  const removeBook = document.createElement('button');
  removeBook.classList.add('remove');
  removeBook.innerHTML = 'Remove';
  removeBook.addEventListener('click', () => savebook.removeBook(index.bookid));
  displaybook.appendChild(removeBook);
  listOfbooks.appendChild(displaybook);
};

// Add Button
const addnewBook = document.querySelector('.add-btn');
addnewBook.addEventListener('click', () => {
  const item = getformInput();
  savebook.addBook(item);
});

window.onload = () => {
  savebook.BookData = JSON.parse(localStorage.getItem('AllBooks' || '[]'));
  if (savebook.BookData === null) {
    savebook.BookData = [];
    return;
  }
  savebook.BookData.forEach((item) => DisplayBooks(item));
};

// Get Date function
setInterval(() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate();
  const hour = date.getHours();
  let minute = date.getMinutes();
  let sec = date.getSeconds();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (sec < 10) {
    sec = `0${sec}`;
  }
  const fullTime = `${[month, day, year].join(' ')}, ${[hour, minute, sec].join(':')}`;
  document.getElementById('date').textContent = fullTime;
}, 1000);

// a complete website with navigation
const list = document.getElementById('list');
const addNew = document.getElementById('add-new');
const contact = document.getElementById('contact');
const listBook = document.querySelector('.list-container');
const addNewSect = document.querySelector('.new-book-container');
const contactSect = document.getElementById('contact-sect');

list.addEventListener('click', () => {
  addNewSect.classList.add('non-display');
  listBook.classList.remove('non-display');
  contactSect.classList.add('non-display');
  list.classList.add('active');
  addNew.classList.remove('active');
  contact.classList.remove('active');
});

addNew.addEventListener('click', () => {
  addNewSect.classList.remove('non-display');
  listBook.classList.add('non-display');
  contactSect.classList.add('non-display');
  list.classList.remove('active');
  addNew.classList.add('active');
  contact.classList.remove('active');
});

contact.addEventListener('click', () => {
  addNewSect.classList.add('non-display');
  listBook.classList.add('non-display');
  contactSect.classList.remove('non-display');
  list.classList.remove('active');
  contact.classList.add('active');
  addNew.classList.remove('active');
});
