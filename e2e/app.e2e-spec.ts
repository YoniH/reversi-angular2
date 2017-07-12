import { ReversiAngular2Page } from './app.po';

describe('reversi-angular2 App', () => {
  let page: ReversiAngular2Page;

  beforeEach(() => {
    page = new ReversiAngular2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
