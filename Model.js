class Model {
  #data = [];
  constructor(data = []) {
    this.setItemList(data);
  }

  getItemList() {
    return this.#data;
  }

  setItemList(itemList) {
    this.#data = itemList;
  }
}


module.exports = {
  Model,
}
