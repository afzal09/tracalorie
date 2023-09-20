class CalorieTracker {
    // constructor function
    constructor() {
        this._calorieLimit = 2000;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        this._dislpayCalorieLimit();
        this._displayCalorieConsumed();
    }
    // public methods // 
    addMeal(meal){
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        this._render();
    }
    addWorkouts(workout){
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        this._render();
    }
    // Private methods //
    _dislpayCalorieLimit () {   // dynamic calorie limit diplayer
        const CalorieLimit = document.querySelector('#calories-limit');
        CalorieLimit.innerHTML = this._calorieLimit;
    }

    _displayTotalCalories () {   // dynamic total calories diplayer
        const TotalCalorieEl = document.querySelector('#calories-total')
        TotalCalorieEl.innerHTML = this._totalCalories;
    }

    _displayCalorieConsumed () { // dynamic calorie consumed diplayer
        const consumed = this._meals.reduce((total,meals) => total + meals.calories, 0);
        const calorieConsumed = document.querySelector('#calories-consumed');
        calorieConsumed.innerHTML = consumed;
    }

    _displayCalorieBurned () {  // dynamic calorie burned diplayer
        const burned = this._workouts.reduce((total,workout) => total + workout.calories, 0);
        const calorieburned = document.querySelector('#calories-burned');
        calorieburned.innerHTML = burned;
    }

    _displaycaloriesRemaining () {  // dynamic calorie remaning diplayer
        const calRemaining = this._calorieLimit - this._totalCalories;
        const caloriesRemaining = document.querySelector('#calories-remaining');
        const progressEl = document.querySelector('#calorie-progress');
        caloriesRemaining.innerHTML = calRemaining;
        // color change of parent card
        if (calRemaining <= 0){
            caloriesRemaining.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemaining.parentElement.parentElement.classList.add('bg-danger');
            progressEl.classList.remove('bg-success');
            progressEl.classList.add('bg-danger');

        }else{
            caloriesRemaining.parentElement.parentElement.classList.add('bg-light');
            caloriesRemaining.parentElement.parentElement.classList.remove('bg-danger');
            progressEl.classList.add('bg-success');
            progressEl.classList.remove('bg-danger');
        }
    }  

    _displayProgressBar () {
        const progressEl = document.querySelector('#calorie-progress');
        const progress = ((this._totalCalories / this._calorieLimit) * 100);
        const progressPercent = Math.min(progress,100);
        progressEl.style.width = `${progressPercent}%`;

    }
    _render() {
        this._displayTotalCalories();
        this._displayCalorieConsumed();
        this._displayCalorieBurned();
        this._displaycaloriesRemaining();
        this._displayProgressBar();
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
const breakfast = new Meal('Bread Jam', 4000);
const lunch = new Meal('lunch',600)
const workout = new Workouts('Morning run',320);
tracker.addMeal(breakfast);
tracker.addMeal(lunch);
tracker.addWorkouts(workout);