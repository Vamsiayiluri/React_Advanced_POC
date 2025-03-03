import axiosFirebase from "../api/axiosFirebase";
interface UserData {
    name: string;
    age: number;
    email: string;
  }
export const fetchData = async (path: string): Promise<UserData | null> => {
  try {
    const response = await axiosFirebase.get<UserData>(`${path}.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const writeData = async (path: string, data: UserData): Promise<void> => {
  try {
    await axiosFirebase.put(`${path}.json`, data);
  } catch (error) {
    console.error("Error writing data:", error);
  }
};

export const updateData = async (path: string, data: Partial<UserData>): Promise<void> => {
  try {
    await axiosFirebase.patch(`${path}.json`, data);
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

export const deleteData = async (path: string): Promise<void> => {
  try {
    await axiosFirebase.delete(`${path}.json`);
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};
