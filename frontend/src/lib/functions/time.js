export const howLongAgo = (date) => {
	const seconds = Math.floor((new Date() - new Date(date)) / 1000)
	let interval = Math.floor(seconds / 31536000)
	if (interval >= 1) {
		return `${interval} year${interval>1?'s':''} ago`
	}
	interval = Math.floor(seconds / 2592000)
	if (interval >= 1) {
		return `${interval} month${interval>1?'s':''} ago`
	}
	interval = Math.floor(seconds / 86400)
	if (interval >= 1) {
		return `${interval} day${interval>1?'s':''} ago`
	}
	interval = Math.floor(seconds / 3600)
	if (interval >= 1) {
		return `${interval} hour${interval>1?'s':''} ago`
	}
	interval = Math.floor(seconds / 60)
	if (interval >= 1) {
		return `${interval} minute${interval>1?'s':''} ago`
	}
	return `${Math.floor(seconds)} second${Math.floor(seconds)>1?'s':''} ago`
}

export const isDateToday = (date) => {
	console.log('date: ', new Date(date))
	console.log('today: ', new Date())
	const today = new Date()
	const dateToCompare = new Date(date)
	return dateToCompare.getDate() === today.getDate() && dateToCompare.getMonth() === today.getMonth() && dateToCompare.getFullYear() === today.getFullYear()
}