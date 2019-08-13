const route = async (req, res, next) => {
  return res.status(200).json({ msg: "Find !", user: req.user });
};

module.exports = { route };
