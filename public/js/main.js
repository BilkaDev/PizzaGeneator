const addons = document.querySelectorAll('.list-item')
const boxes = document.querySelectorAll('.div-list.addons')
const listAddons = document.querySelector('.list.addons')
const listChosen = document.querySelector('.list.chosen-addons')
const genBtn = document.querySelector('.generator-btn')
const deleteX = document.querySelectorAll('.deleted-x')

listAddons.addEventListener('click', e => {
	const addon = e.target.parentNode
	if (e.target.parentNode.getAttribute('draggable')) {
		listChosen.appendChild(addon)
		handleAddon()
	}
})
listChosen.addEventListener('click', e => {
	const addon = e.target.parentNode
	if (e.target.parentNode.getAttribute('draggable')) {
		listAddons.appendChild(addon)
		handleAddon()
	}
})

addons.forEach(addon => {
	addon.addEventListener('dragstart', e => {
		e.preventDefault
		addon.classList.add('is-dragged')
	})
	addon.addEventListener('dragend', e => {
		e.preventDefault

		addon.classList.remove('is-dragged')
	})
})

boxes.forEach(box => {
	box.addEventListener('dragover', e => {
		e.preventDefault
		const isDrag = document.querySelector('.is-dragged')
		box.children[0].appendChild(isDrag)
		handleAddon()
	})
})

const handleAddon = () => {
	if (listChosen.childElementCount > 0) {
		genBtn.classList.remove('isDisabled')
	} else {
		genBtn.classList.add('isDisabled')
	}
}

genBtn.addEventListener('click', () => {
	const chosenAddonsArray = []
	const addonsArray = []
	listChosen.childNodes.forEach(li => {
		if (li.dataset !== undefined) {
			chosenAddonsArray.push(li.dataset.addon)
		}
	})
	listAddons.childNodes.forEach(li => {
		if (li.dataset !== undefined) {
			addonsArray.push(li.dataset.addon)
		}
	})

	async function fetcher() {
		await fetch('/',
			{
				method: "POST",
				body: JSON.stringify(chosenAddonsArray),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
		location.reload();

	}

fetcher();






})

deleteX.forEach(item => {

	item.addEventListener('click', (e)=>{

		(async () => {
			const response = await fetch('/getCookies');
			const cookies = (await response.json())['pizza-addons'].filter(cookie => cookie !== e.target.dataset.addon);

			await fetch('/',
				{
					method: "POST",
					body: JSON.stringify(cookies),
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
			location.reload();
		})();



	})
})
