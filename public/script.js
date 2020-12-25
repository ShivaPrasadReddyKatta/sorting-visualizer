"use strict";

//Selecting all the necessary variables
const container = document.querySelector(".data-container");
const buttons = document.querySelectorAll("button");
const arr_size = document.querySelector("#arr-size");
const anim_speed = document.querySelector("#anim-speed");

//Adding event listener to array size range input and generating blocks dynamically based on its value
arr_size.addEventListener(
  "input",
  function (e) {
    generateBlocks(e.target.value);
  },
  false
);

//Disabling all buttons while an algorithm is running to make things simple and easy.
function disableButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

//Enabling all the buttons after an algorithm finishes running.
function enableButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}

//This function generates the blocks based on the input value from the user via range input
function generateBlocks(size = 20) {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 100 + 1);
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.height = `${value * 7}px`;
    block.style.width = `${100 / size - 0.1}%`;
    block.style.transition = `all ${anim_speed.value * 0.01}s ease`;
    container.appendChild(block);
  }
  enableButtons();
}

//This function is used to swap the blocks while sorting
function swap(el1, el2) {
  return new Promise(function (resolve) {
    const transform1 = el1.style.transform;
    const transform2 = el2.style.transform;
    el1.style.transform = transform2;
    el2.style.transform = transform1;

    window.requestAnimationFrame(function () {
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, anim_speed.value * 10);
    });
  });
}

//This swap function is exclusively for selection sort
function swapSelection(el1, el2) {
  return new Promise(function (resolve) {
    const transform1 = el1.style.transform;
    const transform2 = el2.style.transform;
    el1.style.transform = transform2;
    el2.style.transform = transform1;
    const siblingA = el1.nextSibling === el2 ? el1 : el1.nextSibling;

    window.requestAnimationFrame(function () {
      setTimeout(() => {
        container.insertBefore(el1, el2);
        container.insertBefore(el2, siblingA);
        resolve();
      }, anim_speed.value * 10);
    });
  });
}

//This is the bubble sort algorithm
async function bubbleSort() {
  let blocks = document.querySelectorAll(".block");
  for (let i = 0; i < blocks.length - 1; i++) {
    for (let j = 0; j < blocks.length - i - 1; j++) {
      blocks[j].style.background = "#ff105e";
      blocks[j + 1].style.background = "#ff105e";
      await new Promise(function (resolve) {
        setTimeout(() => {
          resolve();
        }, anim_speed.value * 10);
      });
      const value1 = Number(blocks[j].style.height.replace("px", ""));
      const value2 = Number(blocks[j + 1].style.height.replace("px", ""));
      if (value1 > value2) {
        await swap(blocks[j], blocks[j + 1]);
        blocks = document.querySelectorAll(".block");
      }
      blocks[j].style.background = "cyan";
      blocks[j + 1].style.background = "cyan";
    }
  }
  enableButtons();
}

//This is the insertion sort algorithm
async function insertionSort() {
  let blocks = document.querySelectorAll(".block");
  for (let i = 1; i < blocks.length; i++) {
    let j = i;
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, anim_speed.value * 10);
    });
    while (
      j > 0 &&
      Number(blocks[j].style.height.replace("px", "")) <
        Number(blocks[j - 1].style.height.replace("px", ""))
    ) {
      blocks[j].style.background = "#ff105e";
      blocks[j - 1].style.background = "#ff105e";
      await swap(blocks[j - 1], blocks[j]);
      blocks = document.querySelectorAll(".block");
      j--;
      blocks[j].style.background = "cyan";
      blocks[j + 1].style.background = "cyan";
    }
  }
  enableButtons();
}

//This is the selection sort algorithm
async function selectionSort() {
  let blocks = document.querySelectorAll(".block");
  for (let i = 0; i < blocks.length; i++) {
    let min_ind = i;
    blocks[min_ind].style.background = "#ff105e";
    for (let j = i + 1; j < blocks.length; j++) {
      blocks[j].style.background = "#ff105e";
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, anim_speed.value * 10);
      });

      if (
        Number(blocks[j].style.height.replace("px", "")) <
        Number(blocks[min_ind].style.height.replace("px", ""))
      ) {
        min_ind = j;
      }
      blocks[j].style.background = "cyan";
    }
    await swapSelection(blocks[i], blocks[min_ind]);
    blocks[min_ind].style.background = "cyan";
    blocks = document.querySelectorAll(".block");
  }
  enableButtons();
}

//This function is used to run appropriate algorithm based on the user input
function approAlgo() {
  disableButtons();
  switch (this.className) {
    case "new-array":
      generateBlocks(arr_size.value);
      break;
    case "bubble":
      bubbleSort();
      break;
    case "selection":
      selectionSort();
      break;
    case "insertion":
      insertionSort();
      break;
  }
}

//Here we are calling the generate blocks function
generateBlocks(arr_size.value);

//Adding event listeners to the buttons and running appropriate algorithm based on user input
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", approAlgo);
}
