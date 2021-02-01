var xPos=0;
var yPos=0;
var directionX=true;
var directionY=true;
var step=1;
var speed=1;
function move(){
    var float=document.getElementById("float");
    if(float) {
	var height=document.documentElement.clientHeight;
	var width=document.documentElement.clientWidth;
	var imgHeight=float.offsetHeight;
	var imgWidth=float.offsetWidth;
	float.style.left=xPos+document.documentElement.scrollLeft+"px";
	float.style.top=yPos+document.documentElement.scrollTop+"px";
	if(directionX){xPos=xPos+step;}else{xPos=xPos-step;}
	if(xPos<=0){xPos=0;directionX=true;}
	if(xPos>=width-imgWidth){xPos=width-imgWidth;directionX=false;}
	
	if(directionY){yPos=yPos+step;}else{yPos=yPos-step;}
	if(yPos<=0){yPos=0;directionY=true;}
    if(yPos>=height-imgHeight){yPos=height-imgHeight;directionY=false;}
    }
	t=setTimeout(move,speed);
    }
window.onload = move;