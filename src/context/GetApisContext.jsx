import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import ResponsivePagination from "react-responsive-pagination";
export const GetApisContext = createContext(null);

export default function GetApisContextProvider(props) {
  const { baseUrl, requestHeaders } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  // get categories  data from server
  const getUsers = async (values, pageSize) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/Users/?groups=${values.groupId}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: requestHeaders,
          params: {
            userName: values.userName,
            email: values.email,
          },
        }
      );

      setUsers(response.data.data);
      setTotalPages(response.data.totalNumberOfPages);
      // console.log(res);
      // console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getUsers({}, 20);
  }, []);

  const Pagination = () => {
    return (
      <ResponsivePagination
        current={pageNumber}
        total={totalPages}
        onPageChange={setPageNumber}
      />
    );
  };

  return (
    <GetApisContext.Provider
      value={{
        users,
        getUsers,
        totalPages,
        isLoading,
        totalPages,
        pageNumber,
        Pagination,
      }}
    >
      {props.children}
    </GetApisContext.Provider>
  );
}
