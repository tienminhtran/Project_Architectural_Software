import { useQuery , useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllCategories_Paging, createCategory, deleteCategory, updateCategory,getAll_NoPaging} from "../services/categoryService";
import usePaginationQuery from "./usePaginationQuery";

const useCategorie = (pageNo, pageSize) => {
    const queryClient = useQueryClient();

    const getCategories_NoPaging = useQuery({
        queryKey: ["getAllCategories"],
        queryFn: () => getAll_NoPaging(),
    });

    const create = useMutation({
        mutationFn: (formData) => createCategory(formData),
        onSuccess: () => {
            alert("Create category successfully!!");
        },
        onError: (error) => {
            console.error("Create category failed:", error);
            alert("Create category fail. Please try again!");
        },
    });

    const update = useMutation({
        mutationFn: (formData) => updateCategory(formData),
        onSuccess: () => {
            queryClient.invalidateQueries("getAllCategories_Paging");

            alert("Update category successfully!!");
        },
        onError: (error) => {
            console.error("Update category failed:", error);
            alert("Update category fail. Please try again!");
        },
    });

    const deleteCate = useMutation({
        mutationFn: (id) => deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries("getAllCategories_Paging");

            alert("Delete category successfully!!");
        },
        onError: (error) => {
            console.error("Delete category failed:", error);
            alert("Delete category fail. Please try again!");
        },
    });

  


    return {
        categories_paging: usePaginationQuery("getAllCategories_Paging", getAllCategories_Paging, pageNo, pageSize),
        createCategory: create.mutate,
        updateCategory: update.mutate,
        deleteCategory: deleteCate.mutate,
        getCategories_NoPaging: getCategories_NoPaging.data?.response || [],
    };
};

export default useCategorie;
