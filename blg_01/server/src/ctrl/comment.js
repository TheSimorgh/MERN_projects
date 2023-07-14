exports.get = async (req, res) => {
    try {
console.log("get Comment");
res.send({message:"Comment GEt"})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };