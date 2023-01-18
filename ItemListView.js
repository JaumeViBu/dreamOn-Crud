
class ItemListView {

  inputValue = document.getElementById('inItem');
  inputImg = document.getElementById('inImageUrl');
  listdom = document.getElementById('listdom');
  formItems = document.getElementById('formItems');
  imgShowFormItems = document.getElementById('imgShowFormItems');
  inputFilter = document.getElementById('inFilter');
  btns_add = document.getElementById('btns-add');
  btns_update = document.getElementById('btns-update');

  constructor() {
    this.addEventListeners();
  }

  /**
   * Adds the required event listeners to the dom elements properties
   *
   * @memberof ItemListView
   */
  addEventListeners() {
    //enter press on inputValue -> "submit" form
    this.inputValue.addEventListener('keypress', (e) => {
      this.submitLikeEvent();
    });

    //enter press on inputImg -> "submit" form
    this.inputImg.addEventListener('keypress', (e) => {
      this.submitLikeEvent();
    });

    //render filtering after every new char in inputFilter is added
    this.inputFilter.addEventListener('input', (e) => {
      this.render();
    });
  }

  /**
   * Encapsulates the actions of the submit-like event
   *
   * @memberof ItemListView
   */
  submitLikeEvent() {
    if (e.key == 'Enter' && mode == 'add') addItem();
    if (e.key == 'Enter' && mode == 'update') confirmUpdateItem();
  }



  /**
  * Renders the contents of the given list
  * @param {*} list
  * @memberof ItemListView
  */
  render(list) {

    this.filterList(this.inputFilter.value, list);
    this.listdom.innerHTML = this.listToHtml(list);
  }

  /**
   *
   * filters the contents to show from the given list, based on the input of inputFilter
   * @param {*} filterValue
   * @param {*} list
   * @memberof ItemListView
   */
  filterList(filterValue, list) {
    let filteredList;
    const trimedValue = this.filterStr.trim();
    if (trimedValue == '') filteredList = list;
    else
      filteredList = list.filter((item) => {

        return item.value.toLowerCase().includes(trimedValue);
      });
    this.inputFilter.value = trimedValue;
  }

  /**
   * Transform the contents of the given list to html format using multiple li's
   * @returns string
   */
  listToHtml(list) {
    let template = '';

    for (const item of list) {

      template += /*html*/`
    <li class="itemCard">
      <img id="img-${item.id}" src="${item.imgUrl == '' ? defaultImg : item.imgUrl}"/>
      <div class="itemCard__desc">
        <p>${DEBUGMODE ? `id: ${item.id} - ` : ''}${item.value.length > 21 ? item.value.substring(0, 22) + '...' : item.value}</p>
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
   *
   * @param {string} mode
   * @memberof ItemListView
   */
  enableBtns(mode) {

    for (const btn of document.querySelectorAll('.itemCard__btn')) {
      // btn.disabled = mode === 'add' ? false : true;
      btn.disabled = !this.formItems.classList.contains('d-none');
    }
    if (mode == 'add' && this.btns_add.classList.contains('d-none')) {
      this.btns_add.classList.toggle('d-none');
      if (!this.btns_update.classList.contains('d-none')) this.btns_update.classList.toggle('d-none');
    }
    if (mode == 'update' && this.btns_update.classList.contains('d-none')) {
      this.btns_update.classList.toggle('d-none');
      if (!this.btns_add.classList.contains('d-none')) {
        this.btns_add.classList.toggle('d-none');
      }
    }
  }

}


module.exports = {
  ItemListView,
}
