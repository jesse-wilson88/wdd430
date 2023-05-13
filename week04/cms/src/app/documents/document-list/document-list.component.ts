import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(
      '1',
      'WDD 331R - Advanced CSS',
      'This course provides deeper learning into topics in cascading style sheets (CSS). Topics of study will include: complex CSS selectors, advanced CSS layout and positioning techniques, CSS transitions and animations, CSS Preprocessing, an introduction to CSS libraries, and using scalable vector graphics (SVG) with HTML and CSS.',
      'https://byui-cit.github.io/advcss/resources/syllabus-choose.html',
      null
    ),
    new Document(
      '2',
      'CS 124 - Intro to Software Development',
      'CS 124 is the first class in a two class sequence exploring how to write code in C++. The first class, CS 124, teaches us how to write procedural programs. The second class, CS 165, teaches us how to write object oriented programs. The goal of CS 124 is that each student will be able to solve problems in C++ and have a solid foundation in software development methodology.',
      'https://content.byui.edu/file/cddfb9c0-a825-4cfe-9858-28d5b4c218fe/1/Course/124.Syllabus-Online.html',
      null
    ),
    new Document(
      '3',
      'CIT 111 - Introduction to Databases',
      'This course teaches the basic elements of database management systems. It introduces students to the concepts of logical and physical relationships in a data model and the concept of inner join. Students will use a computer-aided software engineering (CASE) tool to design, create, and query a database.This course does not fulfill a requirement for students majoring in Computer Information Technology. It is a requirement for students majoring in Information Systems and for several minors, clusters, and emphases.',
      'https://content.byui.edu/file/1986b367-1608-4d0c-8542-fa926064b6e2/4/syllabus.html',
      null
    ),
    new Document(
      '4',
      'CS 101 - Introduction to Programming',
      'This course provides an introduction to computer programming intended for people with no programming experience. This course is recommended for non-majors in order to get an overview of programming principles and techniques. This course covers the basics of programming in Python, including elementary data types (numeric types, strings, lists, dictionaries, and files), control flow, functions, objects, methods, fields, and mutability.',
      'https://content.byui.edu/file/5cf9c6d8-09ec-4cfd-8f9f-113556ddd03e/5/CS101syllabus.html',
      null
    ),
    new Document(
      '5',
      'FDMAT 108 - Math for the Real World',
      'FDMAT 108 introduces the quantitative reasoning process. This process teaches you to use algebraic, computational, statistical, and graphical tools to make informed decisions about financial, family, social, and community issues. FDMAT 108 will satisfy the BYU-Idaho Foundations quantitative reasoning requirement, but it does not serve as a prerequisite for college algebra, trigonometry, or calculus-based courses.',
      'https://content.byui.edu/file/fb4c2d20-04c3-463d-93f6-725064a8b15d/18/fdmat108syllabus.html',
      null
    ),
    // new Document('1', 'WDD430 Full-Stack', 'desc1', 'url1', null),
    // new Document('2', 'CSE Arch Design', 'desc2', 'url2', null),
    // new Document('3', 'CIT327 Data WHSE', 'desc3', 'url3', null),
    // new Document('4', '2023 Devotional', 'desc4', 'url4', null),
    // new Document('5', 'CES325 .NET', 'desc5', 'url5', null),
  ];
  constructor() {}

  ngOnInit() {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
