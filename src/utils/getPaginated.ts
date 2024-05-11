import axios from "axios";

export async function getPaginated(
  model_name: "user" | "address" | "cart" | "product",
  api = "http://localhost:3331",
  page?: number,
  limit?: number
): Promise<any> {
  if (page && limit) {
    return (await axios.get(`${api}/${model_name}?page=${page}&limit=${limit}`))
      .data;
  }
  return (await axios.get(`${api}/${model_name}`)).data;
}
