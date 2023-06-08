import { useLoaderData } from "react-router-dom";
import axios from "axios";
import BreadCrumb from "../core/Breadcrumb";
import Detail from "./Detail";

export async function loader({ params }) {

    const productId = params.id

    const productUrl = `https://api.mercadolibre.com/items/${productId}`;
    const descriptionUrl = `${productUrl}/description`;

    const itemsResponse = await axios.get(productUrl);

    if (itemsResponse.status !== 200) {
        throw new Error("Error");
    }

    const descriptionResponse = await axios.get(descriptionUrl);

    if (descriptionResponse.status !== 200) {
        throw new Error("Error");
    }


    const itemsData = itemsResponse.data
    const descriptionData = descriptionResponse.data

    const description = descriptionData.plain_text;

    const currencyId = itemsData.currency_id;
    const address = itemsData.seller_address;
    const countryId = address.country.id;
    const categoryId = itemsData.category_id;

    const currencyResponse = await axios.get(`https://api.mercadolibre.com/currencies/${currencyId}`);

    if (currencyResponse.status !== 200) {
        throw new Error("Error");
    }

    const localeResponse = await axios.get(`https://api.mercadolibre.com/countries/${countryId}`);

    if (localeResponse.status !== 200) {
        throw new Error("Error");
    }


    const categoryResponse = await axios.get(`https://api.mercadolibre.com/categories/${categoryId}`);

    if (categoryResponse.status !== 200) {
        throw new Error("Error");
    }


    let picture = itemsData.secure_thumbnail;

    if (itemsData.pictures !== undefined && itemsData.pictures.length > 0){
        picture = itemsData.pictures[0].secure_url ?? picture;
    }
    const currencyData = currencyResponse.data
    const localeData = localeResponse.data
    const locale = localeData.locale.replace("_", "-");
    const categoryData = categoryResponse.data

    const price = {
        "currency": currencyId,
        "amount": itemsData.price,
        "decimals": currencyData.decimal_places,
    }
    
    const pathFromRoot = categoryData.path_from_root;

    

    const id = itemsData.id
    const title = itemsData.title
    const soldQuantity = itemsData.sold_quantity
    const condition = itemsData.condition
    const freeShipping = itemsData.shipping.free_shipping

    const result = {
        author: {
            name: "Ramon",
            lastname: "Estay",
        },
        item: {
            id: id,
            title: title,
            price: price,
            picture: picture,
            condition: condition,
            free_shipping: freeShipping,
            sold_quantity: soldQuantity,
            locale: locale,
            description: description
        },
        path_from_root: pathFromRoot,
    }


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