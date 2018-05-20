(function () {
	const addNote = document.getElementById('add'),
		app = document.getElementById('app');
	let offsetX, offsetY, currentItem,
		windowWidth = document.body.scrollWidth,
		windowHeight = document.body.scrollHeight;

	//adding notes
	addNote.addEventListener('click', createNote);
	function createNote(left, top, text, offsetW, offsetH) {
		let node = document.createElement('div'),
			textarea = document.createElement('textarea'),
			bar = document.createElement('div'),
			remove = document.createElement('button'),
			faTimes = document.createElement('span');
		node.className = 'note';
		textarea.setAttribute('spellcheck', 'false');
		bar.className = 'bar';
		faTimes.className = 'fa fa-times';
		remove.id = 'remove';
		remove.appendChild(faTimes);
		remove.addEventListener('click', removeNote);
		bar.appendChild(remove);
		node.appendChild(bar);
		node.appendChild(textarea);
		if(left) {
			node.style.left = left;
			node.style.top = top;
			textarea.textContent = text;
			textarea.style.width = offsetW-4 +"px";
			textarea.style.height = offsetH-4 +"px";
		}
		app.appendChild(node);
		node.addEventListener('mousedown', makeDraggable);
		save();
	}
	
	//draggable
	function makeDraggable(e) {
		currentItem = this;
		makeFirst(currentItem);
		if (e.target.nodeName === 'DIV') {
			offsetX = e.clientX - parseInt(this.offsetLeft);
			offsetY = e.clientY - parseInt(this.offsetTop);
			window.addEventListener('selectstart', disableSelect);
			window.addEventListener('mousemove', positionElement);
			window.addEventListener('mouseup', function () {
				window.removeEventListener('mousemove', positionElement);
				window.removeEventListener('selectstart', disableSelect);
			});
		} else if (e.target.nodeName === 'TEXTAREA') {
			window.addEventListener('keyup', function() {
				save();
			});
			window.addEventListener('mousemove', saveWidth)
			window.addEventListener('mouseup', function() {
				window.removeEventListener('mousemove', saveWidth);
			})
		}
	}
	
	function saveWidth() {
		save();
	}
	
	//disable select while dragging
	function disableSelect(e) {
		e.preventDefault();
	}
	
	function positionElement(e) {
		currentItem.style.top = e.clientY - offsetY + "px";
		currentItem.style.left = e.clientX - offsetX + "px";
		save();
	}

	//remove
	function removeNote() {
		this.parentNode.parentNode.remove();
		save();
	}
	
	//make on top
	function makeFirst(item) {
		let elements = document.querySelectorAll('.note');
		for (let i = 0; i < elements.length; i++) {
			elements[i].classList.remove('index');
		}
		item.classList.add('index');
	}

	//save
	function save() {
		let notes = [];
		for (let i = 1; i < app.children.length; i++) {
			notes.push({
				id: i,
				left: app.children[i].style.left,
				top: app.children[i].style.top,
				text: app.children[i].children[1].value,
				elementWidth: app.children[i].children[1].offsetWidth,
				elementHeight: app.children[i].children[1].offsetHeight
			});
		}
		localStorage.setItem('notes', JSON.stringify(notes));
	}
	
	//load
	function load() {
		let notesLoad = JSON.parse(localStorage.getItem('notes'));
		if (notesLoad != null && notesLoad != undefined) {
			for (let i = 0; i < notesLoad.length; i++) {
				createNote(notesLoad[i].left, notesLoad[i].top, notesLoad[i].text, notesLoad[i].elementWidth, notesLoad[i].elementHeight);
			}
		}
	}
	load();
})();
