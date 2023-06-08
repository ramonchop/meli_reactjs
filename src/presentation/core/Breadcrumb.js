import './Breadcrumb.sass'

function BreadCrumb({ pathFromRoot }) {
    return (
        <div className="bread-crumb-container">
            {pathFromRoot.map((value, index)=>{
                const prefix = index === 0 ? '' : '>';
                const name = `${value.name}`;
                const title = `${prefix} ${name}`;
                return (
                    <span key={value.id} className="bread-crumb-item">{title}&nbsp;</span>
                )
            })}
        </div>
    );
}

export default BreadCrumb;