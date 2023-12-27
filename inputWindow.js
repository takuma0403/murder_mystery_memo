// const { ipcRenderer } = require('electron');

let charactors = []

function recordMemo() {
    let person = document.getElementById('person').value;
    let person_color = document.getElementById('person-color').value

    console.log(person)
    console.log(person_color)

    const newCharacter = {name: person ,color: person_color}

    const isNameDuplicate = charactors.some(character => character.name === newCharacter.name);
    const isColorDuplicate = charactors.some(character => character.color === newCharacter.color);
    
    if (!isNameDuplicate && !isColorDuplicate) {
        charactors.push(newCharacter);
    } else {
        if (isNameDuplicate) {
            alert("すでにその名前は存在しています")
        }
        if (isColorDuplicate) {
            alert("すでにその色は使われています")
        }
    }

    console.log(charactors)

}

let persons = ["Person1", "Person2", "Person3"];

// Function to populate the select element with persons array
function populatePersons() {
let select = document.getElementById("personSelect");
persons.forEach(function (person) {
    var option = document.createElement("option");
    option.value = person;
    option.text = person;
    select.add(option);
});
}

// Function to handle the selection of a person
function selectPerson() {
let select = document.getElementById("personSelect");
let input = document.getElementById("person");

// If a name is selected, update the input field
if (select.value !== "") {
    input.value = select.value;
}
}

// Call the populatePersons function when the page loads
window.onload = populatePersons;