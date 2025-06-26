const form = document.querySelector("form");
const ulList = document.getElementById('list');

const arrayList = [...getList()];
const localList = getList();
updateList(true);

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    var input = document.getElementById('list-input');
    var errMessage =  document.querySelector(".error-message");
    const text = input.value.trim();
    if(text == ""){
        errMessage.textContent = "Cannot add empty text";
        input.value = "";
        setTimeout(()=>{
            errMessage.textContent = "";
        },3000)
        return;
    }
    else if(arrayList.some((content,id)=> arrayList[id].text == text)) {
        errMessage.textContent = "item exists";
        input.value = "";
        setTimeout(()=>{
            errMessage.textContent = "";
        },3000)
        return;
    };
    input.value = " ";
    errMessage.style.color = "green";
    var output = "";
    for(i = 0; i < text.length;i++){
        output += text[i];
        if(i == 27){
            output += "...";
            break;
        }
    }
    errMessage.textContent ="Added: " + output;

    setTimeout(()=>{
            errMessage.textContent = "";
            errMessage.style.color = "red";
        },3000)

    const todoId = ulList.childElementCount;

    arrayList.push({text: text,checked: false});

    createList(todoId,text);
    saveList();
});

// add 
function createList(todoId,todoText,updateBoxState = false){


    const li = document.createElement('li');
    li.setAttribute("id",`listItem-${todoId}`);
    li.setAttribute("class","list-item");
    li.innerHTML = `
                <input type="checkbox"  id="custom-check${todoId}"  class="custom-check">
                <label for="custom-check${todoId}" class="label">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="rgb(48, 48, 48)"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                    
                        <p class="list-text">${todoText}</p>
                </label>
                <button type="button" class="delete-button" title="Delete item">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="red"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>`;
            ulList.append(li);

        if(updateBoxState === true){
            li.querySelector(`#custom-check${todoId}`).checked = arrayList[todoId].checked
        }
        const btn = li.querySelector('.delete-button');
        btn.addEventListener('click', function() {
            deleteItem(todoId);
        });

        const inputBtn = li.querySelector(`#custom-check${todoId}`);
        inputBtn.addEventListener('click', function() {
            checkState(todoId);
        });
}

function checkState (inputId){
    var check = document.getElementById(`custom-check${inputId}`).checked;
    arrayList[inputId].checked = check;
    // console.log(arrayList);
    saveList();
    updateList(true)
}
function deleteItem(buttonId){
    for(i = 0; i < arrayList.length;i++){
        var decideTranslationAxis = ()=>{
            if(ulList.lastChild == document.getElementById(`listItem-${buttonId}`)){
            return "translatey(120%)";
        }else if (ulList.firstChild == document.getElementById(`listItem-${buttonId}`)){
            return "translatey(-120%)";
        }
        else{
            var selectDirection = ["translatex(120%)","translatex(-120%)"]
            return selectDirection[Math.floor(Math.random() * 2)];
        }
        };
        // console.log(decideTranslationAxis());
        document.getElementById(`listItem-${buttonId}`).style.transition = ".6s ease-out";
        document.getElementById(`listItem-${buttonId}`).style.transform = decideTranslationAxis();
    }
    setTimeout(()=>{
        document.getElementById(`listItem-${buttonId}`).remove();
        arrayList.splice(buttonId,1);
        // console.log(arrayList);
        updateList(true);
        saveList();
    },300)
}

function saveList(){
    var save = JSON.stringify(arrayList);
    localStorage.setItem("myList",save);
}
function getList(){
    var retrieve = JSON.parse(localStorage.getItem("myList")) || [];
    return retrieve;
}
function updateList(tempList = true){
    ulList.innerHTML = "";
    var updateLocation = tempList ? arrayList : localList;

    updateLocation.forEach((item,id)=>{
        // console.log();
        createList(id,updateLocation[id].text,true);
    })
}
const genDeleteBtn = document.querySelector("#general-delete");
genDeleteBtn.addEventListener('click', function (){
    clearList();
});
function clearList(){
    for(i = 0; i < arrayList.length;i++){
        document.getElementById(`listItem-${i}`).style.transition = ".6s ease-out";
        document.getElementById(`listItem-${i}`).style.transform = "translatex(-120%)";
    }
    setTimeout(()=>{
        arrayList.splice(0,arrayList.length);
        updateList(true);
        saveList();
    },300)
}
// ulList.addEventListener('scroll',()=>{
//     var firstChild = ulList.firstChild;
//     firstChild.c
// })