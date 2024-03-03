const { ipcRenderer } = require('electron');

const fileOpenButton = document.getElementById('file-open-button');
const createNewDataButton = document.getElementById('create-new-data-button');
const text = document.getElementById('text');
const dialog = document.getElementById('input-window-dialog');
const openButton = document.getElementById('open-dialog');
const closeButton = document.getElementById('close-dialog');
const memoDeleteButton = document.getElementById('memo-delete-button');
const saveDataButton = document.getElementById('save-data-for-json');
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
        title:"murder_mystery_memo",
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
    if (selectedMemoId == "") {
        person.value = ""
        person_color.value = "#000000"
        datetime.value = ""
        place.value = ""
        action.value = ""
        remarks.value = ""
    }
    dialog.showModal();
});

// ダイアログ内の閉じるボタンがクリックされたときの処理
closeButton.addEventListener('click', () => {
dialog.close();
});

saveDataButton.addEventListener('click', () => {
    ipcRenderer.send('request-data-save', memosData);
    ipcRenderer.on('memo-file-path-from-parent-to-mainWindow', (event, path) => {
        if (path) {
            fs.writeFile(path, JSON.stringify(memosData, null, 2), (err) => {
                if (err) throw err;
                alert("保存に失敗しました")
                console.log(err)
            });
        }
        else {
            return
        }
    })
})

memoDeleteButton.addEventListener('click', () => {
    // まだ何もない
})

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
    let isNameDuplicate = false
    let isColorDuplicate = false
    memosData.persons.forEach(Person => {
        if (Person.name == person.value) {
            isNameDuplicate = true
        }
        if (Person.color == person_color.value) {
            isColorDuplicate = true
        }
        
    });

    if (isNameDuplicate && !personSelected) {
        alert("すでにその名前は存在しています")
        return
    }
    if (isColorDuplicate && !personSelected) {
        alert("すでにその色は使われています")
        return
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

// メモの削除ボタン表示非表示
function showDeleteButton() {
    if (selectedMemoId == "") {
        memoDeleteButton.style.display = "none";
    } else {
        memoDeleteButton.style.display = "block";
    }
}

// ページ読み込み時にボタンの表示を更新する
window.onload = function() {
    showDeleteButton();
};

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
