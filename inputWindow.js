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