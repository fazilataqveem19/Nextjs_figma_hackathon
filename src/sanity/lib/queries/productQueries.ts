// Export the query so it can be used elsewhere
export const query = `*[_type == "product"]{
  _id,
  productName,
  category,
  price,
  inventory,
  colors,
  status,
  description,
  "imageUrl": image.asset->url
}`;
