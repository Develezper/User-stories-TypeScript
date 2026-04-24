import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.eyebrow}>M5.4S4</div>

        <section className={styles.intro}>
          <h1>CRUD de propiedades con Next.js, MongoDB y Mongoose.</h1>
          <p>
            Este proyecto expone rutas API para propiedades y un panel para crear,
            editar, listar y eliminar inmuebles respaldados por MongoDB.
          </p>
        </section>

        <div className={styles.ctas}>
          <Link className={styles.primary} href="/dashboard/properties">
            Abrir panel
          </Link>
          <Link className={styles.secondary} href="/api/properties">
            Abrir API
          </Link>
        </div>

        <section className={styles.grid}>
          <article className={styles.card}>
            <span className={styles.cardLabel}>Panel</span>
            <p>Gestiona el catálogo de propiedades desde una sola interfaz minimalista.</p>
          </article>

          <article className={styles.card}>
            <span className={styles.cardLabel}>Servicios</span>
            <p>Las funciones con Axios consumen la API desde el cliente en una capa limpia.</p>
          </article>

          <article className={styles.card}>
            <span className={styles.cardLabel}>Base de datos</span>
            <p>Los scripts locales de MongoDB y el seed reproducible facilitan ejecutar el proyecto.</p>
          </article>
        </section>
      </main>
    </div>
  );
}
