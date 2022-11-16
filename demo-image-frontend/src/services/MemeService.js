import httpClient from "../utils/httpClient";

export const listAll = async () => {
  const data = await httpClient.get("memes").then((v) => v.data);
  return data;
};

export const create = async (meme, file) => {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("meme", JSON.stringify(meme));

  const data = await httpClient.post("memes", formData).then((v) => v.data);
  return data;
};

export const remove = async (id) => {
  const data = await httpClient.delete(`memes/${id}`).then((v) => v.data);
  return data;
};
