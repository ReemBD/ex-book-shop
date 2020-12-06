    const BOOKS_STORAGE_KEY = 'booksDB';
const PAGE_SIZE = 5;
var gPageIdx = 0;
var gCurrBookId = 1;
var gBooks;

_createBooks()

function _createBooks() {
    var books = loadFromStorage(BOOKS_STORAGE_KEY)

    if (!books || books.length === 0) {
        books = [
            {
                id: getBookId(),
                title: 'Lord Of The Rings',
                price: 15,
                img: 'https://images-na.ssl-images-amazon.com/images/I/51EstVXM1UL._SX331_BO1,204,203,200_.jpg'
            },
            {
                id: getBookId(),
                title: 'Harry Potter',
                price: 12,
                img: 'https://images-na.ssl-images-amazon.com/images/I/71Q1Iu4suSL._AC_SY741_.jpg'
            },
            {
                id: getBookId(),
                title: '1984',
                price: 10,
                img: 'https://images-na.ssl-images-amazon.com/images/I/91SZSW8qSsL.jpg'
            },
        ];

    }
    gBooks = books;
    gCurrBookId = gBooks.length + 1;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(BOOKS_STORAGE_KEY, gBooks)
}

function addBook(name, price) {
    gBooks.push({
        id: getBookId(),
        title: name,
        price,
        img: getRandomImg()
    })
    _saveBooksToStorage();
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
    gCurrBookId--;
}

function updateBook(bookId, newPrice, newName = null) {
    var book = gBooks.find(function (book) {
        return bookId === book.id;
    })
    book.price = newPrice;
    if (newName) book.name = newName
}

function getBookById(id) {
    var book = gBooks.find(function (book) {
        return book.id === id;
    })
    return book
}

function toggleDisplay(el) {
    el.classList.toggle('display-none')
}

function sortBy(value) {
    gBooks = gBooks.sort(function (book1, book2) {
        if (typeof book1[value] === 'string') return book1[value].localeCompare(book2[value])
        return book1[value] - book2[value];
    })
}

function getBooksForDisplay() {
    var idxStart = gPageIdx * PAGE_SIZE;
    var books = gBooks.slice(idxStart, idxStart + PAGE_SIZE);
    return books;
}
function getRandomImg() {
    return 'https://picsum.photos/130/200'
}
function choosePage(pageNum) {
    if ((pageNum - 1) * PAGE_SIZE >= gBooks.length) return;
    gPageIdx = pageNum - 1;
}

function changePage(adder = 0) {
    gPageIdx += adder;
}

function updatePageNums(pageNum) {
    // var pageNum = pageIdx + 1
    var numOfPages = getPageBtnsNum();
    var pageBtns = [];

    for (var i = 0; i < numOfPages; i++) {
        pageBtns.push(pageNum - Math.floor(numOfPages / 2) + i);
    }
    var delta = (pageBtns[0] < 1) ? 1 - pageBtns[0] : (pageBtns[pageBtns.length - 1] > getLastPage()) ? getLastPage() - pageBtns[pageBtns.length - 1] : 0;
    for (var i = 0; i < pageBtns.length; i++) {
        pageBtns[i] += delta;
    }

    var elPageBtns = document.querySelectorAll('.page-num')
    for (var i = 0; i < elPageBtns.length; i++) {
        elPageBtns[i].hidden = i >= numOfPages;
        elPageBtns[i].innerText = pageBtns[i];
        elPageBtns[i].dataset.page = elPageBtns[i].innerText;
    }
}

function getBookId() {
    return gCurrBookId++
}

function getPageBtnsNum() {
    return Math.min(getLastPage(), 5);
}

function getLastPage() {
    return Math.ceil(gBooks.length / PAGE_SIZE)
}

function toggleCanvas() {
    document.querySelector('.offcanvas-aside').classList.toggle('offcanvas-aside-open');
}

/*
pageIdx = 0;
*/