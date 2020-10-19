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
    static showAlert(message, className){
      const div = document.createElement('div');
      div.className = ` alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const contariner = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      contariner.insertBefore(div,form);

      setTimeout(() => document.querySelector('.alert').remove(), 3000);
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
       if ( title === '' || author === '' || isbn === ''){
         UI.showAlert('Please fill in all fields!', 'danger');
       }else {
        const book = new Book ( title, author , isbn);
    
        UI.addBookList(book);
        
        UI.showAlert('Book Added', 'success');
        UI.clearField();
       }
    
});
// remove a book 
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  UI.showAlert('Book Removed', 'warning');
});







