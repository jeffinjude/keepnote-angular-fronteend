import { ListViewPage } from './page-objects/listview.po';

describe('list view page', () => {
  let page: ListViewPage;
  const emptyNoteValues = ['', ''];
  const editNoteDefaultValues = ['Read Angular 5 blog', 'Shall do at 6 pm', 'not-started'];
  const editNote = ['Read Angular 1 blog', 'Shall do at 10.30 pm', 'not-started'];

  beforeEach(() => {
    page = new ListViewPage();
  });

  it('should render take a note card', () => {
    page.navigateToListView();
    expect(page.isNotePanelPresent()).toBeTruthy('<mat-expansion-panel> should exist');
    expect(page.isNotePanelTitlePresent()).toBeTruthy('<mat-panel-title> should exist');
    page.getNotePanel().click();
    expect(page.getNotePanelTitleText()).toEqual('Take a note',
      '<mat-panel-title> should look like <mat-panel-title>Take a note</mat-panel-title>');
    expect(page.isTitleInputBoxPresent()).toBeTruthy('Title input box should exist with name attribute as title');
    expect(page.isTextInputBoxPresent()).toBeTruthy('Text input box should exist with name attribute as text');
    expect(page.isDoneButtonPresent()).toBeTruthy('Done button exists with Done text');
  });

  it('should create a note', () => {
    page.navigateToListView();
    page.getNotePanel().click();
    expect(page.getNotePanelDefaultValues()).toEqual(emptyNoteValues, 'Default values for title and text should be empty');
    const newNoteValues = page.addNoteValues();
    expect(page.getNotePanelDefaultValues()).toEqual(newNoteValues, 'Should be able to set values for note title and text');
    page.clickDoneButton();
  });

});
