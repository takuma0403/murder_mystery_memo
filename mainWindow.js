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
let remarks = document.getElementById('remarks')
let memoTitle = document.getElementById('memoTitle')

const fs = require('fs'); 

let memosData = {}
let persons = [];
let charactors = []

const defaultMemoObject = {
    id:"",
    name:"",
    color:"",
    datetime:"",
    place:"",
    action:"",
    remarks:""
}

let selectedMemoId = ""
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
            memosData = data
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

    if (selectedMemoId == "") {
        memoId = generateRandomId(8)
    }
    else {
        memoId = selectedMemoId
    }

    const record = {
        id:memoId,
        name: person.value,
        color: person_color.value,
        datetime: datetime.value,
        place: place.value,
        action: action.value,
        remarks: remarks.value
    }

    memosData.memos.push(record)

    funcMemoReroad()

    selectedMemoId = ""

    dialog.close();
}

// idの作成関数
function generateRandomId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// selectタブで選択されたときに選択された内容を反映する
function selectPerson() {
    personSelected = true
    if (select.value !== "") {
        person.value = select.value;
        memosData.persons.forEach(Person => {
            if (Person.name == select.value) {
                person_color.value = Person.color
            }
        });
    }
}
// 人物を手動入力したときはselectタブをリセットする
function selectPersonReset() {
    personSelected = false
    select.value = ""
    person_color.value = "#000000"
}

// メモの内容が更新されたときに色々する
function funcMemoReroad() {
    // タイトルの更新
    memoTitle.innerText = memosData.title

    // personsの更新
    memosData.persons = []
    memosData.persons = memosData.memos.filter((memo, index, self) => self.findIndex(t => t.name === memo.name) === index);

    // selectタブの更新
    select.innerHTML = ''
    let option = document.createElement("option");
    option.text = "以前に入力した名前"
    select.add(option)
    memosData.persons.forEach(function (person) {
        let option = document.createElement("option");
        option.value = person.name;
        option.text = person.name;
        select.add(option);
    });
}