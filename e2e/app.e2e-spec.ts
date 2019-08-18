/* End to end test case for Keep application
author: JeffinJude
*/
import {browser, by, element } from 'protractor';

// Protractor is an end to end testing framework for angular. It executes all files in e2e folder with extension
// as e2e-spec.ts. It is configured in protractor.conf.js

// For executing this test append f before describe, also ensure there are 3 notes in db.json
xdescribe('E2E Test Suite', () => {
    it('when the app is loaded user is redirected to login', () => {
        browser.get('/'); // load the root of the app
        expect(browser.getCurrentUrl()).toContain('login');
        browser.sleep(5000); // To pause the browser
    });

    it('when the user logs in he is shown the notes view', () => {
        const inputElements = element.all(by.css('input')); // We select all the input elements in the page
        inputElements.get(0).sendKeys('admin'); // Send 'admin' content to first input element
        inputElements.get(1).sendKeys('password');
        element(by.css('button')).click(); // Simulate a button click

        expect(browser.getCurrentUrl()).toContain('noteview'); // Expect the redirected url to be noteview
    });

    it('user is able to get all the notes on the page from the server', () => {
        const notes = element.all(by.css('mat-card'));
        expect(notes.count()).toBeGreaterThan(0); // Expect that some notes are getting displayed from server
    });

    it('user is able to add a new note', () => {
        element(by.css('mat-expansion-panel')).click(); // Click the expansion panel first to get the note taker input elements
        element(by.css('input')).sendKeys('test_title');
        element(by.css('textarea')).sendKeys('test_text');
        element(by.css('button')).click();

        const notes = element.all(by.css('mat-card'));
        expect(notes.count()).toBe(4); // Initially we start with 3 notes in db.json, so after note is added count should be 4
    });

    it('added note should remain on the page when browser refreshes', () => {
        browser.refresh();
        const notes = element.all(by.css('mat-card'));
        expect(notes.count()).toBe(4); // After browser refresh also count should be 4
    });
});
