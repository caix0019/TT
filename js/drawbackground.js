function backgroudlayer()
{
	var lc=document.getElementById("backGroundCanvas");
	var gc=lc.getContext("2d");
	img=document.getElementById("backgroundImage");
	gc.drawImage(img,40,20);
}