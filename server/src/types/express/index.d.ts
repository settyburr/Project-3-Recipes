declare namespace Express {
  interface Request {
    user?: {
      username: string;
    };
  }
}

declare module 'spoonacular' {
  export class SpoonacularClient {
    constructor(apiKey: string);

    getRandomRecipes(params: { number: number }): Promise<{ recipes: Array<any> }>;
  }
}