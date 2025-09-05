import css from './CamperDetail.module.css'

function CamperDetail({data}) {
    const reviews = data.reviews ? data.reviews.length : 0

    return (
        <div>
            <ul>
                <li>
                    <h2>{data.name}</h2>
                </li>
                <li>
                    <span className={css.rating}>{data.rating}({reviews} Reviews)</span>
                    <span className={css.location}>{data.location}</span>
                </li>
                <li>
                    <span className={css.price}>{data.price}</span>
                </li>
                <li>
                    <div className={css.imgContainer}>
                        {data.gallery && data.gallery.map((imgData) => {
                            return (<>
                                <img className={css.image} src={imgData.original} alt={data.name}/>
                            </>)
                        })}
                    </div>
                </li>
                <li>
                    <span className={css.description}>{data.description}</span>
                </li>
                <li>
                    <span>Features</span> <span>Reviews</span>
                </li>
            </ul>
        </div>
    )
}

export default CamperDetail
