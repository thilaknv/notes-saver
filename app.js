const form = document.querySelector("form");
const title_input = document.querySelector("#title");
const descript_input = document.querySelector("#description");
const file_input = document.querySelector("#pdf-notes");
const notes_container = document.querySelector("#your-notes");
const show_file = document.querySelector("#show-file");
const pdf_container = document.querySelector("#pdf-container");
const close_pdf = document.querySelector("#close-pdf-view");
const pdf_view = document.querySelector("#pdf-view");

const NOTES = [];

let count = 1;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newNotes = {};
  newNotes.ID = "note-" + count;
  newNotes.TITLE = title_input.value;
  newNotes.DESCRIPT = descript_input.value;
  newNotes.FILE = file_input.files[0];
  if (!newNotes.FILE) {
    alert("Please select a PDF file.");
    return;
  }
  NOTES.push(newNotes);
  count++;

  addCard(newNotes);
});

const addCard = (newNotes) => {
  notes_container.innerHTML += `
    <div class="notes" id=${newNotes.ID}>
      <h3>${newNotes.TITLE}</h3>
      <p class="notes-desc">${newNotes.DESCRIPT}</p>
      <button id="button${newNotes.ID}">Open File</button>
    </div>`;

  document
    .querySelector(`#button${newNotes.ID}`)
    .addEventListener("click", (event) => {
      console.log("TRY");
      const ID = event.target.id.substring(6);
      const pdf = NOTES.find((note) => note.ID == ID);
      if (!pdf) return;
      pdf_view.classList.remove("hide");
      const reader = new FileReader();
      reader.onload = function (event) {
        const pdfUrl = event.target.result;
        const embedTag = `<embed src="${pdfUrl}" width="100%" height="100%" />`;
        pdf_container.innerHTML += embedTag;
      };
      reader.readAsDataURL(pdf.FILE);
    });
};

close_pdf.addEventListener("click", (event) => {
  pdf_view.classList = "hide";
  pdf_container.innerHTML = ``;
});
