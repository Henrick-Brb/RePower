import {FaInstagram, FaWhatsapp, FaLinkedin} from 'react-icons/fa'

import styles from './Footer.module.css'

function Footer(){
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li><a href='https://www.instagram.com/henrick_borba/' target='blank'><FaInstagram/></a></li>
                <li><a href='https://wa.me/5561986517657?text=Gostei%20do%20seu%20Projeto%20e%20tive%20uma%20ideia%20para%20ele' target='blank'><FaWhatsapp/></a></li>
                <li><a href='https://www.linkedin.com/in/henrick-brb/' target='blank'><FaLinkedin/></a></li>
            </ul>
            <p className={styles.copy_right}>
                <span>RePower</span> &copy; 2025 | by Henrick
            </p>
        </footer>
    )
}

export default Footer;
