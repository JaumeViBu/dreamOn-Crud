import { Model } from './Model.js';
import { ItemListView } from './ItemListView.js';
import { Controller } from './Controller.js';


let model = new Model();
let itemListView = new ItemListView();
let controller = new Controller(itemListView, model);

model.retrieveItems();

//TODO change eventListeners from html into view
document.addEventListener('DOMContentLoaded', () => {
  itemListView.addEventListeners();
});