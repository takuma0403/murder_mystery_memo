class MemoItem {
    constructor(title, text) {
        this.title = title;
        this.text = text;
    }

    render() {
        const memoItem = document.createElement("div");
        memoItem.className = "memo-item";
        memoItem.innerHTML = `<h2>${this.title}</h2><p>${this.text}</p>`;
        return memoItem;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const memoInput = document.getElementById("memo-input");
    const titleInput = document.getElementById("title-input");
    const addButton = document.getElementById("add-button");
    const memoList = document.getElementById("memo-list");
    const memoItems = [];

    addButton.addEventListener("click", function () {
        const title = titleInput.value;
        const memoText = memoInput.value;
        if (title.trim() !== "" && memoText.trim() !== "") {
            let existingMemo = memoItems.find((item) => item.title === title);
            if (existingMemo) {
                existingMemo.text += `<br>${memoText}`;
                // 既存のメモを更新
                const memoItemElement = existingMemo.render();
                const existingMemoIndex = memoItems.indexOf(existingMemo);
                memoList.replaceChild(memoItemElement, memoList.childNodes[existingMemoIndex]);
            } else {
                const memoItem = new MemoItem(title, memoText);
                memoItems.push(memoItem);
                const memoItemElement = memoItem.render();
                memoList.appendChild(memoItemElement);
            }
            titleInput.value = "";
            memoInput.value = "";
        }
    });
});
