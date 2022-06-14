let NodeCache = require("node-cache"),
	myCache = new NodeCache({ stdTTL: 300 }) // Cache for 300 seconeds

const routerCache = (req, res, next) => {
	if (req.method !== "GET") {
		console.log("There is no cache for non-GET requests")
		return next()
	}
	// If the key is exist in the cache, return the value
	let key = req.originalUrl
	let cachedData = myCache.get(key)
	if (cachedData) {
		console.log("We have data in cache" + key)
		res.send(cachedData)
		return
	} else {
		// If the key is not exist in the cache, set it and return the value
		console.log("No data in cache")
		res.originalSendReference = res.send // Save the original res.send function in a reference
		res.send = (body) => {
			res.originalSendReference(body) // Call the original res.send function with the value
			myCache.set(key, body)
		}
		next()
	}
}

module.exports = routerCache
