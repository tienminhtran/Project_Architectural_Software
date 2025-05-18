import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllProduct_Paging, deleteProduct, createProduct, searchProduct, updateProduct, filterProduct} from "../services/productService";
import usePaginationQuery from "./usePaginationQuery";
import { data } from "react-router-dom";
import { useState } from "react";


const useProduct = (pageNo, pageSize, productSearch) => {
    const queryClient = useQueryClient();

    const [products, setProducts] = useState([]);
    
    // create product
    const createPro = useMutation({
        mutationFn: ({formData}) => createProduct(formData),
        onSuccess: () => {
        },
        onError: (error) => {
            console.error("Create product failed:", error);
            alert("Create product fail. Please try again!");
        },
    })

    const update = useMutation({
        mutationFn: ({formData, id}) => updateProduct(formData, id),
        onSuccess: () => {
          // Refetch của product sau khi update thành công.
          // Mà không cần reload
          queryClient.invalidateQueries("getAllProduct_Paging");
    
        },
        onError: (error) => {
          console.error("Update product failed:", error);
          alert("Update product fail. Please try again!");
        },
      });
    
    // // delete product
    const deletePro = useMutation({
        mutationFn: (id) => deleteProduct(id),
        onSuccess: () => {
        queryClient.invalidateQueries("getAllProduct_Paging");
    
        alert("Delete product successfully!!");
        },
        onError: (error) => {
        console.error("Delete product failed:", error);
        alert("Delete product fail. Please try again!");
        },
    })

    const filter = useMutation({
        mutationFn: ({filterRequest}) => filterProduct(filterRequest),
        onSuccess: (data) => {
          
          console.log("Filter products mutation:", data?.response);
          if(Array.isArray(data?.response)) {
            setProducts(data?.response);
          } else {
            setProducts([]);
          }
          console.log("Filter products:", products.length);
        },
        onError: (error) => {
          console.error("Filter products failed:", error);
          alert("Filter products fail. Please try again!");
        },
    })


    return {
        products_paging: usePaginationQuery("getAllProduct_Paging", getAllProduct_Paging, pageNo, pageSize),
        // updateProduct: update.mutate,
        deleteProduct: deletePro.mutate,
        createProduct: createPro.mutateAsync,
        updateProduct: update.mutateAsync,
        search_paging: usePaginationQuery("searchProduct", searchProduct, pageNo, pageSize, productSearch, true),
        filterProduct: filter.mutateAsync,
        filterProductData: products,
    }
}
export default useProduct;
