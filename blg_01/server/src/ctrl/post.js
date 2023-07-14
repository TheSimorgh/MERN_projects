exports.get = async (req, res) => {
    try {
console.log("get Post");
res.send({message:"Post GEt"})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };