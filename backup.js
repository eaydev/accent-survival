//Just a home of scripts I am moving about.

//ANIMATION FOR MENUS
let gameMenu = document.getElementsByClassName("gameMenu")[0];
let lifeList = document.getElementsByClassName("lifeScreen")[0];
//Initial state of the menu.
if(gameMenu.classList.contains("none")){
  gameMenu.classList.toggle("none");
} else {
//COllapsing the menu.
  gameMenu.classList.toggle("reverse-zoom");
  setTimeout(function(){
    gameMenu.classList.toggle("reverse-zoom");
    gameMenu.classList.toggle("none");
  },300)
}
