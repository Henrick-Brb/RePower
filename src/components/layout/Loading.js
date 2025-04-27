import styles from './Loading.module.css'

function Loading() {
    return (
        <div className={styles.loader_container}>
            <span className={styles.loader}></span>
        </div>
    )
}

export default Loading;