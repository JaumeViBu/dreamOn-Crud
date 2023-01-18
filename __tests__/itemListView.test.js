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
});