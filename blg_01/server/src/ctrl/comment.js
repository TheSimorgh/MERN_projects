exports.get = async (req, res) => {
    try {
console.log("get Comment");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };