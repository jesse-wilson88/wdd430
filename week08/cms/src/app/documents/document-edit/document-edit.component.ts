import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {}
}
