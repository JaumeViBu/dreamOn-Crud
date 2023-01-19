export class Controller {

  itemList = [];
  itemListView;
  model;

  mode = 'add';

  constructor(itemListView, model) {

    this.itemListView = itemListView;
    this.model = model;

    this.itemList = model.getItemList();
  }

  getItemList() {
    return this.itemList;
  }

  /**
   * Coes a shallow copy of the last item in the list and adds it n times
   *
   * @param {number} n
   * @returns
   * @memberof Controller
   */
  populate(n) {
    if (this.itemList.length <= 0) return;
    const lastItem = this.itemList[this.itemList.length - 1];
    for (let i = 0; i < n; i++) {
      const copy = { ...lastItem };
      copy.id = crypto.getRandomUUID();
      this.itemList.push(copy);
    }
    this.itemListView.render(this.itemList);
  }


  /**
   * Get adds the item given to the list
   * If item is empty do nothing
   *
   * @param {Item} item
   * @returns
   * @memberof Controller
   */
  addItem(item) {

    if (!item) return;

    this.itemList.push(item);
    this.itemListView.render(this.itemList);
    changeModeTo('add');
  }
}


