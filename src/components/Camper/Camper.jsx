import FavoriteCamper from '../FavoritesCampers/FavoriteCamper.jsx'
import LinkButton from '../LinkButton/LinkButton'

import icons from '../../assets/icons.svg'
import css from './Camper.module.css'

function Camper({data}) {
    var imgSRC = 'no-image.png'
    if (data.gallery && data.gallery.length > 0)
        imgSRC = data.gallery[0].thumb
    const reviews = data.reviews ? data.reviews.length : 0

    return (
        <li className={css.container}>
            <div className={css.imgContainer} style={{backgroundImage: `url(${imgSRC})`}}>
            </div>
            <ul className={css.dataContainer}>
                <li>
                    <div className={css.nameContainer}>
                        <span className={css.name}>{data.name}</span>
                        <div>
                            <span className={css.price}>${data.price}.00</span>
                            <FavoriteCamper camper={data.id}/>
                        </div>
                    </div>
                    <div>
            <span className={css.rating}>
              <svg className={css.rateIcon}><use xlinkHref={`${icons}#icon-star`}/></svg>
                {data.rating}({reviews} Reviews)
            </span>
                        <span className={css.location}>
              <svg width={16} height={16}><use xlinkHref={`${icons}#icon-map`}/></svg>
                            {data.location}
            </span>
                    </div>
                </li>
                <li>
                    <span className={css.description}>{data.description}</span>
                </li>
                <li>
                    components...
                </li>
                <li>
                    <LinkButton to={`/catalog/${data.id}`} newWindow={true}>Show more</LinkButton>
                </li>
            </ul>
        </li>
    )
}

export default Camper