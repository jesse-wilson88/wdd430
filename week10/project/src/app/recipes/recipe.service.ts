import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  private recipes: Recipe[];
  private postsUpdated = new Subject<Recipe[]>();
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [];

  constructor(
    private slService: ShoppingListService,
    private http: HttpClient
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    // return this.recipes.slice();
    this.http
      .get<{ message: string; recipes: Recipe[] }>(
        'http://localhost:3000/api/recipes'
      )
      .subscribe((recipeData) => {
        this.recipes = recipeData.recipes;
        this.postsUpdated.next([...this.recipes]);

      });
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
