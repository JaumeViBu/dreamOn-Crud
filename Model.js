export class Model {
  data = [];

  constructor(data = []) {
    this.setItemList(data);
  }

  getItemList() {
    return this.data;
  }

  setItemList(itemList) {
    this.data = itemList;
  }

  /**
   * Returns the data stored on localStorage, if nothing found returns empty array
   * @returns 
   */
  retrieveItems() {
    const data = localStorage.getItem('crud-items-data');
    this.data == null ? [] : JSON.parse(data);
  }

  /**
   * Stores the contents of listItems in the localStorage
   *
   */
  storeItems() {

    localStorage.setItem('crud-items-data', JSON.stringify(this.data));
  }
}


