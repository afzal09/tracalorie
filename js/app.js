class CalorieTracker {
    // constructor function
    constructor() {
        this._calorieLimit = Storage.getLimit();
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
        this._displayMeal(meal);
        this._render();
    }
    addWorkouts(workout){
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        this._displayWorkout(workout);
    }
    removeMeal(id) {
        const index = this._meals.findIndex((meals) => meals.id === id);
        console.log(index);
        if (index !== -1) {
          const meal = this._meals[index];
          this._meals.splice(index, 1);
          this._totalCalories -= meal.calories;
          this._render();
        }
    }
    removeWorkout(id) {
        const index = this._workouts.findIndex((workout) => workout.id === id);
        if (index !== -1) {
          const meal = this._workouts[index];
          this._workouts.splice(index, 1);
          this._totalCalories -= meal.calories;
          this._render();
        }
    }
    reset(){
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        this._render();
    }
    setLimit(limit) {
        this._calorieLimit = limit;
        Storage.setLimit(limit);
        this._dislpayCalorieLimit();
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

    _displayMeal (meal) {
        const mealsEl = document.getElementById('meal-items');
        const mealEl = document.createElement('div');
        mealEl.setAttribute('data',meal.id);
        mealEl.classList.add('card','my-2');
        mealEl.innerHTML = `<div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${meal.name}</h4>
          <div
            class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
          >
            ${meal.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>`
        mealsEl.appendChild(mealEl);
    }
    _displayWorkout(workout) {
        const workoutsEl = document.getElementById('workout-items');
        const workoutEl = document.createElement('div');
        workoutEl.setAttribute('data',workout.id);
        workoutEl.classList.add('card','my-2');
        workoutEl.innerHTML = `<div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${workout.name}</h4>
          <div
            class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
          >
            ${workout.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>`
        workoutsEl.appendChild(workoutEl);
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
class Storage {
    static setLimit(calorieLimit){
        console.log(calorieLimit);
        localStorage.setItem('calorieLimit',calorieLimit);
    }
    static getLimit(defaultLimit = 2000) {
        let calorieLimit;
        if(localStorage.getItem('calorieLimit') === null) {
            calorieLimit = defaultLimit;
        }else{
            calorieLimit = +localStorage.getItem('calorieLimit')
        }
        return calorieLimit;
    }
}
// main App class 
class App {
    constructor() {
        this._tracker = new CalorieTracker();
        document.querySelector('#meal-form').addEventListener('submit', this._newItem.bind(this,'meal'));
        document.querySelector('#workout-form').addEventListener('submit', this._newItem.bind(this,'workout'));        
        document.querySelector('#meal-items').addEventListener('click', this._removeItem.bind(this,'meal'));
        document.querySelector('#workout-items').addEventListener('click', this._removeItem.bind(this,'workout'));
        document.querySelector('#filter-meals').addEventListener('keyup',this._filterItems.bind(this,'meal'));
        document.querySelector('#filter-workouts').addEventListener('keyup',this._filterItems.bind(this,'workout'));
        document.querySelector('#reset').addEventListener('click',this._reset.bind(this));
        document.querySelector('#limit-form').addEventListener('submit',this._setLimit.bind(this));

    }
    _newItem(type,e){
        e.preventDefault();
        const item = document.querySelector(`#${type}-name`);
        const calorie = document.querySelector(`#${type}-calories`);
        if (item.value === '' || calorie.value === '') { alert('Enter both fields')};
        if (type === 'meal') {
            const meal = new Meal(item.value, +calorie.value)
            this._tracker.addMeal(meal);
        } else {
            const workout = new Workouts(item.value, +calorie.value)
            this._tracker.addWorkouts(workout);
        }
        item.value = '';
        calorie.value = '';    
        const collapse = document.getElementById(`collapse-${type}`);
        const bsCollapse = new bootstrap.Collapse(collapse,{
            toggle:true
        })  
    }
    _removeItem (type, e) {
        e.preventDefault();
        if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
            if(confirm('are you sure')) {
                const id = e.target.closest('.card');
                e.target.closest('.card').remove();
                if (type === 'meal') {
                this._tracker.removeMeal(id.getAttribute('data'))
            }else{
                this._tracker.removeWorkout(id.getAttribute('data'))
            }
            }
        }
    }
    _filterItems(type, e){
        const text = e.target.value.toLowerCase();
        document.querySelectorAll(`#${type}-items .card`).forEach( item => {
            console.log(item);
            const items = item.firstElementChild.firstElementChild.textContent;
            console.log(items);
            if(items.toLowerCase().indexOf(text) !== -1) {
                item.style.display = 'block';
            }else {
                item.style.display = 'none';
            }
        });
    };
    _reset() {
        if(confirm("Are you sure all your saved data will be removed")) {
        this._tracker.reset();
        document.getElementById('meal-items').innerHTML = '';
        document.getElementById('workout-items').innerHTML = '';
        document.getElementById('filter-meals').value = '';
        document.getElementById('filter-workouts').value = '';
        }
}
    _setLimit(e){
        e.preventDefault();
        const limit = document.getElementById('limit');
        this._tracker.setLimit(+limit.value);
        limit.value = '';
        const modalEl = document.getElementById('limit-modal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
    }
}

const app = new App();