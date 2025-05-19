import React, {useEffect, useState} from "react";
import FooterUser from "../../../../components/layout/Footer"; // Adjust the path as necessary

import { useLocation } from "react-router-dom";
import useProduct from "../../../../hooks/useProduct";
import SearchPage from "./SearchPage";
import HeaderUser from "../../../../components/layout/HeaderUser";
import Loading from "../../../../components/common/Loading";
import Brand from "../../../../components/layout/Brand";

const useQuery = () => new URLSearchParams(useLocation().search)

const HomeSearch = () => {
    const location = useLocation();
    const query = useQuery(location.search).get("query");

    const { isLoading } = location.state || { isLoading: true, products: [] }; 

    return (
        <div>
            <HeaderUser showCategory={false} showBanner={false} currentTab={"Home"} />
            {isLoading ? (
                <Loading isLoading={isLoading} />
            ) : (
                <>
                    <SearchPage query={query} />
                    <Brand />
                </>
            )}
            <FooterUser />
        </div>
    );
};

export default HomeSearch;
