const newBook = document.querySelector("#addbook");
const showDialog = document.querySelector("#showdialog");
const closeDialog = document.querySelector("#cancel");
const getValue = document.querySelector('#confirm');

const myLibrary = [];

function Book(book, author, page, read) {
    this.book = book;
    this.author = author;
    this.page = page;
    this.read = read;
}

// Sửa phương thức toggleReadStatus
Book.prototype.toggleReadStatus = function() {
    this.read = this.read === 'Read' ? 'Unread' : 'Read';
};

function addBookToLibrary(book) {
    myLibrary.push(book);
    Display();
}

newBook.addEventListener("click", () => {
    showDialog.showModal();
});

closeDialog.addEventListener('click', () => {
    showDialog.close();
});

getValue.addEventListener('click', (event) => {
    event.preventDefault();
    const nameBook = document.getElementById("name").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("page").value;
    const readStatus = document.getElementById("status").value;
    const newBook = new Book(nameBook, author, pages, readStatus);
    addBookToLibrary(newBook);
    console.log(myLibrary);
    showDialog.close();
});

function Display() {
    const displayBook = document.getElementById('booklist');
    displayBook.innerHTML = '';
    for (let book of myLibrary) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.book}</td>
            <td>${book.author}</td>
            <td>${book.page}</td>
            <td>
                <button class="toggle-read" data-index="${myLibrary.indexOf(book)}">
                    ${book.read === 'Read' ? 'Unread' : 'Read'}
                </button>
            </td>
            <td><button class="remove" data-index="${myLibrary.indexOf(book)}">Remove</button></td>
        `;
        displayBook.appendChild(row);
    }

    // Thêm sự kiện cho các nút xóa
    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeBook);
    });

    // Thêm sự kiện cho các nút chuyển đổi trạng thái
    const toggleButtons = document.querySelectorAll('.toggle-read');
    toggleButtons.forEach(button => {
        button.addEventListener('click', toggleReadStatus);
    });
}

function toggleReadStatus(event) {
    const index = event.target.dataset.index; // Lấy index từ thuộc tính data
    myLibrary[index].toggleReadStatus(); // Gọi phương thức toggleReadStatus
    Display(); // Cập nhật lại danh sách hiển thị
}

function removeBook(event) {
    const index = event.target.dataset.index; // Lấy index từ thuộc tính data
    myLibrary.splice(index, 1); // Xóa sách khỏi myLibrary
    Display(); // Cập nhật lại danh sách hiển thị
}
