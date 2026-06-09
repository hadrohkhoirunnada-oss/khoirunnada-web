"use client";

import { useEffect, useMemo, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import QasidahForm from "@/components/admin/qasidah/QasidahForm";
import QasidahTable from "@/components/admin/qasidah/QasidahTable";
import { initialLyrics } from "@/data/initialLyrics";
import { maulidCollections } from "@/data/maulidCollections";
import {
  getQasidahItems,
  getStaticQasidahSlugs,
} from "@/services/qasidahService";

const staticQasidahItems = [...initialLyrics, ...maulidCollections];

export default function Page() {
  const [databaseItems, setDatabaseItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  const reservedSlugs = useMemo(
    () => getStaticQasidahSlugs(staticQasidahItems),
    []
  );

  const qasidahItems = useMemo(
    () => [
      ...staticQasidahItems.map((item) => ({
        ...item,
        source: "file",
        status: "published",
      })),
      ...databaseItems,
    ],
    [databaseItems]
  );

  const loadDatabaseQasidah = async () => {
    setIsLoading(true);

    try {
      const items = await getQasidahItems();
      setDatabaseItems(items);
    } catch (error) {
      console.error("Gagal memuat qasidah dari database:", error);
      setStatusMessage("Gagal memuat data qasidah dari database.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDatabaseQasidah();
  }, []);

  const handleCreated = async () => {
    setEditingItem(null);
    setStatusMessage("Qasidah berhasil disimpan ke database.");
    await loadDatabaseQasidah();
  };

  const handleUpdated = async () => {
    setEditingItem(null);
    setStatusMessage("Qasidah berhasil diperbarui di database.");
    await loadDatabaseQasidah();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setStatusMessage(`Mode edit aktif untuk "${item.title}".`);

    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setStatusMessage("");
  };

  const handleDeleted = async () => {
    setEditingItem(null);
    setStatusMessage("Qasidah berhasil dihapus dari database.");
    await loadDatabaseQasidah();
  };

  return (
    <AdminShell>
      <section className="space-y-5">
        {statusMessage ? (
          <div className="relative overflow-hidden rounded-2xl border border-emerald-400/14 bg-emerald-400/10 px-4 py-3 shadow-lg shadow-black/20">
            <p className="relative z-10 text-xs font-semibold leading-6 text-emerald-100">
              {statusMessage}
            </p>
          </div>
        ) : null}

        <QasidahForm
          editingItem={editingItem}
          reservedSlugs={reservedSlugs}
          onCreated={handleCreated}
          onUpdated={handleUpdated}
          onCancelEdit={handleCancelEdit}
        />

        <QasidahTable
          items={qasidahItems}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDeleted={handleDeleted}
        />
      </section>
    </AdminShell>
  );
}