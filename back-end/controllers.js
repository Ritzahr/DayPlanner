const {
  fetchSightsById,
  fetchAllUsers,
  fetchUserById,
  saveNewUser,
  updateUser,
} = require("./models");

exports.getSightsById = (req, res, next) => {
  const { sights_id } = req.params;
  return fetchSightsById(sights_id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(next);
};

exports.getAllUsers = (req, res, next) => {
  return fetchAllUsers().then((response) => {
    res.status(200).send(response);
  });
};

exports.getUserById = (req, res, next) => {
  const { username } = req.params;
  return fetchUserById(username)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(next);
};

exports.postNewUser = (req, res, next) => {
  const { body } = req;
  return saveNewUser(body)
    .then((response) => {
      res.status(201).send(response);
    })
    .catch(next);
};

exports.patchUser = (req, res, next) => {
  const { username } = req.params;
  const { body } = req;
  return updateUser(username, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(next);
};
