function renderBooksTable(books) {
    if (!books.length) return;
    var strHtmls = books.map(function (book) {
        return `
        <tr onclick="onReadBook(${book.id},event)">
            <th scope="row" class="book-td cell">${book.id}</th>
            <td class="book-td cell}">${book.title}</td>
            <td class="price-td book-td cell}">${formatCurrency(book.price)}</td>
            <td class="book-td cell}"><button type="button" data-trans="read-book" class="btn btn-info my-btn" onclick="onReadBook(${book.id},event);">Read</button></td>
            <td class="book-td cell}"><button data-trans="update-book" data-toggle="modal"  data-target="#updateBookModal" class="btn  update-btn my-btn" onclick="onUpdateBook(${book.id},event)">Update</button></td>
            <td class="book-td cell}"><button data-trans="delete-book" class=" btn btn-danger my-btn" onclick="onRemoveBook(${book.id}event)">Delete</button></td>
                </tr>
        `
    })
    document.querySelector('.books-table tbody').innerHTML = strHtmls.join('')
    transBooksTableBtns()
    addfadeModalListeners();
}

function onInit() {
    renderBooksTable(getBooksForDisplay());
    doTrans();
    updatePageNums(gPageIdx);
    fadeModal();
}

function onAddBook() {
    var elName = document.querySelector('.add-book-name input')
    var elPrice = document.querySelector('.add-book-price input')
    elName.parentNode.hidden = !elName.parentNode.hidden;
    elPrice.parentNode.hidden = !elPrice.parentNode.hidden;
    if (elName.value && elPrice.value) {
        var name = elName.value;
        var price = +elPrice.value;
        addBook(name, price);
        renderBooksTable(getBooksForDisplay());
        elName.value = '';
        elPrice.value = '';
    }
}

function onChangePage(adder) {
    changePage(adder);
    var books = getBooksForDisplay()
    if (!books.length && adder > 0) {
        gPageIdx = 0
        books = getBooksForDisplay();
    } else if (!books.length && adder < 0) {
        gPageIdx = 0;
        return;
    }
    renderBooksTable(books);
    updatePageNums(gPageIdx);
}

function onChoosePage(pageNum) {
    choosePage(pageNum);
    var books = getBooksForDisplay()
    updatePageNums(pageNum);
    renderBooksTable(books);
}

function onSortBy(value) {
    sortBy(value);
    renderBooksTable(getBooksForDisplay());
}

function onRemoveBook(bookId,ev) {
    ev.stopPropagation();
    removeBook(bookId);
    renderBooksTable(getBooksForDisplay());
}

function onUpdateBook(bookId,ev) {
    ev.stopPropagation();
    updateBook(bookId,newPrice)
    // var newPrice = document.querySelector('')
    // updateBook(bookId, newPrice);
    // renderBooksTable(getBooksForDisplay());
}


function onReadBook(bookId,ev) {
    ev.stopPropagation()
    var book = getBookById(bookId);
    var elCanvas = document.querySelector('.offcanvas-aside')
    toggleCanvas();
    elCanvas.querySelector('h3').innerText = book.title
    elCanvas.querySelector('h5').innerText = 'Price: ' + book.price + '$';
    elCanvas.querySelector('p').innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada venenatis magna, eget rutrum neque mattis at. Mauris non ornare urna. Aenean pellentesque est quis metus viverra, eu tincidunt felis porttitor. Maecenas consectetur nulla sed mauris sollicitudin, eget varius augue faucibus'
    elCanvas.querySelector('img').src = book.img;
}

function onChangeRating(adder) {
    var elRating = document.querySelector('input[name=rating]');
    if (!+elRating.value && adder < 0) return;
    if (+elRating.value > 9 && adder > 0) return;
    elRating.value = +elRating.value + adder;
}

function onCloseModal() {
    var elModal = document.querySelector('.book-modal')
    toggleDisplay(elModal);
}

function onChangeLang(value) {
    setLang(value);
    renderBooksTable(getBooksForDisplay());
    doTrans();

}

function addfadeModalListeners() {
    $('.update-btn').click(function(){
        console.log('hello');
        document.querySelector('.my-modal').classList.toggle('my-modal-open');
    })
}