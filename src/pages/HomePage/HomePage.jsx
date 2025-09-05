import LinkButton from '../../components/LinkButton/LinkButton'
import hero from '../../assets/hero.png'
import css from './HomePage.module.css'

function HomePage() {
    return (
        <div className={`container ${css.container}`} style={{backgroundImage: `url(${hero})`}}>
            <div className={css.homePage}>
                <h1>Campers of your dreams</h1>
                <p>You can find everything you want in our catalog</p>
                <div className={css.button}>
                    <LinkButton to="/catalog" className={css.link}>View Now</LinkButton>
                </div>
            </div>
        </div>
    )
}

export default HomePage