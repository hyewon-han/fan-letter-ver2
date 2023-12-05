import jsonApi from "../axios/jsonApi";

export const addLetter = (newLetter) => jsonApi.post("/letters", newLetter);

export const deleteLetter = (id) => jsonApi.delete(`/letters/${id}`);

export const editLetter = ({ id, textarea }) =>
  jsonApi.patch(`/letters/${id}`, {
    content: textarea,
  });
