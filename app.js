let books = [];

let example = [
  (book1 = new Book(
    "The Iliad",
    "Homer",
    null,
    534,
    "./images/cover-iliad.png",
    true
  )),
  (book2 = new Book(
    "Of Tears and Saints",
    "Cioran",
    1937,
    287,
    "./images/cover-tears.png",
    true
  )),
  (book3 = new Book(
    "The Black and the Red",
    "Stendhal",
    1830,
    803,
    "./images/cover-the-red.png",
    false
  )),
  (book4 = new Book(
    "The Tunnel",
    "Ernesto Sabato",
    1948,
    312,
    "./images/cover-tunnel.png",
    true
  )),
  (book5 = new Book(
    "Brothers Karamazov",
    "Fyodor Dostoevsky",
    1880,
    840,
    "./images/cover-karamazov.png",
    false
  )),
  (book5 = new Book(
    "Paradise Lost",
    "John Milton",
    1667,
    821,
    "./images/cover-paradise-lost.png",
    false
  )),
  (book6 = new Book(
    "The Unbearable Lightness of Being",
    "Milan Kundera",
    1984,
    320,
    "./images/cover-unbearable.png",
    true
  )),
  (book7 = new Book(
    "Journey to the End of the Night",
    "Celine",
    1932,
    432,
    "./images/cover-journey.png",
    true
  )),
];

example.forEach((book) => {
  books.push(book);
  book.id = books.length - 1;
  renderLibrary("new");
});

function Book(title, author, year, pages, cover, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.cover = cover;
  this.read = read;
}

function showForm() {
  let form = document.querySelector(".form-window-container");
  form.style.display = "block";
  form.style.position = "absolute";
}

function closeFormWindow() {
  let form = document.querySelector(".form-window-container");
  form.style.display = "none";
}

function addBook(e) {
  e.preventDefault();
  let title = document.querySelector("#name");
  let author = document.querySelector("#author");
  let year = document.querySelector("#year");
  let pages = document.querySelector("#pages");
  let cover = document.querySelector("#cover");
  let read = document.querySelector("#yes");
  let bookRead = false;
  if (read.checked) {
    bookRead = true;
  }
  let book = new Book(
    title.value,
    author.value,
    year.value,
    pages.value,
    cover.value,
    bookRead
  );
  books.push(book);
  book.id = books.length - 1;
  renderLibrary("new");
  resetForm([title, author, year, pages, cover], bookRead);
  console.log(books);
}

function resetForm(...args) {
  if (arguments !== null) {
    args[0].forEach((a) => (a.value = ""));
  }
}

function renderLibrary(action, targetId) {
  let library = document.querySelector(".library-contents");
  if (action == "new") {
    let card = createCard(books[books.length - 1]);
    library.appendChild(card);
  }
  if (action == "delete") {
    let targetNode = library.childNodes[targetId];
    library.removeChild(targetNode);
    let cards = library.childNodes;
    cards.forEach((card, index) => {
      let children = card.childNodes;
      let button = children[3];
      button.setAttribute("value", index);
    });
  }
}

function deleteBook(e) {
  let targetId = e.target.value;
  books = books.filter((b) => b.id != targetId);
  books.forEach((b, i) => {
    b.id = i;
  });
  console.log(books);
  renderLibrary("delete", targetId);
}

function createCard(book) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  let title = document.createElement("p");
  let author = document.createElement("p");
  let year = document.createElement("p");
  let pages = document.createElement("p");
  let cover = document.createElement("img");
  title.textContent = book.title;
  author.textContent = book.author;
  book.year
    ? (year.textContent = `Year: ${book.year}`)
    : (year.textContent = "");
  book.pages
    ? (pages.textContent = `Pages: ${book.pages}`)
    : (pages.textContent = "");
  book.cover
    ? cover.setAttribute("src", book.cover)
    : cover.setAttribute("src", "./images/cover-default.png");
  cover.setAttribute("alt", "Book cover");
  cover.classList.add("cover");
  let info = document.createElement("div");
  info.classList.add("info");
  let infoDetails = document.createElement("div");
  infoDetails.classList.add("info-details");
  let btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-delete");
  btnDelete.setAttribute("value", `${books.length - 1}`);
  btnDelete.textContent = "Delete";
  btnDelete.addEventListener("click", deleteBook);
  let btnStatus = document.createElement("button");
  book.read
    ? btnStatus.classList.add("btn-mark-read")
    : btnStatus.classList.add("btn-mark-read");
  book.read
    ? (btnStatus.innerText = "Mark Unread")
    : (btnStatus.innerText = "Mark Read");
  btnStatus.addEventListener("click", function () {
    if (book.read) {
      book.read = false;
      btnStatus.innerText = "Mark Read";
      statusText.setAttribute("class", "unread");
    } else {
      book.read = true;
      btnStatus.innerText = "Mark Unread";
      statusText.setAttribute("class", "read");
    }
  });
  let statusText = document.createElement("p");
  statusText.innerText = "Read";
  book.read
    ? statusText.classList.add("read")
    : statusText.classList.add("unread");
  info.appendChild(title);
  info.appendChild(author);
  infoDetails.appendChild(year);
  infoDetails.appendChild(pages);
  card.appendChild(cover);
  card.appendChild(info);
  card.appendChild(infoDetails);
  card.appendChild(btnDelete);
  card.appendChild(btnStatus);
  card.appendChild(statusText);
  return card;
}

const addBtn = document.querySelector(".add-new");
addBtn.addEventListener("click", showForm);

const cancelBtn = document.querySelector(".btn-cancel");
cancelBtn.addEventListener("click", closeFormWindow);

const formBtn = document.querySelector(".btn-add-form");
formBtn.addEventListener("click", addBook);
