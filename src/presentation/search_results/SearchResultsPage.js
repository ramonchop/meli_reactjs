import { useLoaderData } from "react-router-dom";
import axios from "axios";
import SearchResultList from "./List";
import "./SearchResultsPage.sass";
import BreadCrumb from "../core/Breadcrumb";

export async function loader({ request }) {
    const url = new URL(request.url);

    const search = url.searchParams.get("search");
    const itemsResponse = await axios.get(`http://localhost:8181/api/items?q=${search}`);
    if (itemsResponse.status !== 200) {
        throw new Error("Error");
    }
    const result = itemsResponse.data;

    return result;

}


function SearchResultsPage() {
    const searchResultData = useLoaderData();
    const pathFromRoot = searchResultData.path_from_root;
    return (
        <div>
            <BreadCrumb pathFromRoot={pathFromRoot} />
            <SearchResultList listItems={searchResultData} />
        </div>
    );
}

export default SearchResultsPage;