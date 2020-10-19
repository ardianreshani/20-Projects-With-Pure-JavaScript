// book class 
class Book {
  constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
//ui class
class UI {
  static displayBooks(){
     const StoredBooks = [
       {
         title: 'book one',
         author: 'filani',
         isbn: '353552'
       },
       {
        title: 'book two',
        author: 'filan fisteki',
        isbn: '4444'
      },
     ];
     const books = StoredBooks;

      books.forEach( (book) => UI.addBookList(book) );
  }
  static addBookList(book){
      const list = document.querySelector('#book-list');
      const row = document.createElement('tr');
      row.innerHTML = ` <td>${book.title} </td>
      <td>${book.author} </td>
      <td>${book.isbn} </td>
      <td> <a href="#" class=" btn btn-danger btn-sm delete">X</a></td>
      
      `;
      list.appendChild(row);
  }
  static clearField(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
  static deleteBook(el){
    if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove();
    }
  }
}
// store class


// event dispplay book 
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// event add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const book = new Book ( title, author , isbn);
    
    UI.addBookList(book);

    UI.clearField();
});
// remove a book 
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
});







