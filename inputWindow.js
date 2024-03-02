// const { ipcRenderer } = require('electron');

// let charactors = []

// let select = document.getElementById('personSelect');
// let person = document.getElementById('person');
// let person_color = document.getElementById('person-color')
// let time = document.getElementById('time')
// let place = document.getElementById('place')
// let action = document.getElementById('action')

// function recordMemo() {
//     const newCharacter = { name: person.value, color: person_color.value }

//     const isNameDuplicate = charactors.some(character => character.name === newCharacter.name);
//     const isColorDuplicate = charactors.some(character => character.color === newCharacter.color);

//     if (!isNameDuplicate && !isColorDuplicate) {
//         charactors.push(newCharacter);
//     } else {
//         if (isNameDuplicate) {
//             alert("すでにその名前は存在しています")
//         }
//         if (isColorDuplicate) {
//             alert("すでにその色は使われています")
//         }
//     }

//     // debug
//     console.log(newCharacter)

//     const log = {
//         person: person.value,
//         person_color: person_color.value,
//         time: time.value,
//         place: place.value,
//         action: action.value
//     }

//     console.log(log)
// }


// let persons = ["Person1", "Person2", "Person3"];

// // Function to populate the select element with persons array
// function populatePersons() {
//     let select = document.getElementById("personSelect");
//     persons.forEach(function (person) {
//         var option = document.createElement("option");
//         option.value = person;
//         option.text = person;
//         select.add(option);
//     });
// }

// // Function to handle the selection of a person
// function selectPerson() {
//     // If a name is selected, update the input field
//     if (select.value !== "") {
//         person.value = select.value;
//     }
// }

// function selectPersonReset() {
//     select.value = "";
// }

// getMemoData()
// function getMemoData() {
//     ipcRenderer.send('request-memo-file-path');
//     ipcRenderer.on('memo-file-path-from-parent-to-mainWindow', (event, path) => {
//         if (path) {
//             const json = fs.readFileSync(path)
//             const data = JSON.parse(json)
//             console.log(data)
//         }
//         else {
//             return
//         }
//     });
// }


// // Call the populatePersons function when the page loads
// window.onload = populatePersons;