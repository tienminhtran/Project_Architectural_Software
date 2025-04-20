import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getBrandAll,
    getAllBrand_Paging,
    deleteBrand,
    createBrand,
    updateBrand,
    searchBrand,
} from "../services/brandService";
import usePaginationQuery from "./usePaginationQuery";

const useBrandData = (pageNo, pageSize, brandSearch) => {
    const queryClient = useQueryClient();

    // get all brand
    const brandAll = useQuery({
        queryKey: ["brandAll"],
        queryFn: () => getBrandAll(),
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            console.log("Brand data fetched successfully:", data);
        },
        onError: (error) => {
            console.error("Error fetching brand data:", error);
        },
    });

    // create brand
    const createBra = useMutation({
        mutationFn: ({ formData }) => createBrand(formData),
        onSuccess: () => {
            queryClient.invalidateQueries("getAllBrand_Paging");
            alert("Create brand successfully!!");
        },
        onError: (error) => {
            console.error("Create brand failed:", error);
            alert("Create brand fail. Please try again!");
        },
    });

    // update brand
    const update = useMutation({
        mutationFn: ({ formData, id }) => updateBrand(formData, id),
        onSuccess: () => {
            queryClient.invalidateQueries("getAllBrand_Paging");
            alert("Update brand successfully!!");
        },
        onError: (error) => {
            console.error("Update brand failed:", error);
            alert("Update brand fail. Please try again!");
        },
    });

    // delete brand
    const deleteBra = useMutation({
        mutationFn: (id) => deleteBrand(id),
        onSuccess: () => {
            queryClient.invalidateQueries("getAllBrand_Paging");
            alert("Delete brand successfully!!");
        },
        onError: (error) => {
            console.error("Delete brand failed:", error);
            alert("Delete brand fail. Please try again!");
        },
    });

    return {
        brandAll,
        brands_paging: usePaginationQuery(
            "getAllBrand_Paging",
            getAllBrand_Paging,
            pageNo,
            pageSize
        ),
        deleteBrand: deleteBra.mutate,
        createBrand: createBra.mutate,
        updateBrand: update.mutate,
        search_paging: usePaginationQuery(
            "searchBrand",
            searchBrand,
            pageNo,
            pageSize,
            brandSearch,
            true
        ),
    };
};

export default useBrandData;
