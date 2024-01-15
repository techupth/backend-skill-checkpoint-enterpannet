import { Router } from "express";
import { ObjectId } from "mongodb";
import { getCollection } from "../utils/db.js";
import { restrictAccess } from "../utils/middleware.js";
const topicsRouter = Router();
topicsRouter.get("/", async (req, res) => {
  try {
    const filter = {};
    const collection = getCollection("topics");
    const result = await collection.find(filter).limit(10).toArray();
    return res.status(200).json({
      message: "Record Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid Requset",
    });
  }
});
topicsRouter.get("/:id", async (req, res) => {
  try {
    const getId = new ObjectId(req.params.id);
    const collection = getCollection("topics");
    const result = await collection.findOne({ _id: getId });
    return res.status(201).json({
      data: result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Can not find data from Database. ${error}` });
  }
});
topicsRouter.post("/", async (req, res) => {
  const { name, description, category } = req.body;
  if (!name ?? !description ?? !category) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const collection = getCollection("topics");
    const dataTopics = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      createdTime: new Date(),
    };
    const result = await collection.insertOne(dataTopics);
    return res.status(201).json({
      message: `Inserted document with ID: ${result.insertedId}`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Can not create data into Database. ${error}` });
  }
});
topicsRouter.put("/:id", async (req, res) => {
  try {
    const collection = getCollection("topics");
    const iD = { _id: new ObjectId(req.params.id) };
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      updated_at: new Date(),
    };
    const upsertTrue = { $set: updateData };
    await collection.updateOne(iD, upsertTrue);
    return res.status(200).json({
      message: `Products ID ${iD._id} has been updated.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Can not updated data into Database. ${error}`,
    });
  }
});
topicsRouter.delete("/:id", async (req, res) => {
  const iD = { _id: new ObjectId(req.params.id) };
  if (!iD) {
    return res.status(403).json({
      message: "Please specified id in order to delete",
    });
  }
  try {
    const collection = getCollection("topics");
    const result = await collection.deleteOne(iD);
  } catch (error) {
    return res.status(200).json({
      message: `Can not delete data into Database. ${error}`,
    });
  }
  return res.status(500).json({
    message: `Products ID ${iD._id} has been deleted.`,
  });
});
export default topicsRouter;
