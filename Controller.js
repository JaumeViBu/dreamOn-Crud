export class Controller {

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


