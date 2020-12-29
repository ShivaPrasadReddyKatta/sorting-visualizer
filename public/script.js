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

//Function to disable all the buttons while an algorithm is running to make things simple and easy.
function disableButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

//Function to enable all the buttons after an algorithm finishes running.
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
    // block.style.transition = `all ${anim_speed.value * 0.01}s ease`;
    container.appendChild(block);
  }
  enableButtons();
}

//This swap function is used for bubble sort and insertion sort
function swapOne(el1, el2) {
  return new Promise(function (resolve) {
    const transform1 = el1.style.transform;
    const transform2 = el2.style.transform;
    el1.style.transform = transform2;
    el2.style.transform = transform1;

    window.requestAnimationFrame(function () {
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, Math.pow(10, anim_speed.value));
    });
  });
}

//This swap function is for selection sort and quick sort
function swapTwo(el1, el2) {
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
      }, Math.pow(10, anim_speed.value));
    });
  });
}

/*******************************************************/
/******************BUBBLE SORT**************************/
/*******************************************************/

async function bubbleSort() {
  let blocks = document.querySelectorAll(".block");
  for (let i = 0; i < blocks.length - 1; i++) {
    for (let j = 0; j < blocks.length - i - 1; j++) {
      blocks[j].style.background = "#ff105e";
      blocks[j + 1].style.background = "#ff105e";
      await new Promise(function (resolve) {
        setTimeout(() => {
          resolve();
        }, Math.pow(10, anim_speed.value));
      });
      if (
        parseInt(blocks[j].style.height) > parseInt(blocks[j + 1].style.height)
      ) {
        await swapOne(blocks[j], blocks[j + 1]);
        blocks = document.querySelectorAll(".block");
      }
      blocks[j].style.background = "cyan";
      blocks[j + 1].style.background = "cyan";
    }
  }
  enableButtons();
}

/*******************************************************/
/*****************INSERTION SORT************************/
/*******************************************************/

async function insertionSort() {
  let blocks = document.querySelectorAll(".block");
  for (let i = 1; i < blocks.length; i++) {
    let j = i;
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, Math.pow(10, anim_speed.value));
    });
    while (
      j > 0 &&
      parseInt(blocks[j].style.height) < parseInt(blocks[j - 1].style.height)
    ) {
      blocks[j].style.background = "#ff105e";
      blocks[j - 1].style.background = "#ff105e";
      await swapOne(blocks[j - 1], blocks[j]);
      blocks = document.querySelectorAll(".block");
      j--;
      blocks[j].style.background = "cyan";
      blocks[j + 1].style.background = "cyan";
    }
  }
  enableButtons();
}

/*******************************************************/
/******************SELECTION SORT***********************/
/*******************************************************/

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
        }, Math.pow(10, anim_speed.value));
      });

      if (
        parseInt(blocks[j].style.height) <
        parseInt(blocks[min_ind].style.height)
      ) {
        min_ind = j;
      }
      blocks[j].style.background = "cyan";
    }
    await swapTwo(blocks[i], blocks[min_ind]);
    blocks[min_ind].style.background = "cyan";
    blocks = document.querySelectorAll(".block");
  }
  enableButtons();
}

/*******************************************************/
/**********************QUICK SORT***********************/
/*******************************************************/

async function quickSort() {
  let blocks = document.querySelectorAll(".block");
  await quickSortHelper(blocks, 0, blocks.length - 1);
  enableButtons();
}

async function quickSortHelper(blocks, strtIdx, endIdx) {
  if (strtIdx >= endIdx) return;
  const pivotIdx = strtIdx;
  blocks[pivotIdx].style.background = "#FFD933";
  let leftIdx = strtIdx + 1;
  let rightIdx = endIdx;
  while (rightIdx >= leftIdx) {
    blocks[leftIdx].style.background = "#ff105e";
    blocks[rightIdx].style.background = "#ff105e";
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, Math.pow(10, anim_speed.value));
    });
    if (
      parseInt(blocks[leftIdx].style.height) >
        parseInt(blocks[pivotIdx].style.height) &&
      parseInt(blocks[rightIdx].style.height) <
        parseInt(blocks[pivotIdx].style.height)
    ) {
      await swapTwo(blocks[leftIdx], blocks[rightIdx]);
      blocks = document.querySelectorAll(".block");
      blocks[leftIdx].style.background = "cyan";
      blocks[rightIdx].style.background = "cyan";
    }

    if (
      parseInt(blocks[leftIdx].style.height) <=
      parseInt(blocks[pivotIdx].style.height)
    ) {
      blocks[leftIdx].style.background = "cyan";
      leftIdx++;
      if (leftIdx < blocks.length) blocks[leftIdx].style.background = "#ff105e";
    }

    if (
      parseInt(blocks[rightIdx].style.height) >=
      parseInt(blocks[pivotIdx].style.height)
    ) {
      blocks[rightIdx].style.background = "cyan";
      rightIdx--;
      blocks[rightIdx].style.background = "#ff105e";
    }
  }

  await swapTwo(blocks[pivotIdx], blocks[rightIdx]);
  blocks = document.querySelectorAll(".block");
  blocks[pivotIdx].style.background = "cyan";
  blocks[rightIdx].style.background = "cyan";
  if (leftIdx < blocks.length) blocks[leftIdx].style.background = "cyan";

  const leftSubarrayIsSmaller =
    rightIdx - 1 - strtIdx < endIdx - (rightIdx + 1);
  if (leftSubarrayIsSmaller) {
    await quickSortHelper(blocks, strtIdx, rightIdx - 1);
    await quickSortHelper(blocks, rightIdx + 1, endIdx);
  } else {
    await quickSortHelper(blocks, rightIdx + 1, endIdx);
    await quickSortHelper(blocks, strtIdx, rightIdx - 1);
  }
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
    case "quick":
      quickSort();
      break;
  }
}

//Here we are calling the generate blocks function
generateBlocks(arr_size.value);

//Adding event listeners to the buttons and running appropriate algorithm based on user input
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", approAlgo);
}
