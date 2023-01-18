const { ItemListView } = require('../ItemListView');

describe('CRUD ItemListView', () => {
  it('Contains a private property for every dom element of the web page', () => {
    //GIVEN
    //WHEN
    const sut = new ItemListView();
    //THEN
    expect(sut).toHaveProperty('inputValue');
    expect(sut).toHaveProperty('inputImg');
    expect(sut).toHaveProperty('listdom');
    expect(sut).toHaveProperty('formItems');
    expect(sut).toHaveProperty('imgShowFormItems');
    expect(sut).toHaveProperty('inputFilter');
    expect(sut).toHaveProperty('btns_add');
    expect(sut).toHaveProperty('btns_update');
  });

  it('Contains a method render()', () => {
    //GIVEN
    //WHEN
    const sut = typeof new ItemListView().render;
    //THEN
    expect(sut).toBe('function');
  });
  it('Contains a method filterList()', () => {
    //GIVEN
    //WHEN
    const sut = typeof new ItemListView().filterList;
    //THEN
    expect(sut).toBe('function');
  });
  it('Contains a method listToHTML()', () => {
    //GIVEN
    //WHEN
    const sut = typeof new ItemListView().listToHtml;
    //THEN
    expect(sut).toBe('function');
  });
  it('Contains a method enableBtns()', () => {
    //GIVEN
    //WHEN
    const sut = typeof new ItemListView().enableBtns;
    //THEN
    expect(sut).toBe('function');
  });
});