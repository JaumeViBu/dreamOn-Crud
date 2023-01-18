// const controller = {
//   list: [],
//   initialize(data) {
//     this.list = data;
//     return this;
//   },
// };

class Controller {

  #itemList = [];
  #itemListView;
  #model;

  constructor(itemListView, model) {

    this.#itemListView = itemListView;
    this.#model = model;

    this.#itemList = model.getItemList();
  }

  getItemList() {
    return this.#itemList;
  }

}



module.exports = {
  Controller,
}
