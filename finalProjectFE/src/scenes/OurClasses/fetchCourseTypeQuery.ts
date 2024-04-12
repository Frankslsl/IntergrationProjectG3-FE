import axios from "axios";

const fetchCourseTypeQuery = async (): Promise<any> => {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/courseType/courseTypes",
    );
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchCourseTypeQuery;
