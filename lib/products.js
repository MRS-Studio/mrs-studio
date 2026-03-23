'use server';

import { connectToDatabase } from "./mongodb";
import { ObjectId } from "mongodb";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PRODUCTS_COLLECTION = "products";
const PAGE_SIZE = 20;

// Fetch all products
export async function fetchProducts(page = 1, pageSize = PAGE_SIZE) {
  try {
    const { db } = await connectToDatabase();
    const skip = (page - 1) * pageSize;

    return await db
      .collection(PRODUCTS_COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Fetch products by category
export async function fetchProductsByCategory(category, page = 1) {
  try {
    const { db } = await connectToDatabase();
    const skip = (page - 1) * PAGE_SIZE;

    return await db
      .collection(PRODUCTS_COLLECTION)
      .find({ category })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)
      .toArray();
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

// ✅ Search products by title
export async function searchProducts(query, page = 1) {
  try {
    const { db } = await connectToDatabase();
    const skip = (page - 1) * PAGE_SIZE;

    return await db
      .collection(PRODUCTS_COLLECTION)
      .find({ title: { $regex: query, $options: "i" } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)
      .toArray();
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

// Upload file to Cloudinary
async function uploadFileToCloudinary(file) {
  try {
    if (!file) return "";

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );
      stream.end(buffer);
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}

// Add product
export async function addProduct(data) {
  try {
    const { title, description, category, price, affiliateLink, file } = data;

    if (!title || !file) throw new Error("Title and file are required");

    const imageURL = await uploadFileToCloudinary(file);

    const productData = {
      title,
      description,
      category,
      price,
      affiliateLink,
      imageURL,
      clicks: 0,
      createdAt: new Date(),
    };

    const { db } = await connectToDatabase();
    const result = await db
      .collection(PRODUCTS_COLLECTION)
      .insertOne(productData);

    return result.insertedId;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

// Update product
export async function updateProduct(id, data) {
  try {
    const { title, description, category, price, affiliateLink, file } = data;

    const updateData = { title, description, category, price, affiliateLink };

    if (file && file.name) {
      const imageURL = await uploadFileToCloudinary(file);
      updateData.imageURL = imageURL;
    }

    const { db } = await connectToDatabase();

    await db.collection(PRODUCTS_COLLECTION).updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return true;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Delete product
export async function deleteProduct(id) {
  try {
    const { db } = await connectToDatabase();

    await db
      .collection(PRODUCTS_COLLECTION)
      .deleteOne({ _id: new ObjectId(id) });

    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// Track clicks
export async function trackClick(id) {
  try {
    const { db } = await connectToDatabase();

    await db.collection(PRODUCTS_COLLECTION).updateOne(
      { _id: new ObjectId(id) },
      { $inc: { clicks: 1 } }
    );
  } catch (error) {
    console.error("Error tracking click:", error);
  }
}