let enterItem = document.querySelector('.enter-item');
let btn = document.querySelector('.btn'); 
let itemList = document.querySelector('.item-list');
let clearBtn = document.querySelector('.clear-btn');

// event listerners 
btn.addEventListener('click', addItem)
clearBtn.addEventListener('click', removeAll)



function addItem(e){
    e.preventDefault()
    if(enterItem.value == '') {
        // form validation so we know the person is enterring the inforamtion in our form. 
        alert('Please, enter an item to add to the list.')
        return;
    } else {
        // this is where the element gets created and added to the list items. 

        createElement(enterItem.value)
        
    }
}




// function for creating new lie as well as new button with respective classes. 
function createElement(element){
    let li = document.createElement('li');
    li.className = 'item'
    li.appendChild(document.createTextNode(element))
    let i = createX('fa-solid fa-xmark')
    li.appendChild(i)
    itemList.appendChild(li)
    enterItem.value = '';
}
// this is the one for the button. 
function createX(classes){
    let i = document.createElement('i');
    i.className = classes;
    return i;
}











// remove all items function

function removeAll(){
    while(itemList.firstChild){
        itemList.firstChild.remove()
    }
}