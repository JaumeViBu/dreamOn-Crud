//globals
let listItems;
let nextId = 0;//autoIncrement Id
let mode = 'add';
let workingOn = null;
let defaultImg = './img/test.png'
const DEBUGMODE = true;

//dom elements globals
const inputValue = document.getElementById('inItem');
const inputImg = document.getElementById('inImageUrl');
const listdom = document.getElementById('listdom');
const btnAdd = document.getElementById('btnAdd');
const btnAddImg = document.getElementById('btnAddUrl');
const btnSave = document.getElementById('btnSave');
const btnCancel = document.getElementById('btnCancel');

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
  listItems = items;
  renderList();
});

//page on beforeunload -> save to localStorage
window.addEventListener('beforeunload', () => {
  console.log('before')
  storeItems();
});



/* --------------------------------------- */
/*          Functions - Render             */
/* --------------------------------------- */

/**
 * Renders the contents of list
 */
function renderList() {

  listdom.innerHTML = listToHtml();
}

/**
 * Transform the contents of listItems to html format using multiple li's
 * @returns string
 */
function listToHtml() {

  let template = '';

  for (const item of listItems) {

    template += /*html*/`<li><img id="img-${item.id}"class="itemImg" src="${item.imgUrl == '' ? defaultImg : item.imgUrl}"/>${DEBUGMODE ? `id: ${item.id} - ` : ''}${item.value}<button class='btn btnDelete' onclick="deleteItem(${item.id})">Borrar</button > <button class='btn btnEdit' onclick="updateItem(${item.id})">Editar</button></li > `;
  }

  return template;
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

/* --------------------------------------- */
/*          Functions - Logic              */
/* --------------------------------------- */

/**
 * Get the value of the input and added 
 * save it to workingOn 
 * If input is empty do nothing
 */
function addItem() {

  if (inputValue.value.trim() == '') return;

  const itemValue = inputValue.value.trim();
  const itemImg = inputImg.value.trim();
  inputValue.focus();
  if (mode == 'add') {
    listItems.push({
      id: nextId++,
      value: itemValue,
      imgUrl: itemImg,
    });
  } else if (mode == 'update') {

  }

  inputValue.value = '';
  inputImg.value = '';
  inputValue.focus();
  renderList();
  changeModeTo('add');
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
  renderList();
  inputValue.focus();
}

/**
 * Puts the data of the given index into the input and changes the nearby btn into an edit btn with an event to save changes
 *
 * @param {number} indexToUpdate
 */
function updateItem(id) {

  if (typeof id != 'number') throw new Error('id must be a number');
  if (mode === 'add') changeModeTo('update');
  else return;
  let item = getItemById(id);
  inputValue.value = item.value;
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
 * Enable or disavle buttons based on the actual mode
 */
function enableBtns() {

  for (const btn of document.querySelectorAll('button')) {
    btn.disabled = mode === 'add' ? false : true;
  }
  btnAdd.classList.remove(mode === 'update' ? 'd-block' : 'd-none');
  btnAdd.classList.add(mode === 'update' ? 'd-none' : 'd-block');
  btnCancel.classList.remove(mode === 'update' ? 'd-none' : 'd-block');
  btnCancel.classList.add(mode === 'update' ? 'd-block' : 'd-none');
  btnSave.classList.remove(mode === 'update' ? 'd-none' : 'd-block');
  btnSave.classList.add(mode === 'update' ? 'd-block' : 'd-none');
  btnAddImg.classList.remove(mode === 'addImg' ? 'd-none' : 'd-block');
  btnAddImg.classList.add(mode === 'addImg' ? 'd-block' : 'd-none');

  btnSave.disabled = mode !== 'update';
  btnCancel.disabled = mode !== 'update';
  btnAddImg.disabled = mode !== 'addImg';

  // inputValue.classList.remove(mode === 'addImg' ? 'd-block' : 'd-none');
  // inputValue.classList.add(mode === 'addImg' ? 'd-none' : 'd-block');
  // inputImg.classList.remove(mode === 'addImg' ? 'd-none' : 'd-block');
  // inputImg.classList.add(mode === 'addImg' ? 'd-block' : 'd-none');
}

/**
 * Change the mode back to add from update, and resets input and workingOn values
 *
 */
function cancelUpdateItem() {

  changeModeTo('add');
  inputValue.value = '';
  workingOn = null;
}

/**
 * Stores the changes made in input into the item already in storage
 *
 */
function confirmUpdateItem() {
  if (inputValue.value.trim() == '') return;
  const item = getItemById(workingOn);
  item.value = inputValue.value;
  cancelUpdateItem();
  renderList();
}