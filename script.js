//Global variable
let sort = {};
//List generation function
sort.generateList = (size) => {
	list = [];
	for (let i = 0; i < size; i++) {
		list.push(Math.floor(Math.random() * 10000));
	}
	return list;
}
//Bubble sort algorithm
sort.bubbleSort = (list) => {
	let start = (new Date).getTime();
	let swap = true;
	do {
		swap = false;
		for (let i = 1; i < list.length; i++) {
			if (list[i] < list[i - 1]) {
				temp = list[i];
				list[i] = list[i - 1];
				list[i - 1] = temp;
				swap = true;
			}
		}
	} while (swap);
	return (new Date).getTime() - start;
}
//Insertion sort algorithm
sort.insertionSort = (list) => {
	let start = (new Date).getTime();
	for (let i = 1; i < list.length; i++) {
		let temp = list[i];
		let j = i - 1;
		while (j >= 0 && list[j] > temp) {
			list[j + 1] = list[j];
			j--;
		}
		list[j + 1] = temp;
	}
	return (new Date).getTime() - start;
}
window.addEventListener("resize", () => {
	location.reload();
});
sort.canvas = document.getElementsByTagName("canvas")[0];
let ctx = sort.canvas.getContext("2d");
sort.canvas.width = window.innerWidth;
sort.canvas.height = window.innerHeight;
sort.ymax = null;
sort.running = false;
function runModel (xmax) {
	//Generate data
	bubbleTimes = [];
	insertionTimes = [];
	for (let i = 1; i <= xmax * 1000; i += 1000) {
		bubbleTimes.push(sort.bubbleSort(sort.generateList(i)));
		insertionTimes.push(sort.insertionSort(sort.generateList(i)));
	}
	if (sort.ymax === null) {
		sort.ymax = Math.max(...bubbleTimes) > Math.max(...insertionTimes) ? Math.max(...bubbleTimes) * 1.25 : Math.max(...insertionTimes) * 1.25;
	}
	//Bubble
	ctx.strokeStyle = "rgba(255, 0, 0, 0.1)";
	ctx.beginPath();
	for (let i = 0; i < bubbleTimes.length; i++) {
		let x = (i * (sort.canvas.width / (xmax - 1)));
		let y = sort.canvas.height - (bubbleTimes[i] * (sort.canvas.height / sort.ymax));
		if (i === 0) {
			ctx.moveTo(x, y);
		} else {
			ctx.lineTo(x, y);
		}
	}
	ctx.stroke();
	//Insertion
	ctx.strokeStyle = "rgba(0, 255, 0, 0.1)";
	ctx.beginPath();
	for (let i = 0; i < insertionTimes.length; i++) {
		let x = (i * (sort.canvas.width / (xmax - 1)));
		let y = sort.canvas.height - (insertionTimes[i] * (sort.canvas.height / sort.ymax));
		if (i == 0) {
			ctx.moveTo(x, y);
		} else {
			ctx.lineTo(x, y);
		}
	}
	ctx.stroke();
	//Recurse and update "iterations counter"
	setTimeout(() => {
		document.getElementById("iterations").innerHTML = parseInt(document.getElementById("iterations").innerHTML) + 1;
		document.getElementById("status").innerHTML = "Click to run ...";
		sort.running = false;
		sort.canvas.style.cursor = "pointer";
	}, 500);
}
//Run the model
sort.max = 10000;
document.getElementById("items").innerHTML = sort.max / 1000;
start = () => {
	if (sort.running === false) {
		sort.running = true;
		sort.canvas.style.cursor = "default";
		document.getElementById("status").innerHTML = "Running simulation ...";
		setTimeout(() => {runModel(sort.max / 1000);}, 500);
	}
};