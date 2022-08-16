const generateNotes = (notes) => {
    console.log(notes)
    if (notes && notes.length) {
        let notesInnerHtml = ''
        notes.forEach((note, index) => {
            notesInnerHtml += `<div class = "list-group-item d-flex justify-content-between align-items-center"> 
            <div class="card-header"> ${index + 1}</div> 
            <div class="card-body">${note}</div>
            <div><button id=${index} class='btn btn-sm btn-secondary btn-remove'>Видалити</button></div>
            </div>`

        })
        document.querySelector('#notes').innerHTML = notesInnerHtml;

        const removeBtns = document.querySelectorAll('.btn-remove')
        removeBtns.forEach((btn) => {
            btn.addEventListener('click', function removeTask(event) {
                notes.splice(event.target.id, 1)
                localStorage.setItem('notes', JSON.stringify(notes))
                if (notes.length === 0) {
                    document.querySelector('#notes').innerHTML = '';
                } else {
                    generateNotes(notes);
                }
            })
        })
    }
}

const addNote = () => {
    const newTextNote = document.querySelector('#exampleTextarea')

    if (!newTextNote.value) {
        document.querySelector('.text-danger').innerHTML = "No note"
        return
    }

    const storedNotes = localStorage.getItem('notes')

    let notes = storedNotes ?
        JSON.parse(storedNotes) :
        []

    notes.push(newTextNote.value)
    newTextNote.value = '';

    localStorage.setItem('notes', JSON.stringify(notes))

    generateNotes(notes)


}

document.addEventListener('DOMContentLoaded', () => {
    let notes = localStorage.getItem('notes')
    if (notes !== 0) {
        generateNotes(JSON.parse(notes))
    }

})