import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://my1playground-34962-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");
const shoppingListEl = document.getElementById("shopping-list");

const inputFieldEl1 = document.getElementById("input-field1");
const inputFieldEl2 = document.getElementById("input-field2");

const addButtonEl = document.getElementById("add-button");

addButtonEl.addEventListener("click", function () {
  let inputValue1 = inputFieldEl1.value;
  let inputValue2 = inputFieldEl2.value;
  const ad = {
    inputValue1,
    inputValue2,
  };
  //used for pushing the value from input to database
  push(shoppingListInDB, ad);

  // clearInputFieldEl();
});
onValue(shoppingListInDB, (snapshot) => {
  const data = snapshot.id;
  console.log(data); // Here you can use the data fetched from the database
});
onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here... yet";
  }
});
function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}
//it clear the input value entered
function clearInputFieldEl() {
  inputFieldEl.value = "";
}
var int;
//function to append new element in the list and update that in the database
function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  // console.log(itemID);
  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    //remove the list after clicking on it
    onValue(exactLocationOfItemInDB, (snapshot) => {
      const data = snapshot.val();
      console.log(data); // Here you can use the data fetched from the database
    });
    remove(exactLocationOfItemInDB);
  });
  shoppingListEl.append(newEl);
}
