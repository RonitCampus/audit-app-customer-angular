import { AuditAppcustomerAngularPage } from './app.po';

describe('audit-appcustomer-angular App', () => {
  let page: AuditAppcustomerAngularPage;

  beforeEach(() => {
    page = new AuditAppcustomerAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
