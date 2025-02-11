import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";

const axiosFirebase: AxiosInstance = axios.create({
    baseURL: "https://vuefire2-cc79f-default-rtdb.firebaseio.com/", 
  });
  axiosFirebase.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
        request.headers.channelName="Vamsi Ayiluri"

        console.log("Request Config:", request); 
        return request;
    },
    (error: AxiosError) => Promise.reject(error)
  );
    axiosFirebase.interceptors.response.use(
        (response: AxiosResponse) => {
            console.log("Response Data:", response.data); 
            return response;
        }, 
        async (error: AxiosError): Promise<AxiosResponse | void> => {
            console.error("Response Error:", error);
            return Promise.reject(error);
        }
    );

export default axiosFirebase;
