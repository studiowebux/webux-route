const route = async (req, res, next) => {
  await setTimeout(() => {
    console.log("I'm doing something great, ");
  }, 5000);

  return res.status(200).send("Remove !");
};

module.exports = { route };
