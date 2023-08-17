import React from "react";
import { useParams } from "react-router-dom";
import { Spring, animated } from "react-spring";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getOne } from "../../api/productsAPI";
import { useQuery } from "react-query";
import { PuffLoader } from "react-spinners";
import LinkIcon from "@mui/icons-material/Link";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

function Product() {
    const { id } = useParams();

    const { data, isLoading } = useQuery("getOneCompany", () => getOne(id));

    if (isLoading) {
        return (
            <div className="_container catalog__loading">
                <PuffLoader
                    size={"350px"}
                    cssOverride={{ marginTop: "150px" }}
                />
            </div>
        );
    }

    return (
        <div className="product _container" id="product">
            <div className="product__content">
                <div className="product__imageblock">
                    <Image key={data.data.photo} photoSrc={data.data.photo} />
                </div>
                <div className="product__block">
                    <h1 className="product__title">{data.data.name}</h1>
                    <hr className="product__line" />
                    <p className="product__description">
                        {data.data.description}
                    </p>
                    <p className="product__description2">
                        <LinkIcon />
                        <a href={data.data.website} target="_blank">
                            {data.data.website}
                        </a>
                    </p>
                    <p className="product__description2">
                        <AlternateEmailIcon />
                        {data.data.email}
                    </p>
                    <p className="product__description2">
                        <LocalPhoneIcon />
                        {data.data.phonenum}
                    </p>
                    <ul className="list mt3 product__cities">
                        {data.data.city.map((elem) => {
                            return (
                                <li className="f4 lh-copy" key={elem.name}>
                                    <LocationOnIcon />
                                    {elem.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <h1 className="tc">Послуги компанії</h1>
            <ul className="products__list">
                {data.data.service.map((elem) => {
                    return (
                        <li className="product__elem" key={elem.name}>
                            <p className="product__name">{elem.name}</p>
                            <p className="product__desc">{elem.description}</p>
                            <p className="product__price">{elem.price} usd</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
function Image(props) {
    const { photoSrc } = props;

    return (
        <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={{ duration: 1500 }}
        >
            {(props) => (
                <animated.div style={props}>
                    <div>
                        <img
                            key={photoSrc}
                            src={photoSrc}
                            alt=""
                            className="product__image"
                            draggable="false"
                        />
                    </div>
                </animated.div>
            )}
        </Spring>
    );
}

export default Product;
