// startTime and checkTime are stolen from w3schools
// see https://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
// ps i modified it thanks
module.exports = startTime = function() {
	var today = new Date();
	var h = today.getHours();
	if (h>12) h=h-12;
	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById("time").innerHTML = h + ":" + m + ":" + s + " " + date(today);
	var t = setTimeout(startTime, 500);
};
function checkTime(i) {
	if (i < 10) i = "0" + i;  // add zero in front of numbers < 10
	return i;
}
/**
* @description - tis my personal date manager function - note: can't actually go on dates using it
* @param {Date} _date 
*/
function date(_date){
	var dateString = "";
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	dateString += months[_date.getMonth()];
	dateString += " ";
	dateString += _date.getDate();
	dateString += ", ";
	dateString += _date.getFullYear();
	return dateString;
}