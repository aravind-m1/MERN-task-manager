import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";

const useFetch = () => {
  const [state, setState] = useState({
    loading: false,
    data: null,
    successMsg: "",
    errorMsg: "",
  });

  const fetchData = useCallback(async (config, options = {}) => {
    const { showSuccessToast = true, showErrorToast = true } = options;

    setState(prev => ({ ...prev, loading: true }));

    try {
      const { data } = await api.request(config);

      setState({
        loading: false,
        data,
        successMsg: data.msg || "Success",
        errorMsg: ""
      });

      if (showSuccessToast) toast.success(data.msg || "Success");
      return Promise.resolve(data);
    } catch (error) {
      const msg = error.response?.data?.msg || error.message || "Something went wrong";

      setState({
        loading: false,
        data: null,
        errorMsg: msg,
        successMsg: ""
      });

      if (showErrorToast) toast.error(msg);
      return Promise.reject();
    }
  }, []);

  return [fetchData, state];
};

export default useFetch;
