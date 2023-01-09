const listItems = [];

let nextId = 0;
let mode = 'normal';
let workingOn = null;

//dom elements
const input = document.getElementById('inItem');
const listdom = document.getElementById('listdom');
const btnAdd = document.getElementById('btnAdd');
const btnSave = document.getElementById('btnSave');
const btnCancel = document.getElementById('btnCancel');


renderList();

//eventListeners
input.addEventListener('keypress', (e) => {
  if (e.key == 'Enter' && mode == 'normal') {
    addItem();
  }
  if (e.key == 'Enter' && mode == 'update') {
    confirmUpdateItem();
  }
});

/* --------------------------------------- */
/*          Funciones                      */
/* --------------------------------------- */

/**
 * Add the item in the input to listItems
 * If input is empty do nothing
 */
function addItem() {

  if (input.value.trim() == '') return;

  const item = input.value.trim();

  listItems.push({ id: nextId++, value: item });
  input.value = '';
  renderList();
}

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

    template += `<li>${item.value}<button class='btn btnDelete' onclick="deleteItem(${item.id})">Borrar</button><button class='btn btnEdit' onclick="updateItem(${item.id})">Editar</button></li>`;
  }

  return template;
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
  if (mode === 'normal') changeModeTo('update');
  else return;
  let item = getItemById(id);
  input.value = item.value;
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
 * Change mode between normal and update, disabling or enabling
 * all buttons in the page accordingly
 *
 */
function changeModeTo(newMode) {
  if (mode === newMode) return;//nothing to do
  mode = newMode;
  if (mode === 'normal') enableNormalBtns();
  if (mode === 'update') enableUpdateBtns();
}

/**
 * Enable the btns of normal mode, while disabling those of update mode
 *
 */
function enableNormalBtns() {
  for (const btn of document.querySelectorAll('button')) {
    btn.disabled = false;
  }
  btnAdd.classList.remove('d-none');
  btnAdd.classList.add('d-block');
  btnCancel.classList.remove('d-block');
  btnCancel.classList.add('d-none');
  btnSave.classList.remove('d-block');
  btnSave.classList.add('d-none');

  btnSave.disabled = true;
  btnCancel.disabled = true;
}

/**
 * Enable the btns of update mode, while disabling those of normal mode
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

  btnSave.disabled = false;
  btnCancel.disabled = false;
}

/**
 * Change the mode back to normal from update, and resets input and workingOn values
 *
 */
function cancelUpdateItem() {

  changeModeTo('normal');
  input.value = '';
  workingOn = null;
}

/**
 * Stores the changes made in input into the item already in storage
 *
 */
function confirmUpdateItem() {
  if (input.value.trim() == '') return;
  const item = getItemById(workingOn);
  item.value = input.value;
  cancelUpdateItem();
  renderList();
}