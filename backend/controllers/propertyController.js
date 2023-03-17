const Property = require("../models/Property");
const propertyController = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");

propertyController.get("/getAll", async (req, res) => {
  try {
    const properties = await Property.find({});

    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

propertyController.get("/find/featured", async (req, res) => {
  try {
    const featuredProperties = await Property.find({ featured: true }).populate(
      "currentOwner",
      "-password"
    );
    return res.status(200).json(featuredProperties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

propertyController.get("/find", async (req, res) => {
  const type = req.query;
  try {
    if (type) {
      const properties = await Property.find(type).populate(
        "currentOwner",
        "-password"
      );
      return res.status(200).json(properties);
    } else {
      return res.status(500).json({ msg: "No such type" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

propertyController.get("/find/types", async (req, res) => {
  try {
    const beachType = await Property.countDocuments({ type: "beach" });
    const mountainType = await Property.countDocuments({ type: "mountain" });
    const villageType = await Property.countDocuments({ type: "village" });

    return res.status(200).json({
      beach: beachType,
      mountain: mountainType,
      village: villageType,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

propertyController.get("/find/:id", async (req, res) => {
  try {
    const property = await Property.find(req.params.id).populate(
      "currentOwner",
      "-password"
    );
    if (!property) {
      throw new Error("no such property with this id");
    } else {
      return res.status(200).json(property);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

propertyController.post("/", verifyToken, async (req, res) => {
  try {
    const newProperty = await Property.create({
      ...req.body,
      currentOwner: req.user.id,
    });

    return res.status(201).json(newProperty);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

propertyController.put("/:id", verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property.currentOwner !== req.user.id) {
      throw new Error("You are not allowed to update other people properties");
    } else {
      const updateProperty = await Property.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
    }

    return res.status(200).json(updateProperty);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

propertyController.delete("/:id", verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property.currentOwner !== req.user.id) {
      throw new Error("Your are not allowed to delete toher people properties");
    } else {
      await property.delete();

      return res.status(200).json({ msg: "Successfully deleted property" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = propertyController;
