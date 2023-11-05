document.addEventListener("DOMContentLoaded", function () {
    const memoInput = document.getElementById("memo-input");
    const addButton = document.getElementById("add-button");
    const memoList = document.getElementById("memo-list");

    addButton.addEventListener("click", function () {
        const memoText = memoInput.value;
        if (memoText.trim() !== "") {
            const memoItem = document.createElement("div");
            memoItem.className = "memo-item";
            memoItem.textContent = memoText;
            memoList.appendChild(memoItem);
            memoInput.value = "";
        }
    });
});
