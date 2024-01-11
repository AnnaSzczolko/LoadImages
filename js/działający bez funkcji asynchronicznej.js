const wrapper = document.querySelector('.wrapper')
const Imgs = document.querySelectorAll('.img')

const lastImg = document.querySelector('.last')
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
			createImgs()
		}
	})
}, lastImgOptions)

const createImgs = () => {
    const allNewItems = []

	for (i = 0; i < 9; i++) {
		const newItem = document.createElement('img')
        newItem.setAttribute('src', '')
        newItem.setAttribute('alt', '')
        newItem.setAttribute('loading', 'lazy')
		newItem.classList.add('img')
		wrapper.append(newItem)

        allNewItems.push(newItem)
	}

	const lastNewItem = document.querySelector('.img:last-of-type')
	lastNewItem.classList.add('last')
	lastImgObserver.observe(lastNewItem)


    getImages(allNewItems);
}


const getImages = (item) => {
    page++
    let URL =  'https://picsum.photos/v2/list?page=' + page + '&limit=9'
	fetch(URL)
		.then(res => res.json())
		.then(data => {
           for( i=0; i<9; i++){

               item[i].src= data[i].download_url
           }
		})
}

lastImgObserver.observe(lastImg)
getImages(Imgs)
