var ran1 = Math.floor(Math.random() * 6) + 1;
var ran2 = Math.floor(Math.random() * 6) + 1;

if (ran1 > ran2) {
    document.querySelector("h1").textContent = "Player 1 Wins! 🚩";
}
else if (ran1 < ran2) {
    document.querySelector("h1").textContent = "Player 2 Wins!🚩";
}
else {
	document.querySelector("h1").textContent = "It's a tie! 🚩";
}

var image1 = ("./images/dice" + ran1 + ".png");
var image2 = ("./images/dice" + ran2 + ".png");
document.querySelectorAll("img")[0].setAttribute("src", image1); 
document.querySelectorAll("img")[1].setAttribute("src", image2)