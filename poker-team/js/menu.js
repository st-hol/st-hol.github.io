/*function myFunction() {
    var x = document.getElementById('myTopnav');
    if(x.className === "topnav"){
    	x.className += " responsive"; // пробел, чтобы небыло topnavresponsive
    }else{
    	x.className = "topnav";
    }
}*/
/*
function myFunction() {
    var x = document.getElementById("myTopnav");
    x.classList.toggle("responsive");
}*/


function myFunction() {
    var x = document.getElementsByClassName("topnav");
    x = [].slice.call(x); //I have converted the HTML Collection an array
    x.forEach(function(item, i, arr) {
   		 x[i].classList.toggle("responsive");
   		 
	});
}

/*function myFunction() {
    var x = document.getElementsByClassName("myTopnav");
    console.log(x);
   	for (var i = 0; i < x.length; i++) {
   		x[i].classList.toggle("responsive");
   	}
};*/