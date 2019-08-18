import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})

// This component acts as the opener for EditNoteViewComponent which handles the edit process
export class EditNoteOpenerComponent {
  noteId: number;

  // MatDialog is for using angular material dialog. ActivatedRoute is to get the current route details
  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private routerService: RouterService) {
    this.activatedRoute.params.subscribe(params => this.noteId = params.noteId); // Get the note id from the url
    // Open the EditNoteViewComponent
    this.dialog.open(EditNoteViewComponent, {
      data: {
        noteId: this.noteId // pass note id as data to the popup
      }
    }).afterClosed().subscribe(res => { // After the dialog box closes navigate to notes view
      this.routerService.routeBack();
    });
  }
}
