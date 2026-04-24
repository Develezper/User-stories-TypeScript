"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";

import {
  deleteProperty,
  getProperties,
  postProperty,
  updateProperty,
} from "@/services/properties";
import type { Property, PropertyPayload } from "@/types/property";

import styles from "./page.module.css";

type FormState = {
  name: string;
  value: string;
  img: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  value: "",
  img: "",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PropertiesDashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalValue = useMemo(
    () => properties.reduce((sum, property) => sum + property.value, 0),
    [properties]
  );

  async function fetchProperties() {
    const data = await getProperties();
    setProperties(data);
    setError(null);
  }

  async function loadProperties() {
    try {
      setIsLoading(true);
      setFeedback(null);
      await fetchProperties();
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "No se pudieron cargar las propiedades.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const initializeProperties = async () => {
      try {
        await fetchProperties();
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "No se pudieron cargar las propiedades.");
      } finally {
        setIsLoading(false);
      }
    };

    void initializeProperties();
  }, []);

  function resetForm() {
    setForm(INITIAL_FORM);
    setEditingId(null);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    setError(null);

    const payload: PropertyPayload = {
      name: form.name.trim(),
      value: Number(form.value),
      img: form.img.trim(),
    };

    if (!payload.name || !Number.isFinite(payload.value) || payload.value < 0) {
      setError("Completa un nombre y un valor numérico válido.");
      return;
    }

    try {
      setIsSaving(true);

      if (editingId) {
        const updated = await updateProperty(editingId, payload);
        setProperties((current) =>
          current.map((property) => (property._id === editingId ? updated : property))
        );
        setFeedback("Propiedad actualizada correctamente.");
      } else {
        const created = await postProperty(payload);
        setProperties((current) => [created, ...current]);
        setFeedback("Propiedad creada correctamente.");
      }

      resetForm();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "No se pudo guardar la propiedad.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleEdit(property: Property) {
    setEditingId(property._id);
    setForm({
      name: property.name,
      value: String(property.value),
      img: property.img,
    });
    setFeedback(null);
    setError(null);
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("¿Seguro que quieres eliminar esta propiedad?");

    if (!confirmed) {
      return;
    }

    try {
      setFeedback(null);
      setError(null);
      await deleteProperty(id);
      setProperties((current) => current.filter((property) => property._id !== id));

      if (editingId === id) {
        resetForm();
      }

      setFeedback("Propiedad eliminada correctamente.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "No se pudo eliminar la propiedad.");
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.headerIntro}>
            <p className={styles.eyebrow}>Panel</p>
            <h1 className={styles.title}>Propiedades</h1>
            <p className={styles.description}>
              Un espacio simple para registrar inmuebles y mantener el inventario al día.
            </p>
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Registros</span>
              <strong className={styles.summaryValue}>{properties.length}</strong>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Valor total</span>
              <strong className={styles.summaryValue}>{formatCurrency(totalValue)}</strong>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Modo</span>
              <strong className={styles.summaryValue}>{editingId ? "Edición" : "Creación"}</strong>
            </div>
          </div>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.toolbarActions}>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() => void loadProperties()}
              disabled={isLoading || isSaving}
            >
              {isLoading ? "Cargando..." : "Actualizar"}
            </button>

            {editingId ? (
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={resetForm}
                disabled={isSaving}
              >
                Cancelar edición
              </button>
            ) : null}
          </div>

          {feedback ? <p className={styles.message}>{feedback}</p> : null}
          {error ? <p className={styles.error}>{error}</p> : null}
        </div>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionLabel}>{editingId ? "Editar" : "Crear"}</p>
              <h2 className={styles.sectionTitle}>
                {editingId ? "Actualizar propiedad" : "Nueva propiedad"}
              </h2>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  className={styles.input}
                  placeholder="Casa campestre"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="value">
                  Valor
                </label>
                <input
                  id="value"
                  name="value"
                  className={styles.input}
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="450000000"
                  value={form.value}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="img">
                  URL de imagen
                </label>
                <input
                  id="img"
                  name="img"
                  className={styles.input}
                  placeholder="https://..."
                  value={form.img}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.primaryButton} type="submit" disabled={isSaving}>
                {isSaving
                  ? "Guardando..."
                  : editingId
                    ? "Guardar cambios"
                    : "Crear propiedad"}
              </button>
            </div>
          </form>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionLabel}>Listado</p>
              <h2 className={styles.sectionTitle}>Inventario actual</h2>
            </div>
          </div>

          <div className={styles.tableHeader}>
            <span>Nombre</span>
            <span>Valor</span>
            <span>Estado</span>
            <span>Acciones</span>
          </div>

          <div className={styles.list}>
            {isLoading ? <p className={styles.state}>Cargando propiedades...</p> : null}

            {!isLoading && properties.length === 0 && !error ? (
              <p className={styles.state}>
                Aún no hay propiedades registradas. Crea la primera desde el formulario.
              </p>
            ) : null}

            {!isLoading
              ? properties.map((property) => (
                  <article key={property._id} className={styles.row}>
                    <div className={styles.nameBlock}>
                      <strong className={styles.rowTitle}>{property.name}</strong>
                      <span className={styles.rowId}>ID {property._id.slice(0, 8)}</span>
                    </div>

                    <strong className={styles.rowValue}>{formatCurrency(property.value)}</strong>

                    <span className={styles.rowStatus}>
                      {editingId === property._id ? "En edición" : property.img ? "Con imagen" : "Sin imagen"}
                    </span>

                    <div className={styles.rowActions}>
                      <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={() => handleEdit(property)}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className={styles.dangerButton}
                        onClick={() => void handleDelete(property._id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </article>
                ))
              : null}
          </div>
        </section>
      </div>
    </main>
  );
}