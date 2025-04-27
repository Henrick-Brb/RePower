import { Link } from 'react-router-dom'

import Container from './Container'

import styles from './Navbar.module.css'
import logo from '../../img/logo-repower.png'

function Navbar(){
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={logo} className={styles.logo} alt="Logo RePower"/>
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/">Inicio</Link></li>
                    <li className={styles.item}><Link to="/projetos">Meus Projetos</Link></li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar;
