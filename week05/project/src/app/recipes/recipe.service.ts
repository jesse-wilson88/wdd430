import { EventEmitter } from "@angular/core";

import { Recipe } from "./recipe.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
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

  getRecipe() {
    return this.recipes.slice();
  }
}