import { useQuery } from "@tanstack/react-query";
import { getBrandAll} from "../services/brandService";

const useBrandData = () => {
  const brandAll = useQuery({
    queryKey: ["brandAll"],
    queryFn: getBrandAll,
  });
    return {
        brandAll,
    };
}


export default useBrandData;