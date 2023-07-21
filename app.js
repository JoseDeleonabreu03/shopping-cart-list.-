let enterItem = document.querySelector('.enter-item');
let btn = document.querySelector('.btn'); 
let itemList = document.querySelector('.item-list');
let clearBtn = document.querySelector('.clear-btn');
let filter = document.querySelector('.filter')


function display(){
    const localStorageItem = getItemsFromStorage();
    localStorageItem.forEach(item => createElement(item))
    checkUI()
}




function onAddItemSubmit(e){
    e.preventDefault()
    let newItem = enterItem.value
    if(enterItem.value == '') {
        // form validation so we know the person is enterring the inforamtion in our form. 
        alert('Please, enter an item to add to the list.')
        return;
    } else {
        // this is where the element gets created and added to the list items. 

        createElement(newItem);

        // adding Item to the local storage in our browser

        addToLocalStorage(newItem)


        
    }
}

 function getItemsFromStorage(){
    let localStorageItem;
    if(localStorage.getItem('item') === null) {
        localStorageItem = []
    } else {
        localStorageItem = JSON.parse(localStorage.getItem('item'))
    }

    return localStorageItem
 }
    




// function for creating new lie as well as new button with respective classes. 
function createElement(element){
    let li = document.createElement('li');
    li.className = 'item'
    li.appendChild(document.createTextNode(element))
    let i = createX('fa-solid fa-xmark')
    li.appendChild(i)
    itemList.appendChild(li)
    checkUI()
    enterItem.value = '';
}
// this is the one for the button. 
function createX(classes){
    let i = document.createElement('i');
    i.className = classes;
    return i;
}

// remove item depending on the click area
function onClickItem(e){
    if(e.target.className == 'fa-solid fa-xmark'){
        deleteItem(e.target)
    }
}

// remove item by clicking the x icon. 
function deleteItem(item){
    if(confirm('Are you sure?')){
        item.parentElement.remove()

        // remove Item from storage
        removeItemFromStorage(item.parentElement.textContent)


        checkUI()
    }
}


// remove from local storage 
    function removeItemFromStorage(item){
        let itemsFromStorage = getItemsFromStorage();
        itemsFromStorage = itemsFromStorage.filter((i) => i !== item)
        localStorage.setItem('item', JSON.stringify(itemsFromStorage))
    }

   // add to local storage

function addToLocalStorage(item){
    let localStorageItem = getItemsFromStorage()
    if(localStorage.getItem('item') === null) {
        localStorageItem = []
    } else {
        localStorageItem = JSON.parse(localStorage.getItem('item'))
    }

    localStorageItem.push(item)

    localStorage.setItem('item',JSON.stringify(localStorageItem))
    
}



// check UI 
function checkUI(){
    let items = document.querySelectorAll('.item')
    if(items.length == 0) {
        filter.style.display = 'none'
        clearBtn.style.display = 'none'
    } else {
        filter.style.display = 'block'
        clearBtn.style.display = 'block'
    }
}

// filter items 
function filterItems(e){
    let text = e.target.value.toLowerCase();
    let items = document.querySelectorAll('.item')

    items.forEach(function(item){
        
        if(item.firstChild.textContent.toLowerCase().indexOf(text) != -1){
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    })

}


// remove all items function

function removeAll(){
    while(itemList.firstChild){
        itemList.firstChild.remove()
        checkUI()
    }

    localStorage.removeItem('item')

}

// initialize app
function init(){
    btn.addEventListener('click', onAddItemSubmit)
    clearBtn.addEventListener('click', removeAll)
    itemList.addEventListener('click', onClickItem)
    filter.addEventListener('input', filterItems)
    document.addEventListener('DOMContentLoaded', display)
    checkUI()
}

// event listerners 
init()