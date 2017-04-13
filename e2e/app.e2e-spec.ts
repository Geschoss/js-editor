import { JsEditorPage } from './app.po';

describe('js-editor App', () => {
  let page: JsEditorPage;

  beforeEach(() => {
    page = new JsEditorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
