//globals
const listItems = [];

let nextId = 0;//autoIncrement Id
let mode = 'add';
let workingOn = null;

//dom elements globals
const inputValue = document.getElementById('inItem');
const inputImg = document.getElementById('inImageUrl');
const listdom = document.getElementById('listdom');
const btnAdd = document.getElementById('btnAdd');
const btnAddImg = document.getElementById('btnAddUrl');
const btnSave = document.getElementById('btnSave');
const btnCancel = document.getElementById('btnCancel');

//eventListeners
inputValue.addEventListener('keypress', (e) => {
  if (e.key == 'Enter' && mode == 'add') {
    addItem();
  }
  if (e.key == 'Enter' && mode == 'update') {
    confirmUpdateItem();
  }
});

//Entry point
renderList();




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

    template += /*html*/`<li><img id="img-${item.id}"class="itemImg" src="${item.imgUrl == '' ? './img/test.png' : item.imgUrl}"/>${item.value}<button class='btn btnDelete' onclick="deleteItem(${item.id})">Borrar</button > <button class='btn btnEdit' onclick="updateItem(${item.id})">Editar</button></li > `;
  }



  return template;
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

  changeModeTo('addImg');
  if (inputValue.value.trim() == '') return;

  const itemValue = inputValue.value.trim();
  workingOn = itemValue;
}

/**
 * get the value 
 *
 */
function addImg() {
  if (mode == 'addImg') {

    listItems.push({ id: nextId++, value: workingOn, imgUrl: inputImg.value });
  }
  inputValue.value = '';
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
  if (mode === 'add') enableAddBtns();
  if (mode === 'addImg') enableAddImgBtns();
  if (mode === 'update') enableUpdateBtns();
}

/**
 * Enable the btns of add mode, while enabling the list buttons and hiding all the others
 *
 */
function enableAddBtns() {
  for (const btn of document.querySelectorAll('button')) {
    btn.disabled = false;
  }
  btnAdd.classList.remove('d-none');
  btnAdd.classList.add('d-block');
  btnCancel.classList.remove('d-block');
  btnCancel.classList.add('d-none');
  btnSave.classList.remove('d-block');
  btnSave.classList.add('d-none');
  btnAddImg.classList.remove('d-block');
  btnAddImg.classList.add('d-none');

  btnSave.disabled = true;
  btnCancel.disabled = true;
  btnAddImg.disabled = true;

  inputValue.classList.remove('d-none');
  inputValue.classList.add('d-block');
  inputImg.classList.remove('d-block');
  inputImg.classList.add('d-none');
}

/**
 * Enable the btns of update mode, while disabling the list buttons and disabling all the others
 *
 */
function enableUpdateBtns() {
  for (const btn of document.querySelectorAll('button')) {
    btn.disabled = true;
  }
  btnAdd.classList.remove('d-block');
  btnAdd.classList.add('d-none');
  btnCancel.classList.remove('d-none');
  btnCancel.classList.add('d-block');
  btnSave.classList.remove('d-none');
  btnSave.classList.add('d-block');
  btnAddImg.classList.remove('d-block');
  btnAddImg.classList.add('d-none');

  btnSave.disabled = false;
  btnCancel.disabled = false;
  btnAddImg.disabled = true;

  inputValue.classList.remove('d-none');
  inputValue.classList.add('d-block');
  inputImg.classList.remove('d-block');
  inputImg.classList.add('d-none');

}

/**
 * Enable the btns of addurl mode, while disabling the list buttons and disabling all the others
 *
 */
function enableAddImgBtns() {
  for (const btn of document.querySelectorAll('button')) {
    btn.disabled = true;
  }
  btnAdd.classList.remove('d-none');
  btnAdd.classList.add('d-block');
  btnCancel.classList.remove('d-block');
  btnCancel.classList.add('d-none');
  btnSave.classList.remove('d-block');
  btnSave.classList.add('d-none');
  btnAddImg.classList.remove('d-none');
  btnAddImg.classList.add('d-block');

  btnSave.disabled = true;
  btnCancel.disabled = true;
  btnAddImg.disabled = false;

  inputValue.classList.add('d-none');
  inputValue.classList.remove('d-block');
  inputImg.classList.add('d-block');
  inputImg.classList.remove('d-none');
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