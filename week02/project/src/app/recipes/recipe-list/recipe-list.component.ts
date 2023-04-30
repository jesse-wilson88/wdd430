import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://www.averiecooks.com/wp-content/uploads/2021/01/garlicbutterchicken-5.jpg'
    ),
    new Recipe(
      'A Test2 Recipe',
      'This is simply a test2',
      'https://www.averiecooks.com/wp-content/uploads/2021/01/garlicbutterchicken-5.jpg'
    ),
  ];

  constructor() {}

  ngOnInit() {}
}
