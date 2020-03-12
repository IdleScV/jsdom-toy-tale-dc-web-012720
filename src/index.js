let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
	const addBtn = document.querySelector('#new-toy-btn');
	const toyForm = document.querySelector('.container');
	addBtn.addEventListener('click', () => {
		addToy = !addToy;
		if (addToy) {
			toyForm.style.display = 'block';
		} else {
			toyForm.style.display = 'none';
		}
	});
	loadToys();
	const createToyBtn = document.querySelector('.add-toy-form');
	createToyBtn.addEventListener('submit', createNewToy);
});

function loadToys() {
	fetch('http://localhost:3000/toys')
		.then((response) => response.json())
		.then((toyArray) => toyArray.forEach((x) => processToys(x)));
}

function processToys(toy) {
	let collection = document.querySelector('#toy-collection');

	let card = document.createElement('div');
	card.classList.add('card');

	let toyName = document.createElement('h2');
	toyName.innerText = toy.name;

	let image = document.createElement('img');
	image.classList.add('toy-avatar');
	image.src = toy.image;

	let likes = document.createElement('p');
	likes.innerText = `${toy.likes} Likes `;

	let button = document.createElement('button');
	button.classList.add('like-btn');
	button.innerText = 'Like <3';
	button.addEventListener('click', newLike);
	button.id = toy.id;

	card.append(toyName, image, likes, button);

	collection.append(card);
}

function createNewToy(e) {
	e.preventDefault();

	// console.log('Button Working!');
	let toyName = e.target[0].value;
	let toyUrl = e.target[1].value;
	let payload = JSON.stringify({
		name: toyName,
		image: toyUrl,
		likes: 0
	});
	console.log(payload);

	fetch('http://localhost:3000/toys', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: payload
	})
		.then((res) => res.json())
		.then((toy) => processToys(toy));

	e.currentTarget.reset();
}

function newLike(e) {
	// console.log('Like Button Working');
	let toyId = e.target.id;
	let OldLike = e.target.parentElement.childNodes[2];
	let newLike = parseInt(OldLike.innerText.split(' ')[0]) + 1;
	OldLike.innerText = `${newLike} Likes`;
	// debugger;
	fetch(`http://localhost:3000/toys/${toyId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			likes: newLike
		})
	});
	// .then((res) => res.json())
	// .then((toy) => console.log(toy));
}
