const {fetchSightsById} = require('./models')

exports.getSightsById = (req, res, next) => {
    const {sights_id} = req.params
    return fetchSightsById(sights_id)
    .then((response) => {
        res.status(200).send(response)
    })
    .catch(next)
}