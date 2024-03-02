const { ipcRenderer } = require('electron');

const fileOpenButton = document.getElementById('file-open-button');
const createNewDataButton = document.getElementById('create-new-data-button');
const text = document.getElementById('text');
const dialog = document.getElementById('input-window-dialog');
const openButton = document.getElementById('open-dialog');
const closeButton = document.getElementById('close-dialog');
let select = document.getElementById('personSelect');
let person = document.getElementById('person');
let person_color = document.getElementById('person-color')
let datetime = document.getElementById('datetime')
let place = document.getElementById('place')
let action = document.getElementById('action')
let memoTitle = document.getElementById('memoTitle')

const fs = require('fs'); 

let fileMemoData = {}
let persons = [];
let charactors = []

let personSelected = false;

// メモデータ取り込みボタンの処理
fileOpenButton.addEventListener('click', async () => {
    const filePath = await ipcRenderer.invoke('open-dialog');
    ipcRenderer.send('send-path-to-parent', filePath);
    getMemoData()
});

// 新規のメモデータボタンの処理
createNewDataButton.addEventListener('click', () => {
    const initJsonData = {
        title:"ababbabaaa",
        persons:[],
        memos:[]
    };
    // IPC通信でメインプロセスにファイル作成の指示を送信
    ipcRenderer.send('create-json-file', initJsonData);
    ipcRenderer.on('finish-create-json-file', () => {
        getMemoData()
    })
});

// ダイアログを開くボタンがクリックされたときの処理
openButton.addEventListener('click', () => {
dialog.showModal();
});

// ダイアログ内の閉じるボタンがクリックされたときの処理
closeButton.addEventListener('click', () => {
dialog.close();
});

// メモのデータをobject形式で取得する
function getMemoData() {
    ipcRenderer.send('request-memo-file-path');
    ipcRenderer.on('memo-file-path-from-parent-to-mainWindow', (event, path) => {
        if (path) {
            const json = fs.readFileSync(path)
            const data = JSON.parse(json)
            fileMemoData = data
        }
        else {
            return
        }
        funcMemoReroad()
    });
}

// 保存して閉じるボタン（なんかいろいろ）
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
    // console.log(newCharacter)

    const log = {
        person: person.value,
        person_color: person_color.value,
        datetime: datetime.value,
        place: place.value,
        action: action.value
    }

    // console.log(log)

    funcMemoReroad()

    dialog.close();
}

// selectタブで選択されたときに選択された内容を反映する
function selectPerson() {
    personSelected = true
    if (select.value !== "") {
        person.value = select.value;
    }
}
// 人物を手動入力したときはselectタブをリセットする
function selectPersonReset() {
    personSelected = false
    select.value = "";
}

// メモの内容が更新されたときに色々する
function funcMemoReroad() {
    memoTitle.innerText = fileMemoData.title
    fileMemoData.persons.forEach(function (person) {
        let option = document.createElement("option");
        option.value = person.name;
        option.text = person.name;
        select.add(option);
    });
}