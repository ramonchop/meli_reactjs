import { useLoaderData } from "react-router-dom";
import axios from "axios";
import BreadCrumb from "../core/Breadcrumb";
import Detail from "./Detail";

export async function loader({ params }) {

    const productId = params.id

    const itemsResponse = await axios.get(`http://localhost:8181/api/items/${productId}`);
    if (itemsResponse.status !== 200) {
        throw new Error("Error");
    }
    const result = itemsResponse.data;

    return result;


}


function ProductDetailPage() {
    const searchResultData = useLoaderData();
    const pathFromRoot = searchResultData.path_from_root;
    const item = searchResultData.item;
    return (
        <div>
            <BreadCrumb pathFromRoot={pathFromRoot} />
            <Detail item={item} />
        </div>
    );
}

export default ProductDetailPage;