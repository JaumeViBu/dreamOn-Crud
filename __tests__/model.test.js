import { Model } from '../Model';

describe('CRUD model', () => {
  it('model has a data property, and we can acces it with getItemList method', () => {
    //GIVEN
    const data = [
      { id: '1-1', value: 'image1', imgUrl: 'url1' },
      { id: '1-2', value: 'image2', imgUrl: 'url2' },
      { id: '1-3', value: 'image3', imgUrl: 'url3' },
      { id: '1-4', value: 'image4', imgUrl: 'url4' },
      { id: '1-5', value: 'image5', imgUrl: 'url5' },
    ];
    const model = new Model(data)
    //WHEN
    const sut = model.getItemList();
    //THEN
    expect(sut).toEqual([
      { id: '1-1', value: 'image1', imgUrl: 'url1' },
      { id: '1-2', value: 'image2', imgUrl: 'url2' },
      { id: '1-3', value: 'image3', imgUrl: 'url3' },
      { id: '1-4', value: 'image4', imgUrl: 'url4' },
      { id: '1-5', value: 'image5', imgUrl: 'url5' },
    ]);
  });
  it('model setItemList receives an itemList and saves it inside data property', () => {
    //GIVEN
    const initialData = [
      { id: '1-1', value: 'image1', imgUrl: 'url1' },
      { id: '1-2', value: 'image2', imgUrl: 'url2' },
      { id: '1-3', value: 'image3', imgUrl: 'url3' },
      { id: '1-4', value: 'image4', imgUrl: 'url4' },
      { id: '1-5', value: 'image5', imgUrl: 'url5' },
    ];
    const model = new Model(initialData)
    const newData = [
      { id: '1-1', value: 'image1', imgUrl: 'url1' },
    ]
    //WHEN
    model.setItemList(newData);
    const sut = model.getItemList();
    //THEN
    expect(sut).toEqual([
      { id: '1-1', value: 'image1', imgUrl: 'url1' },
    ]);
  });
  it('Contains a method retrieveItems()', () => {
    //GIVEN
    //WHEN
    const sut = typeof new Model().retrieveItems;
    //THEN
    expect(sut).toBe('function');
  });
  it('Contains a method storeItems()', () => {
    //GIVEN
    //WHEN
    const sut = typeof new Model().storeItems;
    //THEN
    expect(sut).toBe('function');
  });
});