import { useLoaderData } from "react-router-dom";
import axios from "axios";
import SearchResultList from "./List";
import "./SearchResultsPage.sass";
import BreadCrumb from "../core/Breadcrumb";

export async function loader({ request }) {
    const url = new URL(request.url);

    const search = url.searchParams.get("search");
    const itemsResponse = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${search}&limit=4`);

    if (itemsResponse.status !== 200) {
        throw new Error("Error");
    }
    const itemsData = itemsResponse.data
    let categoriesList = [];
    let pathFromRoot = [];
    if (itemsData.filters !== undefined && itemsData.filters.length > 0){
        categoriesList = itemsData.filters.find((filter) => filter.id === "category").values;
        pathFromRoot = categoriesList[0].path_from_root;
    } else if (itemsData.available_filters !== undefined && itemsData.available_filters.length > 0) {
        categoriesList = itemsData.available_filters.find((filter) => filter.id === "category").values;
        const currentCategory = categoriesList.reduce((prev, current) => (prev.results > current.results) ? prev : current).id;
        const categoryPathResponse = await axios.get(`https://api.mercadolibre.com/categories/${currentCategory}`);
        if (categoryPathResponse.status !== 200) {
            throw new Error("Error");
        }
        const categoryPathData = categoryPathResponse.data
        pathFromRoot = categoryPathData.path_from_root;
    
    }
    const categories = categoriesList.map((category) => { return category.id });

    const result = {
        "author": {
            "name": "Ramon",
            "lastname": "Estay",
        },
        path_from_root: pathFromRoot,
        categories: categories.map((category) => { return category.name }), 
        items: await Promise.all(itemsData.results.map(async (item) => {
            const currencyId = item.currency_id;
            const address = item.seller_address;
            const countryId = address.country.id;

            const currencyResponse = await axios.get(`https://api.mercadolibre.com/currencies/${currencyId}`);

            if (currencyResponse.status !== 200) {
                throw new Error("Error");
            }

            const localeResponse = await axios.get(`https://api.mercadolibre.com/countries/${countryId}`);

            if (localeResponse.status !== 200) {
                throw new Error("Error");
            }

            const currencyData = currencyResponse.data
            const localeData = localeResponse.data
            const locale = localeData.locale.replace("_", "-");

            const price = {
                "currency": currencyId,
                "amount": item.price,
                "decimals": currencyData.decimal_places,
            }

            const state = address.state.name;

            return {
                id: item.id,
                title: item.title,
                price: price,
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
                locale: locale,
                state: state,
            }
        })),
    }


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