import axios from "axios";

export async function getPaginated(
  model_name: "user" | "address" | "cart" | "product",
  page?: number,
  limit?: number,
  api = "http://localhost:3331"
): Promise<any> {
  if (page !== undefined && limit !== undefined) {
    return (await axios.get(`${api}/${model_name}?page=${page}&limit=${limit}`))
      .data;
  }
  return (await axios.get(`${api}/${model_name}`)).data;
}
