const { ipcRenderer } = require('electron');

const button = document.getElementById('button');
const text = document.getElementById('text');
const dialog = document.getElementById('input-window-dialog');
const openButton = document.getElementById('open-dialog');
const closeButton = document.getElementById('close-dialog');

const fs = require('fs'); 

getMemoData()

button.addEventListener('click', async () => {
    const filePath = await ipcRenderer.invoke('open-dialog');
    ipcRenderer.send('send-path-to-parent', filePath);
    getMemoData()
});

// ダイアログを開くボタンがクリックされたときの処理
openButton.addEventListener('click', () => {
dialog.showModal();
});

// ダイアログ内の閉じるボタンがクリックされたときの処理
closeButton.addEventListener('click', () => {
dialog.close();
});

function getMemoData() {
    ipcRenderer.send('request-memo-file-path');
    ipcRenderer.on('memo-file-path-from-parent-to-mainWindow', (event, path) => {
        if (path) {
            const json = fs.readFileSync(path)
            const data = JSON.parse(json)
            console.log(data)
        }
        else {
            return
        }
    });
}

// function openInputWindow() {
//     ipcRenderer.send('button-clicked');
// }

// input-windowの処理

let charactors = []

let select = document.getElementById('personSelect');
let person = document.getElementById('person');
let person_color = document.getElementById('person-color')
let time = document.getElementById('time')
let place = document.getElementById('place')
let action = document.getElementById('action')

let personSelected = false;

function recordMemo() {
    const newCharacter = { name: person.value, color: person_color.value }

    const isNameDuplicate = charactors.some(character => character.name === newCharacter.name);
    const isColorDuplicate = charactors.some(character => character.color === newCharacter.color);

    if (!isNameDuplicate && !isColorDuplicate) {
        charactors.push(newCharacter);
    } else {
        if (isNameDuplicate && !personSelected) {
            alert("すでにその名前は存在しています")
        }
        if (isColorDuplicate && !personSelected) {
            alert("すでにその色は使われています")
        }
    }

    // debug
    console.log(newCharacter)

    const log = {
        person: person.value,
        person_color: person_color.value,
        time: time.value,
        place: place.value,
        action: action.value
    }

    console.log(log)
}


let persons = ["Person1", "Person2", "Person3"];

persons.forEach(function (person) {
    var option = document.createElement("option");
    option.value = person;
    option.text = person;
    select.add(option);
});

// Function to handle the selection of a person
function selectPerson() {
    personSelected = true
    if (select.value !== "") {
        person.value = select.value;
    }
}

function selectPersonReset() {
    personSelected = false
    select.value = "";
}
