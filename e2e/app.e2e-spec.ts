import { AcrossjClientPage } from './app.po';

describe('acrossj-client App', () => {
  let page: AcrossjClientPage;

  beforeEach(() => {
    page = new AcrossjClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('aj works!');
  });
});
