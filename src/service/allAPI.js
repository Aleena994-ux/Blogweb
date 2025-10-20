import commonAPI from "./commonAPI";
import BASEURL from "./serverURL";

// Add blog - POST
export const addBlogAPI = async (reqBody) => {
  return await commonAPI("POST", `${BASEURL}/blogs`, reqBody);
};

// Get single blog - GET
export const getABlogAPI = async (id) => {
  return await commonAPI("GET", `${BASEURL}/blogs/${id}`, {});
};

// Update blog - PUT
export const updateBlogAPI = async (id, reqBody) => {
  return await commonAPI("PUT", `${BASEURL}/blogs/${id}`, reqBody);
};

// Get all blogs - GET
export const getAllBlogsAPI = async () => {
  return await commonAPI("GET", `${BASEURL}/blogs`);
};

// Delete blog - DELETE
export const deleteBlogAPI = async (id) => {
  return await commonAPI("DELETE", `${BASEURL}/blogs/${id}`);
};
