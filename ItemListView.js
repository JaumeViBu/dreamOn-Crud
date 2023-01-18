
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

  submitLikeEvent() {
    if (e.key == 'Enter' && mode == 'add') addItem();
    if (e.key == 'Enter' && mode == 'update') confirmUpdateItem();
  }
}

module.exports = {
  ItemListView,
}