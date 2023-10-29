const books = [];
const RENDER_EVENT = 'render-book';
const STORAGE_KEY = 'BOOKS_LIST';


function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted,
    }
}

function findBook(bookID) {
    for (const bookItem of books) {
        if (bookItem.id === bookID) {
            return bookItem;
        }
    }
}

function findBookIndex(bookID) {
    for (const bookItem of books) {
        if (bookItem.id === bookID) {
            return books.indexOf(bookItem);
        }
    }
    return -1;
}

function searchingBooks(value) {
    data = value.toUpperCase();

    if (books !== null) {
        for (const book of books) {
            if (book.title.toUpperCase().indexOf(data) > -1) {
                document.getElementById('bookCard-' + book.id).style.display = '';
            } else {
                document.getElementById('bookCard-' + book.id).style.display = 'none';
            }
        }

    }

}

function makeFormUpdate(bookObject) {
    return `
    <h2 class="text-white text-xl font-bold text-center bg-fuchsia-800 p-2 rounded-md mb-4 uppercase">Edit Book Details</h2>
    <div class="flex md:flex-row flex-col items-start p-2">
        <label for="editBookTitle" class="basis-1/4 text-fuchsia-800 text-md font-bold mb-1">Title</label>
        <input id="editBookTitle" value="${bookObject.title}" type="text" class="basis-3/4 w-full p-2 pl-5 text-gray-900 border border-fuchsia-400 rounded-md bg-gray-50 focus:border-fuchsia-800 font-medium" required>
    </div>
    <div class="flex md:flex-row flex-col items-start p-2">
        <label for="editBookAuthor" class="basis-1/4 text-fuchsia-800 text-md font-bold mb-1">Writer</label>
        <input id="editBookAuthor" value="${bookObject.author}" type="text" class="basis-3/4 w-full p-2 pl-5 text-gray-900 border border-fuchsia-400 rounded-md bg-gray-50 focus:border-fuchsia-800 font-medium" required>
    </div>
    <div class="flex md:flex-row flex-col items-start p-2">
        <label for="editBookYear" class="basis-1/4 text-fuchsia-800 text-md font-bold mb-1">Year</label>
        <input id="editBookYear" value="${bookObject.year}" type="number" class="basis-3/4 w-full p-2 pl-5 text-gray-900 border border-fuchsia-400 rounded-md bg-gray-50 focus:border-fuchsia-800 font-medium" required>
    </div>
    <div class="flex items-center p-2">
        <label for="editBookIsComplete" class="text-fuchsia-800 text-md font-bold mr-4">Complete Read</label>
        <input id="editBookIsComplete" class="w-4 h-4 rounded-sm" type="checkbox">
    </div>
    `;
}

function makeBookCard(bookObject) {
    let buttonCard = ``;
    if (!bookObject.isCompleted) {
        buttonCard = `
        <button class="text-xs p-2 text-white font-semibold bg-teal-600 hover:bg-teal-800 rounded-sm" onclick="addBookToCompleted(${bookObject.id})">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
        </svg>
        </button>
        <button class="text-xs p-2 text-white font-semibold bg-amber-600 hover:bg-amber-800 rounded-sm" onclick="editDetailBook(${bookObject.id})">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
        </svg>
        </button>
        `;
    }
    else {
        buttonCard = `
        <button class="text-xs p-2 text-white font-semibold bg-sky-600 hover:bg-sky-800 rounded-sm" onclick="undoBookFromCompleted(${bookObject.id})">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clip-rule="evenodd" />
            </svg>                          
        </button>
        <button class="text-xs p-2 text-white font-semibold bg-rose-600 hover:bg-rose-800 rounded-sm" onclick="alertDeleteConfirmation(${bookObject.id})">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
        </svg>
        </button>
        `;
    };

    const bookcard = `
    <article id="bookCard-${bookObject.id}" class="p-4 border bg-gray-50 hover:bg-fuchsia-200 border-fuchsia-800 rounded-md shadow">
        <h3 class="pb-1 text-lg text-fuchsia-800 font-bold leading-5 line-clamp-1 hover:line-clamp-none">${bookObject.title}</h3>
        <div class="grid grid-cols-3 mt-3">
        <div class="flex flex-col items-center col-span-2 bg-fuchsia-200 border px-5 py-2 rounded-md">
            <p class="text-xs text-fuchsia-800 font-medium line-clamp-1 hover:line-clamp-none"> Write by :</p>
            <p class="text-md text-fuchsia-800 font-medium text-center">${bookObject.author} - ${bookObject.year} </p>
        </div>
        <div class="col-span-1 flex justify-end gap-2 items-center">${buttonCard}</div>
        </div>
    </article>
        `;

    return bookcard;
}

function resetFormInput() {
    document.getElementById('inputBookTitle').value = '';
    document.getElementById('inputBookAuthor').value = '';
    document.getElementById('inputBookYear').value = '';
    document.getElementById('inputBookIsComplete').checked = false;

}

function addBook() {
    const bookID = generateId();
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    const bookIsComplete = document.getElementById('inputBookIsComplete').checked;

    const bookObject = generateBookObject(bookID, bookTitle, bookAuthor, Number(bookYear), bookIsComplete);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    resetFormInput();
    alertInfo('add', bookTitle, 'to');
}

function addBookToCompleted(bookID) {
    const targetBook = findBook(bookID);

    if (targetBook == null) return;

    targetBook.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    alertInfo('complete', targetBook.title, 'from Incomplete');

}

function editDetailBook(bookID) {
    const targetBook = findBook(bookID);
    alertEditData(targetBook);
}

function updateDetailBook(updateBookObject) {
    const targetBook = findBook(updateBookObject.id);
    if (targetBook == null) return;

    targetBook.title = updateBookObject.title;
    targetBook.author = updateBookObject.author;
    targetBook.year = Number(updateBookObject.year);
    targetBook.isCompleted = updateBookObject.isCompleted;

    document.dispatchEvent(new Event(RENDER_EVENT));
    alertInfo('update', targetBook.title, 'on');
}

function removeBookFromCompleted(bookID) {
    const targetBook = findBookIndex(bookID);
    const titleBook = findBook(bookID);
    if (targetBook === -1) return;

    books.splice(targetBook, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    alertInfo('remove', titleBook.title, 'from');
}

function undoBookFromCompleted(bookID) {
    const targetBook = findBook(bookID);
    if (targetBook === null) return;
    targetBook.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    alertInfo('undo', targetBook.title, 'from complete');
}

function saveBookData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
    }
}


function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const storageData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(storageData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}



document.addEventListener('DOMContentLoaded', function () {
    const buttonSubmit = document.getElementById('inputBook');
    const inputSearch = document.getElementById('searchBookTitle');

    buttonSubmit.addEventListener('submit', function (e) {
        e.preventDefault();
        addBook();
    });
    inputSearch.addEventListener('keyup', function (e) {
        searchingBooks(inputSearch.value);
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener(RENDER_EVENT, function () {
    let uncompletebookCard = '';
    let completebookCard = '';

    const uncompleteBookSection = document.getElementById('incompleteBookshelfList');
    const completeBookSection = document.getElementById('completeBookshelfList');

    for (const bookItem of books) {
        if (!bookItem.isCompleted) {
            uncompletebookCard += makeBookCard(bookItem);
        } else {
            completebookCard += makeBookCard(bookItem);
        }
    }

    uncompleteBookSection.innerHTML = uncompletebookCard;
    completeBookSection.innerHTML = completebookCard;

    saveBookData();
});

function alertInfo(action, title, des) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: `Successfully <b>${action}</b> "${title}" ${des} BookShelf`
    })
}

function alertDeleteConfirmation(bookID) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            removeBookFromCompleted(bookID)
        }
    })
}


async function alertEditData(params) {
    const { value: formValues } = await Swal.fire({
        html: makeFormUpdate(params),
        showCancelButton: true,
        confirmButtonText: 'Update Data',
        confirmButtonColor: '#86198f',
        focusConfirm: false,
        preConfirm: function () {
            return {
                id: params.id,
                title: document.getElementById('editBookTitle').value,
                author: document.getElementById('editBookAuthor').value,
                year: document.getElementById('editBookYear').value,
                isCompleted: document.getElementById('editBookIsComplete').checked
            }
        }
    });

    if (formValues) {
        updateDetailBook(formValues);
    }
}
