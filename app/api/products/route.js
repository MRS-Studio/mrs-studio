import { addProduct, fetchProducts, fetchProductsByCategory } from "@/lib/products";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const data = {
      title: formData.get("title")?.toString(),
      description: formData.get("description")?.toString(),
      category: formData.get("category")?.toString(),
      price: formData.get("price")?.toString(),
      affiliateLink: formData.get("affiliateLink")?.toString(),
      file: formData.get("file"),
    };

    if (!data.title || !data.file) {
      return new Response(JSON.stringify({ message: "Title and image are required" }), { status: 400 });
    }

    const insertedId = await addProduct(data);
    return new Response(JSON.stringify({ id: insertedId }), { status: 200 });
  } catch (err) {
    console.error("Error adding product:", err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const products = category ? await fetchProductsByCategory(category) : await fetchProducts();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.error("Error fetching products:", err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}