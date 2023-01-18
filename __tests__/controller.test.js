const { Controller } = require('../Controller');
const { Model } = require('../Model');
const { ItemListView } = require('../ItemListView');



describe('CRUD controller', () => {
  it('controller has a list property', () => {
    //GIVEN
    const itemListView = null;
    const model = new Model();
    const controller = new Controller(itemListView, model);
    //WHEN
    const sut = controller.getItemList();
    //THEN
    expect(sut).toEqual([]);
  });
  it('controller contains a model object with the data, and we can acces it through controller', () => {
    //GIVEN
    const data = [
      { id: '1-1', value: 'image1', imgUrl: 'url1' },
      { id: '1-2', value: 'image2', imgUrl: 'url2' },
      { id: '1-3', value: 'image3', imgUrl: 'url3' },
      { id: '1-4', value: 'image4', imgUrl: 'url4' },
      { id: '1-5', value: 'image5', imgUrl: 'url5' },
    ];
    const model = new Model(data);
    const itemListView = null;
    const controller = new Controller(itemListView, model);
    //WHEN
    const sut = controller.getItemList();
    //THEN
    expect(sut).toEqual([
      { id: '1-1', value: 'image1', imgUrl: 'url1' },
      { id: '1-2', value: 'image2', imgUrl: 'url2' },
      { id: '1-3', value: 'image3', imgUrl: 'url3' },
      { id: '1-4', value: 'image4', imgUrl: 'url4' },
      { id: '1-5', value: 'image5', imgUrl: 'url5' },
    ]);
  });
});