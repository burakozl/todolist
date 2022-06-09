const btnEkle = document.querySelector("#liveToastBtn");
const errorToast = document.querySelectorAll("#liveToast");
const textDom = document.getElementById("task");
const listDom = document.getElementById("list");

btnEkle.addEventListener('submit',newElement);

function newElement() {
    let newItem = textDom.value.trim();
    if(newItem == ""){
        $(errorToast[1]).toast('show');
    }else{
        createNewElement(newItem)
        setItemwithLocalStorage(newItem);
        $(errorToast[0]).toast('show');
    } 
}
function createNewElement(newItem){
        const div = document.createElement("div");
        const li = document.createElement("li");
        const button = document.createElement("button");
        div.className = "list-item";
        button.type = "button",button.innerHTML="X";
        li.appendChild(document.createTextNode(newItem));
        listDom.appendChild(div);
        div.appendChild(li);
        div.appendChild(button);
        textDom.value = "";
        li.addEventListener('click',workDone)
        button.addEventListener('click',function(){
            button.parentElement.remove();
        });
}
function workDone() {
    listDom.childNodes[1].firstChild.className="checked";   
}
function getItemFromStorage(){
    let listWork;
    if (localStorage.getItem("listWork") === null) {
        listWork = [];
    }
    else {
        listWork = JSON.parse(localStorage.getItem("listWork"));
    }
    return listWork;
}
function setItemwithLocalStorage(newItem) {
    
    let listWork = getItemFromStorage();
    listWork.push(newItem);
    localStorage.setItem("ListWork", JSON.stringify(listWork));
}