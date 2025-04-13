import { useMutation } from "@tanstack/react-query";
import { createCode } from "../services/codeService";

const useCode = () => {
  const create = useMutation({
    mutationFn: (formData) => createCode(formData),
    onSuccess: () => {
      alert("Create CODE successfully!!");
    },
    onError: (error) => {
      console.error("Create CODE failed:", error);
      alert("Create CODE fail. Please try again!");
    },
  });

  return {
    createCode: create.mutate,
  };
};

export default useCode;
