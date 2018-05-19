(function () {
	const addNote = document.getElementById('add'),
		  app = document.getElementById('app');
	let offsetX, offsetY, currentItem;
	
	//adding notes
	addNote.addEventListener('click', function() {
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
		app.appendChild(node);
		node.addEventListener('mousedown', makeDraggable);
	});
	
	//draggable
	function makeDraggable(e) {
		currentItem = this;
		makeFirst(currentItem);
		if(e.target.nodeName === 'DIV') {
			offsetX = e.clientX - parseInt(this.offsetLeft);
			offsetY = e.clientY - parseInt(this.offsetTop);
			window.addEventListener('selectstart', disableSelect);
			window.addEventListener('mousemove', positionElement);
			window.addEventListener('mouseup', function() {
				window.removeEventListener('mousemove', positionElement);
				window.removeEventListener('selectstart', disableSelect);
			});
		}
	}
	function disableSelect(e) {
		e.preventDefault();
	}
	
	function positionElement(e) {
		currentItem.style.top = e.clientY - offsetY +"px";
		currentItem.style.left = e.clientX - offsetX +"px";
	}
	
	//remove
	function removeNote() {
		this.parentNode.parentNode.remove();
	}
	
	function makeFirst(item) {
		let elements = document.querySelectorAll('.note');
		for (let i = 0; i < elements.length; i++) {
			elements[i].classList.remove('index');
		}
		item.classList.add('index');
	}
})();
