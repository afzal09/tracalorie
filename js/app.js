class CalorieTracker {
    // constructor function
    constructor() {
        this._calorieLimit = 2000;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
    }
    // public methods
    addMeal(meal){
        this._meals.push(meal);
        this._totalCalories += meal.calories;
    }
    addWorkouts(workout){
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
    }
}

class Meal {
    constructor(name,calories){
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}
class Workouts{
    constructor(name,calories){
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

const tracker = new CalorieTracker();
const breakfast = new Meal('Bread Jam', 1000);
const lunch = new Meal('Rice & Curry', 1000);
const workout = new Workouts('Morning run',500 );
tracker.addMeal(breakfast);
tracker.addWorkouts(workout);
console.log(tracker._totalCalories);