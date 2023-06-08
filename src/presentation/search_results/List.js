import { NavLink } from "react-router-dom";
import SearchResultItem from "./Item";
import './List.sass';

const List = ({ listItems = [] }) => {
    return (
        <div className="search-result-list-container">
            {listItems.items.map((item, index) => (
                <NavLink to={`${item.id}`} key={index}>
                    <SearchResultItem item={item} key={index} />
                </NavLink>
            ))}
        </div>

    );

}

export default List;