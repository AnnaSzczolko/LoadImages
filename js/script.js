const wrapper = document.querySelector('.wrapper')
amountOfImages = 9

const lastImgOptions = {
	rootMargin: '0px 0px -20px 0px',
	threshold: 1,
}
let page = 0

const lastImgObserver = new IntersectionObserver(function (entries, lastImgObserver) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.remove('last')
			lastImgObserver.unobserve(entry.target)
			prepareImages()
		}
	})
}, lastImgOptions)

const createImgs = data => {
	const newImages =
	data.map(oneData => {
		const newItem = document.createElement('img')
		newItem.classList.add('img')
		newItem.src = oneData.download_url
		wrapper.append(newItem)
		return newItem
	})

	const lastItem = wrapper.querySelector('.img:last-of-type')
	lastItem.classList.add('last')
	lastImgObserver.observe(lastItem)
}

async function prepareImages() {
	const dataSource = await getSource()
	createImgs(dataSource)
}

const getSource = () => {
	page++
	let URL = 'https://picsum.photos/v2/list?page=' + page + '&limit=' + amountOfImages

	return fetch(URL).then(res => res.json())
}

prepareImages()
