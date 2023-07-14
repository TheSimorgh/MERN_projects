exports.get = async (req, res) => {
    try {
console.log("get Category");
res.send({message:"Category GEt"})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };