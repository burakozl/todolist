const btnEkle = document.querySelector("#liveToastBtn");
const errorToast = document.querySelectorAll("#liveToast");
const textDom = document.getElementById("task");
const listDom = document.getElementById("list");

btnEkle.addEventListener('submit',newElement);//ekle butonuna basıldığında newElement fonksiyonunu çağır

window.onload = function(){ // ilk açılışta localstorageden verileri getir
    let listWork = getItemFromStorage(); //local strageden veriler listwork adlı değişkene atıldı
    
    if(localStorage.getItem("ListWork") != null){//localstorage dolu olduğu sürece çalış
        listWork.forEach(function(item){
            createNewElement(item);//localstoragede bulunan elemanlar ul içersine eklenerek ekrana yüklenir
        }
        )
    }
}

function newElement() {// yeni eleman ekleme fonksiyonu
    let newItem = textDom.value.trim();//boşluklardan kurtuluyoruz.
    if(newItem == ""){ //ilk girilen değer boş ise hata mesajı göster
        $(errorToast[1]).toast('show');
    }else{ //değilse fonsksiyonları çağır ve başarılı mesajını göster
        createNewElement(newItem)
        setItemwithLocalStorage(newItem);
        $(errorToast[0]).toast('show');

    } 
}
function createNewElement(newItem){//input olarak girilen veri parametre olarak gelir
        const div = document.createElement("div");
        const li = document.createElement("li");
        const button = document.createElement("button");//div li ve button oluşturuldu
        div.className = "list-item";
        button.type = "button";
        button.innerHTML="X";
        button.style.cssText = "float:right; width:100px;"//X butonu sağa yasla
        li.appendChild(document.createTextNode(newItem));//girilen veriyi listeye ekler
        listDom.appendChild(div);
        div.appendChild(li);
        li.appendChild(button);
        textDom.value = "";//input değeri girildikten sonra temizlemek için
        li.addEventListener('click',function(e){
                e.target.className="checked";
        });//tıklanılan liste elemanının üzerini çizer
        button.addEventListener('click',function(){
            button.parentElement.remove();//x butonuna basılan liste elemanını siler
        });
}
function getItemFromStorage(){//local storagedeki elemanları çağır
    let listWork;
    if (localStorage.getItem("ListWork") === null) {
        listWork = [];
    }
    else {
        listWork = JSON.parse(localStorage.getItem("ListWork"));//elemanları alırken json veriyi parse etmeliyiz.
    }
    return listWork;
}
function setItemwithLocalStorage(newItem) {//girilen değeri localstorage ye alıyoruz
    
    let listWork = getItemFromStorage();//localstoragedeki verileri alıp listwork adlı değişkene atıyoruz
    listWork.push(newItem);//listwork  içersine ekle
    localStorage.setItem("ListWork", JSON.stringify(listWork));//key: listWork , value : girilen input değeri
}