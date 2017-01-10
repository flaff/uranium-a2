import { UraniumA2Page } from './app.po';

describe('uranium-a2 App', function() {
  let page: UraniumA2Page;

  beforeEach(() => {
    page = new UraniumA2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
