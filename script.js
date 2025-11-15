"use strict";

const getElement = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
    const p = getElement("#p");
    const startBtn = getElement("#start");
    const resetBtn = getElement("#reset");
    let a = getElement("#button-A");

    startBtn.addEventListener("click", () => {

        a.textContent = "Answer A";
        p.textContent = "Game Started!";
    });

    resetBtn.addEventListener("click", () => {
        a.textContent = "";

    })


})