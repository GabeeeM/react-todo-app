# React Todo App

## General Information
This is a todo app that I developed in react and bootstrapped with create react app, the design was taken from [frontend mentor](https://www.frontendmentor.io/challenges).


## Technologies Used
- React - version 18.0
- Tailwind - version 3.1.7

## Demo
![Usage Gif](https://github.com/GabeeeM/react-todo-app/blob/main/demo.gif)

## Challenges and Room for Improvement
The first challenge I encountered while developing this project was using .map() correctly to return each index in an array as html. I had never tried to do that on my own, just seen examples of it being used. The biggest hurdle I encountered though was the asynchronous state updating in react, I had never given thought to using useEffect or any callbacks when updating state. Through working on this project I gained a greater familarity with the way react works under the hood as well as an understanding as to why certain things are the way they are. If I were to do this project again, I would try to simplify the process of rendering the task array in the unordered list by maybe nesting the .map() snippet of code directly in the jsx instead of making it it's own function. I would also try to rely less on temporary variables I initialized to try and get around the asynchronous state updating of react and instead just rely on useEffect to resolve any issues I have with that.
