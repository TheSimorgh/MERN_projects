exports.get = async (req, res) => {
    try {
console.log("get Category");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };