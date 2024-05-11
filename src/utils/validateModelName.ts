export function validateModelName(
  model_name?: string
): "user" | "address" | "cart" | "product" {
  if (!model_name) {
    throw new Error("Model name is required");
  }
  if (!["user", "address", "cart", "product"].includes(model_name)) {
    throw new Error("Invalid model name");
  }
  return model_name as "user" | "address" | "cart" | "product";
}
