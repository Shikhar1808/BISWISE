import { k } from "./kaboomCtx";
import { createHomeScene } from "./scenes/home";
import { createOutsideScene } from "./scenes/outside";
import { createGroceryScene } from "./scenes/grocery";
import { createWorkshopScene } from "./scenes/workshop";
import { createEstoreScene } from "./scenes/estore";
import { addItem,removeItem,inventoryState,loadState} from "./inventory";
import { tasks } from "./constants";
import { createColonyScene } from "./scenes/colony";
import { createScene2 } from "./scenes/scene2";
import { createScene3 } from "./scenes/scene3";
import { createPharmacyScene } from "./scenes/pharmacy";
import { createParkScene } from "./scenes/park";
import { createScene4 } from "./scenes/scene4";
import { createScene5 } from "./scenes/scene5";
import { createLibraryScene } from "./scenes/library";
import { createScene6 } from "./scenes/scene6";
import { createHomeScene1 } from "./scenes/home1";
import { createHomeScene2 } from "./scenes/home2";
import { createHomeScene3 } from "./scenes/home3";
import { createHomeScene5 } from "./scenes/home5";
import { createHomeScene4 } from "./scenes/home4";
import { createManufacturingScene } from "./scenes/manufacturing";

k.loadSprite("spritesheet", "./spritesheet.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "idle-down": 936,
    "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
    "idle-side": 975,
    "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
    "idle-up": 1014,
    "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
  },
});

k.loadSprite("map", "./map.png");
k.loadSprite("mapTwo", "./map-2.png");
k.loadSprite("mapThree", "./grocery-final.png");
k.loadSprite("mapFour", "./workshop.png");
k.loadSprite("mapFive", "./e-store.png");
k.loadSprite("mapSix", "./colony.jpeg");
k.loadSprite("mapSeven", "./scene_2.jpg");
k.loadSprite("mapEight", "./scene_3.jpeg");
k.loadSprite("mapNine", "./pharmacy.png");
k.loadSprite("mapTen", "./finalPark.png");
k.loadSprite("mapEleven", "./scene4.png");
k.loadSprite("mapTwelve", "./superMarket.png");
k.loadSprite("mapThirteen", "./library.png");
k.loadSprite("mapFourteen", "./scene6.png");
k.loadSprite("mapFifteen", "./cook.png");
k.loadSprite("mapSixteen", "./sleep.png");
k.loadSprite("mapSeventeen", "./machine.png");
k.loadSprite("mapEighteen", "./idle.png");
k.loadSprite("mapNineteen", "./manufacturing1.png");
k.loadSprite("mapTwenty", "./fridge.png");


k.setBackground(k.Color.fromHex("#311047"));

createHomeScene();
createOutsideScene();
createGroceryScene();
createWorkshopScene();
createEstoreScene();
createColonyScene();
createPharmacyScene();
createParkScene();
createScene2();
createScene3();
createScene4();
createScene5();
createLibraryScene();
createScene6();
createHomeScene1();
createHomeScene2(); 
createHomeScene3();
createHomeScene5();
createHomeScene4();
createManufacturingScene();

const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");

loadState();
console.log(inventoryState.currentScene);
k.go(inventoryState.currentScene);

// Attach event listeners for Add and Remove buttons
document.getElementById("add").addEventListener("click", (event) => {
  const itemName = event.target.className; // Get the class name of the button
  if (itemName) {
      addItem(itemName);
  } else {
      console.log("No item name found on Add button.");
  }
  canvas.focus(); // Refocus the canvas after clicking the button
});

document.getElementById("remove").addEventListener("click", (event) => {
  const itemName = event.target.className; // Get the class name of the button
  if (itemName) {
      removeItem(itemName);
  } else {
      console.log("No item name found on Remove button.");
  }
  canvas.focus(); // Refocus the canvas after clicking the button
});

let taskBox = document.querySelector('#currentTasks');
if(window.innerWidth<1024){
  taskBox.classList.remove('styleMin');
  taskBox.classList.add('styleMax');
}else{
  taskBox.classList.remove('styleMax');
  taskBox.classList.add('styleMin');
}
document.addEventListener("keydown",(event)=>{
  if (event.key === 't') {
  // Toggle the 'hidden' class on the target element
    console.log("key pressed");
    taskBox.innerHTML=tasks[inventoryState.level];
    taskBox.classList.toggle('hidden');
  } 
})

document.querySelector(".mobileNote").addEventListener("click",(event)=>{
  console.log("clicked");
  taskBox.innerHTML=tasks[inventoryState.level];
  taskBox.classList.toggle('hidden');
})

document.addEventListener("keydown", (event) => {
  if (event.key === "1") {
      // Add item logic for key "1"
      console.log(addButton.classList[0]);
      const itemName = addButton.classList[0];
      if(itemName){
        addItem(itemName);
        console.log(`Added item: ${itemName}`);
      } // Replace with dynamic logic if needed
  } else if (event.key === "2") {
      // Remove item logic for key "2"
      const itemName = addButton.classList[0];
      if(itemName){
        removeItem(itemName);
        console.log(`Removed item: ${itemName}`);
      }

  }
});


// document.getElementById("finish-grocery").addEventListener("click", (event) => {
//       logInventory();
// });















