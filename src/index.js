import { validateIp,getAddress } from './helpers';


const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');
const ipInfo = document.getElementById('ip');
const locationInfo = document.getElementById('location');
const timezoneInfo = document.getElementById('timezone');
const ispInfo = document.getElementById('isp');
var myMap;


btn.addEventListener('click',getData);
ipInput.addEventListener('keydown',handleKey);

function getData(){
	myMap.geoObjects.removeAll();
	if(validateIp(ipInput.value)){
		getAddress(ipInput.value)
			.then(setInfo);
	}
}

function handleKey(event){
	if(event.key === 'Enter'){
		getData();
	}
}

function setInfo(mapdata){
	console.log(mapdata);
	const {lat,lng,country,region,timezone} = mapdata.location;
	console.log(lat,lng);
	ipInfo.innerText = mapdata.ip;
	locationInfo.innerText =country + ', '+ region;
	timezoneInfo.innerText = timezone;
	ispInfo.innerText = mapdata.isp;

	myMap.panTo([lat, lng], {
		delay: 1500
  });
  myMap.geoObjects
			.add(new ymaps.Placemark([lat, lng],{},
				{
				preset: 'islands#circleIcon',
				iconColor: '#000000'}));
}



ymaps.ready(init);
	 function init() {
		myMap = new ymaps.Map("map", {
			center: [59.9386,30.3141],
			controls: [],
			zoom: 13,
			 },)
};

document.addEventListener('DOMContentLoaded',() => {getAddress('5.183.232.167').then(setInfo)});