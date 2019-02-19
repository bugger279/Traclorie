// Storage Controller

// Item Controller

const ItemCtrl = (function () {
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    items: [
      {id: 0, name: 'Meat', calories: 1200},
      {id: 1, name: 'Cookies', calories: 400},
      {id: 2, name: 'Eggs', calories: 800},
      {id: 3, name: 'Chocolate', calories: 60}
    ],
    currentItem: null,
    totatCalories: 0
  }

  // return data;
  // We return those data which we want to be publicly available
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let ID;
      //Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length -1].id + 1;
      } else {
        ID = 0;
      }

      // Calories into Number
      calories = parseInt(calories);
      // newItem
      newItem = new Item(ID, name, calories)
      // push new item to items array
      data.items.push(newItem);
      return newItem;
    },
    logData: function () {
      return data;
    }
  }
})();

// UI Controller
const UICtrl = (function () {

  const UISelectors = {
    itemList : '#item-list',
    addBtn   : '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
  }
  return {
    populateItemList: function(items) {
      let html = '';

      items.forEach(item => {
        html+=`
        <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>
        `;
      });

      // redering to HTML

      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput:() =>({
      name: document.querySelector(UISelectors.itemNameInput).value,
      calories: document.querySelector(UISelectors.itemCaloriesInput).value
    }),
    getSelectors: () => UISelectors
  }
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {
  // load Event Listener
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();
    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }

  const itemAddSubmit = function (e) {
    // Get item input
    const input = UICtrl.getItemInput();
    // check for name and calorie input
    if (input.name!== '' && input.calories!== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    }
    e.preventDefault();
  }
  return {
    init: function () {
      // Fetch Items from List
      const items = ItemCtrl.getItems();
      // Populate List with items
      UICtrl.populateItemList(items);
      // Load Event Listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

App.init();