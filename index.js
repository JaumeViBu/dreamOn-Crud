//globals
let listItems;
let nextId = 0;//autoIncrement Id
let mode = 'add';
let workingOn = null;
let defaultImg = './img/test.png'
const DEBUGMODE = false;

//dom elements globals
const inputValue = document.getElementById('inItem');
const inputImg = document.getElementById('inImageUrl');
const listdom = document.getElementById('listdom');
const btnAdd = document.getElementById('btnAdd');
const btnAddImg = document.getElementById('btnAddUrl');
const btnSave = document.getElementById('btnSave');
const btnCancelUpdate = document.getElementById('btnCancelUpdate');
const btnCancelAdd = document.getElementById('btnCancelAdd');
const formItems = document.getElementById('formItems');
const imgShowFormItems = document.getElementById('imgShowFormItems');

//eventListeners
//enter press on inputValue
inputValue.addEventListener('keypress', (e) => {
  if (e.key == 'Enter' && mode == 'add') {
    addItem();
  }
  if (e.key == 'Enter' && mode == 'update') {
    confirmUpdateItem();
  }
});

//enter press on inputImg
inputImg.addEventListener('keypress', (e) => {
  if (e.key == 'Enter' && mode == 'add') {
    addItem();
  }
  if (e.key == 'Enter' && mode == 'update') {
    confirmUpdateItem();
  }
});

//page on DOMContentLoaded -> load from localStorage
document.addEventListener('DOMContentLoaded', () => {
  ({ nextId, items } = retrieveItems());
  listItems = items ? items : [];
  nextId = listItems.length == 0 ? 0 : nextId;
  render();
});

//page on beforeunload -> save to localStorage
window.addEventListener('beforeunload', () => {
  storeItems();
});



/* --------------------------------------- */
/*          Functions - View related?      */
/* --------------------------------------- */

/**
 * Renders the contents of list
 */
function render() {

  listdom.innerHTML = listToHtml();
}

/**
 * Transform the contents of listItems to html format using multiple li's
 * @returns string
 */
function listToHtml() {

  let template = '';

  for (const item of listItems) {

    template += /*html*/`
    <li class="itemCard">
      <img id="img-${item.id}" src="${item.imgUrl == '' ? defaultImg : item.imgUrl}"/>
      <div class="itemCard__desc">
        <p>${DEBUGMODE ? `id: ${item.id} - ` : ''}${item.value}</p>
        <button class='itemCard__btn itemCard__btnDelete' onclick="deleteItem(${item.id})"></button> 
        <button class='itemCard__btn itemCard__btnEdit' onclick="updateItem(${item.id})"></button>
      </div>
    </li >
    `;
  }

  return template;
}

/**
 * Enable or disable buttons based on the actual mode
 */
function enableBtns() {

  for (const btn of document.querySelectorAll('button')) {
    btn.disabled = mode === 'add' ? false : true;
  }
  btnAdd.classList.remove(mode === 'update' ? 'd-block' : 'd-none');
  btnAdd.classList.add(mode === 'update' ? 'd-none' : 'd-block');
  btnCancelAdd.classList.remove(mode === 'update' ? 'd-block' : 'd-none');
  btnCancelAdd.classList.add(mode === 'update' ? 'd-none' : 'd-block');
  btnCancelUpdate.classList.remove(mode === 'update' ? 'd-none' : 'd-block');
  btnCancelUpdate.classList.add(mode === 'update' ? 'd-block' : 'd-none');
  btnSave.classList.remove(mode === 'update' ? 'd-none' : 'd-block');
  btnSave.classList.add(mode === 'update' ? 'd-block' : 'd-none');

  btnSave.disabled = mode !== 'update';
  btnCancelUpdate.disabled = mode !== 'update';
}

/**
 * Change the mode back to add from update, and resets input and workingOn values
 *
 */
function cancelUpdateItem() {

  changeModeTo('add');
  inputValue.value = '';
  inputImg.value = '';
  workingOn = null;
  toggleAddItemForm();
}

/**
 * Hides the form after reseting it
 *
 */
function cancelAddItem() {

  inputValue.value = '';
  inputImg.value = '';
  toggleAddItemForm();
}

/**
 * Toggles the hidden atr of the add item form
 *
 */
function toggleAddItemForm() {
  if (formItems.classList.contains('d-none')) {
    formItems.classList.add('d-flex');
    formItems.classList.remove('d-none');
    imgShowFormItems.classList.add('d-none');
    imgShowFormItems.classList.remove('d-block');
    inputValue.focus();
  } else {
    formItems.classList.add('d-none');
    formItems.classList.remove('d-flex');
    imgShowFormItems.classList.add('d-block');
    imgShowFormItems.classList.remove('d-none');
  }
}



/* --------------------------------------- */
/*          Functions - Storage            */
/* --------------------------------------- */

/**
 * Returns the data stored on localStorage, if nothing found returns empty array
 * @returns 
 */
function retrieveItems() {
  const data = localStorage.getItem('crud-items-data');
  return data == null ? [] : JSON.parse(data);
}

/**
 * Stores the contents of listItems in the localStorage
 *
 */
function storeItems() {

  const data = {
    nextId: nextId,
    items: listItems
  }
  localStorage.setItem('crud-items-data', JSON.stringify(data));
}

/**
 * Coes a shallow copy of the last item in the list and adds it n times
 *
 * @param {number} n
 * @returns
 */
function populate(n) {
  if (listItems.length <= 0) return;
  const lastItem = listItems[listItems.length - 1];
  for (let i = 0; i < n; i++) {
    const copy = { ...lastItem };
    copy.id = nextId++;
    listItems.push(copy);
  }
  render();
}

/* --------------------------------------- */
/*          Functions - Logic              */
/* --------------------------------------- */

/**
 * Get the value of inputValue and adds it to the list
 * If input is empty do nothing
 */
function addItem() {

  if (inputValue.value.trim() == '') return;

  const itemValue = inputValue.value.trim();
  const itemImg = inputImg.value.trim();
  inputValue.focus();

  listItems.push({
    id: nextId++,
    value: itemValue,
    imgUrl: itemImg,
  });
  inputValue.value = '';
  inputImg.value = '';
  inputValue.focus();
  render();
  changeModeTo('add');
  toggleAddItemForm();
}

/**
 * Deletes the item from listItems[] with the id given
 *
 * @param {number} id
 */
function deleteItem(id) {

  if (typeof id != 'number') throw new Error('nId must be a number');

  for (let i = 0; i < listItems.length; i++) {

    const element = listItems[i];
    if (element.id === id) {

      listItems.splice(i, 1);
    }
  }
  render();
  inputValue.focus();
}

/**
 * Puts the data of the given index into the form and changes the mode to update
 *
 * @param {number} indexToUpdate
 */
function updateItem(id) {

  if (formItems.classList.contains('d-none')) toggleAddItemForm();
  if (typeof id != 'number') throw new Error('id must be a number');
  if (mode === 'add') changeModeTo('update');
  else return;
  let item = getItemById(id);
  inputValue.value = item.value;
  inputImg.value = item.imgUrl;
  changeModeTo('update');
  workingOn = id;
  inputValue.focus();
}

/**
 * Returns the item with the given id in listItems.
 * If nothing found, return null
 * 
 * @param {number} id
 * @returns item if id found, null if not
 */
function getItemById(id) {

  for (const item of listItems) {
    if (item.id === id) return item;
  }
  return null;
}

/**
 * Change the mode of the app, disabling or enabling
 * all buttons in the page accordingly
 *
 */
function changeModeTo(newMode) {
  if (mode === newMode) return;//nothing to do
  mode = newMode;
  enableBtns();
}

/**
 * Stores the changes made in the form into the item already in storage
 *
 */
function confirmUpdateItem() {
  if (inputValue.value.trim() == '') return;
  const item = getItemById(workingOn);
  item.value = inputValue.value.trim();
  item.imgUrl = inputImg.value.trim();

  cancelUpdateItem();
  render();
}