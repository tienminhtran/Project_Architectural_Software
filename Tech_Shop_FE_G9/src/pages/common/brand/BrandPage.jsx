import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPencil, BsTrash, BsSearch, BsEye } from "react-icons/bs";
import useBrandData from "../../../hooks/useBrandData";
import { useDebounce } from "../../../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import BrandModal from "./BrandModal";

const BrandPage = () => {
    const navigate = useNavigate();

    const [selectedRows, setSelectedRows] = useState([]);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;

    const { brands_paging, search_paging, deleteBrand } = useBrandData(
        currentPage,
        pageSize,
        debouncedSearch
    );

    const { data, isLoading, isError, error } =
        debouncedSearch.trim().length > 0 ? search_paging : brands_paging;

    const brandList = useMemo(() => data?.values || [], [data]);

    const [brands, setBrands] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    useEffect(() => {
        if (Array.isArray(brandList)) setBrands(brandList);
    }, [brandList]);

    const handlePageChange = (selected) => {
        setCurrentPage(selected.selected);
    };

    const handleSelectRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedRows.length === brands.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(brands.map((b) => b.id));
        }
    };

    const handleEdit = (brand) => {
        navigate("/common/AddBrandPage", { state: { brand } });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this brand?")) {
            deleteBrand(id);
        }
    };

    const handleView = (brand) => {
        setSelectedBrand(brand);
        setShowModal(true);
    };
    // Xu ly slit file name
    const getFileNameSplit = (fileName) => {
        if (!fileName) return null;
        return fileName.substring(fileName.indexOf("_") + 1);
    };
    if (isLoading) return <p>Loading brand data...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="page-wrapper">
            <div className="page-header d-flex justify-content-between align-items-center ">
                <div className="page-title w-75">
                    <h3>Brand List</h3>
                    <p>View/Search Brands</p>
                </div>
                <Link
                    to="/common/AddBrandPage"
                    className="btn btn-warning text-white fw-bold rounded px-4 py-2 text-decoration-none w-25"
                >
                    Add Brand
                </Link>
            </div>

            <div className="input-group w-25 mb-3">
                <span className="input-group-text">
                    <BsSearch />
                </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search brand..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <table className="table table-hover table-responsive">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectedRows.length === brands.length}
                                onChange={handleSelectAll}
                                className="form-check-input"
                            />
                        </th>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Active</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.length > 0 ? (
                        brands.map((brand) => (
                            <tr key={brand.id} className="align-middle">
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(
                                            brand.id
                                        )}
                                        onChange={() =>
                                            handleSelectRow(brand.id)
                                        }
                                        className="form-check-input"
                                    />
                                </td>
                                <td>
                                    {/* xử lý https hoặc file toán tử 3 ngoi*/}
                                    {brand.brandImg?.startsWith("http") ? (
                                        <img
                                            src={brand.brandImg}
                                            alt={brand.name}
                                            width="50"
                                            height="50"
                                            className="rounded"
                                        />
                                    ) : (
                                        <img
                                            src={`../../../../public/images/brand/${getFileNameSplit(
                                                brand.brandImg
                                            )}`}
                                            alt={brand.name}
                                            width="50"
                                            height="50"
                                            className="rounded"
                                        />
                                    )}
                                </td>
                                {/* <td>
    <img src='../../../../public/images/product' alt={brand.name} width="50" height="50" className="rounded" />
</td> */}

                                <td>{brand.name}</td>
                                <td>
                                    {brand.active ? "✅ Active" : "❌ Disabled"}
                                </td>
                                <td>
                                    <div className="d-flex gap-3">
                                        <BsEye
                                            className="text-secondary fs-5"
                                            role="button"
                                            onClick={() => handleView(brand)}
                                        />
                                        <BsPencil
                                            className="text-secondary fs-5"
                                            role="button"
                                            onClick={() => handleEdit(brand)}
                                        />
                                        <BsTrash
                                            className="text-danger fs-5"
                                            role="button"
                                            onClick={() =>
                                                handleDelete(brand.id)
                                            }
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="4"
                                className="text-center fw-bold py-3"
                            >
                                <img
                                    src="/images/icon/khong-tim-thay.png"
                                    alt="No brands found"
                                    style={{ width: "20%", height: "auto" }}
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <ReactPaginate
                previousLabel={"←"}
                nextLabel={"→"}
                breakLabel={"..."}
                pageCount={data?.totalPages || 0}
                onPageChange={handlePageChange}
                containerClassName={"pagination d-flex justify-content-end"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />

            {/* Modal xem chi tiết brand */}
            <BrandModal
                show={showModal}
                onHide={() => setShowModal(false)}
                brand={selectedBrand}
            />
        </div>
    );
};

export default BrandPage;
