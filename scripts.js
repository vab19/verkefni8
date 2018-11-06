const ENTER_KEYCODE = 13;
var freecode;
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    const itemList = items.querySelectorAll('.item')
    for(let i=0;i<itemList.length;i++) {
      let checkbox = itemList[i].querySelector('.item__checkbox');
      let text = itemList[i].querySelector('.item__text');
      let button = itemList[i].querySelector('.item__button');

      checkbox.addEventListener('click', finish);
      text.addEventListener('click', edit);
      button.addEventListener('click', deleteItem);
    }
  }

  function formHandler(e) {
    e.preventDefault();

    let textarea = document.querySelector('.form__input');
    let textagildi = textarea.value;
    if(textagildi.replace(/\s/g, '').length){
    add(textarea.value);
    textarea.value = "";
    }
    
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    const  {target}  = e;
    target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const { target } = e;
    const { textContent, parentNode } = target;
    parentNode.removeChild(target);

    let input = document.createElement('input');
    input.type = "text";
    input.id = "input__id";
    input.className = "item__text";
    const button = parentNode.querySelector('.item__button');
    parentNode.insertBefore(input, button);

    
    input.focus();
    
    input.addEventListener('keyup', commit);
    
    
   
    
    
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if (ENTER_KEYCODE == e.keyCode) {
    freecode = document.getElementById('input__id').value
    const { target } = e;
    const { textContent, parentNode } = target;
    parentNode.removeChild(target);
    let newspan = document.createElement('span');
    newspan.className = "item__text";
    const button = parentNode.querySelector('.item__button');
    parentNode.insertBefore(newspan, button);
    newspan.appendChild(document.createTextNode(freecode));
   
      
   }
    
    
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    
    let element = document.createElement('li');
    element.className = 'item';

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = 'item__checkbox';

    let text = document.createElement('span');
    text.className = 'item__text';
    text.textContent = value;
    
    let button = document.createElement('button');
    button.appendChild(document.createTextNode('Eyða'));
    button.className = 'item__button';

    element.appendChild(checkbox);
    element.appendChild(text);
    element.appendChild(button);

    items.appendChild(element);

    checkbox.addEventListener('click', finish);
    text.addEventListener('click', edit);
    button.addEventListener('click', deleteItem);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
     const { target } = e;
     let listitem = target.parentNode;
     let listi = listitem.parentNode;
     listi.removeChild(listitem);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
  }

  return {
    init: init
  }
})();
