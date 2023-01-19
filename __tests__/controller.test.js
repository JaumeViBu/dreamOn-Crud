import { Controller } from '../Controller';
import { Model } from '../Model';
import { ItemListView } from '../ItemListView';



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
  it('Contains a method populate()', () => {
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
    const sut = typeof controller.populate;
    //THEN
    expect(sut).toBe('function');
  });
  it('Contains a method addItem()', () => {
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
    const sut = typeof controller.addItem;
    //THEN
    expect(sut).toBe('function');
  });
  it('addItem adds a new item with a new randomUUID', () => {
    const data = [
      { id: '1-1', value: 'image1', imgUrl: 'url1' },
      { id: '1-2', value: 'image2', imgUrl: 'url2' },
      { id: '1-3', value: 'image3', imgUrl: 'url3' },
      { id: '1-4', value: 'image4', imgUrl: 'url4' },
      { id: '1-5', value: 'image5', imgUrl: 'url5' },
    ];
    const model = new Model(data);
    const itemListView = new ItemListView();
    const controller = new Controller(itemListView, model);
    controller.addItem({ id: '1-42', value: 'image42', imgUrl: 'url42' });
    //WHEN
    const sut = controller.getItemList();
    //THEN
    expect(sut).toEqual([
      { id: '1-1', value: 'image1', imgUrl: 'url1' },
      { id: '1-2', value: 'image2', imgUrl: 'url2' },
      { id: '1-3', value: 'image3', imgUrl: 'url3' },
      { id: '1-4', value: 'image4', imgUrl: 'url4' },
      { id: '1-5', value: 'image5', imgUrl: 'url5' },
      { id: '1-42', value: 'image42', imgUrl: 'url42' }
    ]);
  });
});