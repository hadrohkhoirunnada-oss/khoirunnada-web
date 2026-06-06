"use client";

import { useEffect, useMemo, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import StatusMessage from "@/components/admin/settings/StatusMessage";
import WhatsappAdminCreateForm from "@/components/admin/settings/WhatsappAdminCreateForm";
import WhatsappAdminHeader from "@/components/admin/settings/WhatsappAdminHeader";
import WhatsappAdminList from "@/components/admin/settings/WhatsappAdminList";
import WhatsappAdminSaveButton from "@/components/admin/settings/WhatsappAdminSaveButton";
import {
  DEFAULT_SITE_CONTACT_SETTINGS,
  MAX_WHATSAPP_ADMINS,
  createWhatsappAdminId,
  getSiteContactSettings,
  normalizeWhatsappAdmins,
  normalizeWhatsappNumber,
  updateWhatsappAdmins,
} from "@/services/siteSettingsService";

const initialNewAdmin = {
  name: "",
  whatsappNumber: "",
};

function normalizeAdminName(value = "") {
  return String(value).trim().replace(/\s+/g, " ").toLowerCase();
}

function cleanAdminName(value = "") {
  return String(value).trim().replace(/\s+/g, " ");
}

function isValidWhatsappNumber(value = "") {
  const whatsappNumber = normalizeWhatsappNumber(value);

  return (
    whatsappNumber.startsWith("62") &&
    whatsappNumber.length >= 10 &&
    whatsappNumber.length <= 16
  );
}

function getReadableFirebaseError(error) {
  const code = error?.code || "";
  const message = error?.message || "";

  if (code === "permission-denied") {
    return "Izin ditolak Firestore. Pastikan rules mengizinkan email admin untuk menulis data.";
  }

  if (code === "unauthenticated") {
    return "Sesi login admin belum terbaca oleh Firestore. Silakan logout lalu login ulang.";
  }

  return message || "Terjadi kesalahan. Silakan coba lagi.";
}

export default function Page() {
  const [settings, setSettings] = useState(DEFAULT_SITE_CONTACT_SETTINGS);
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState(initialNewAdmin);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const activeAdminsCount = useMemo(() => {
    return admins.filter((admin) => admin.isActive).length;
  }, [admins]);

  const canAddMoreAdmins = admins.length < MAX_WHATSAPP_ADMINS;

  const hasDraftAdmin =
    newAdmin.name.trim().length > 0 ||
    newAdmin.whatsappNumber.trim().length > 0;

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      try {
        setLoading(true);

        const currentSettings = await getSiteContactSettings();

        if (!isMounted) {
          return;
        }

        const normalizedAdmins = normalizeWhatsappAdmins(
          currentSettings.whatsappAdmins,
          currentSettings
        );

        setSettings({
          ...DEFAULT_SITE_CONTACT_SETTINGS,
          ...currentSettings,
        });

        setAdmins(normalizedAdmins);

        setStatus({
          type: "",
          message: "",
        });
      } catch (error) {
        console.error("Gagal memuat nomor admin:", error);

        if (!isMounted) {
          return;
        }

        setStatus({
          type: "error",
          message: getReadableFirebaseError(error),
        });
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const clearStatus = () => {
    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  const handleNewAdminChange = (field) => (event) => {
    setNewAdmin((current) => ({
      ...current,
      [field]: event.target.value,
    }));

    clearStatus();
  };

  const handleAddAdmin = () => {
    const name = cleanAdminName(newAdmin.name);
    const whatsappNumber = normalizeWhatsappNumber(newAdmin.whatsappNumber);

    if (!canAddMoreAdmins) {
      setStatus({
        type: "error",
        message: `Maksimal hanya boleh ${MAX_WHATSAPP_ADMINS} nomor admin.`,
      });
      return;
    }

    if (!name) {
      setStatus({
        type: "error",
        message: "Nama admin wajib diisi.",
      });
      return;
    }

    if (!isValidWhatsappNumber(whatsappNumber)) {
      setStatus({
        type: "error",
        message:
          "Nomor WhatsApp belum valid. Gunakan format 08..., 628..., atau +628...",
      });
      return;
    }

    const isDuplicateNumber = admins.some(
      (admin) => normalizeWhatsappNumber(admin.whatsappNumber) === whatsappNumber
    );

    if (isDuplicateNumber) {
      setStatus({
        type: "error",
        message: `Nomor WhatsApp ${whatsappNumber} sudah terdaftar.`,
      });
      return;
    }

    const isDuplicateNameAndNumber = admins.some((admin) => {
      return (
        normalizeAdminName(admin.name) === normalizeAdminName(name) &&
        normalizeWhatsappNumber(admin.whatsappNumber) === whatsappNumber
      );
    });

    if (isDuplicateNameAndNumber) {
      setStatus({
        type: "error",
        message: "Nama admin dan nomor WhatsApp tersebut sudah terdaftar.",
      });
      return;
    }

    setAdmins((current) => [
      ...current,
      {
        id: createWhatsappAdminId(),
        name,
        whatsappNumber,
        isActive: true,
      },
    ]);

    setNewAdmin(initialNewAdmin);

    setStatus({
      type: "success",
      message:
        "Admin berhasil ditambahkan ke daftar. Jangan lupa klik Simpan Perubahan.",
    });
  };

  const handleAdminChange = (adminId, field, value) => {
    setAdmins((current) =>
      current.map((admin) =>
        admin.id === adminId
          ? {
              ...admin,
              [field]: value,
            }
          : admin
      )
    );

    clearStatus();
  };

  const handleToggleActive = (adminId) => {
    setAdmins((current) =>
      current.map((admin) =>
        admin.id === adminId
          ? {
              ...admin,
              isActive: !admin.isActive,
            }
          : admin
      )
    );

    clearStatus();
  };

  const handleDeleteAdmin = (adminId) => {
    setAdmins((current) => current.filter((admin) => admin.id !== adminId));

    setStatus({
      type: "success",
      message:
        "Admin dihapus dari daftar. Jangan lupa klik Simpan Perubahan.",
    });
  };

  const validateDraftAdminBeforeSave = () => {
    if (!hasDraftAdmin) {
      return "";
    }

    const draftName = cleanAdminName(newAdmin.name);
    const draftNumber = normalizeWhatsappNumber(newAdmin.whatsappNumber);

    if (!draftName || !draftNumber) {
      return "Form tambah admin masih belum lengkap. Lengkapi lalu klik Tambah Admin, atau kosongkan form tersebut.";
    }

    if (!isValidWhatsappNumber(draftNumber)) {
      return "Nomor WhatsApp pada form tambah admin belum valid. Klik Tambah Admin setelah diperbaiki, atau kosongkan form tersebut.";
    }

    const draftNumberAlreadyExists = admins.some(
      (admin) => normalizeWhatsappNumber(admin.whatsappNumber) === draftNumber
    );

    if (draftNumberAlreadyExists) {
      return `Nomor WhatsApp ${draftNumber} sudah terdaftar. Kosongkan form tambah admin sebelum menyimpan.`;
    }

    return "Masih ada data admin baru yang belum ditambahkan. Klik Tambah Admin dulu, lalu Simpan Perubahan.";
  };

  const validateAdminsBeforeSave = () => {
    const draftValidationMessage = validateDraftAdminBeforeSave();

    if (draftValidationMessage) {
      return draftValidationMessage;
    }

    if (admins.length > MAX_WHATSAPP_ADMINS) {
      return `Maksimal hanya boleh ${MAX_WHATSAPP_ADMINS} nomor admin.`;
    }

    if (admins.length === 0) {
      return "Minimal harus ada 1 nomor admin.";
    }

    const usedNumbers = new Set();
    const usedNameAndNumbers = new Set();

    for (const admin of admins) {
      const name = cleanAdminName(admin.name);
      const whatsappNumber = normalizeWhatsappNumber(admin.whatsappNumber);

      if (!name) {
        return "Semua nama admin wajib diisi.";
      }

      if (!isValidWhatsappNumber(whatsappNumber)) {
        return "Ada nomor WhatsApp yang belum valid.";
      }

      if (usedNumbers.has(whatsappNumber)) {
        return `Nomor WhatsApp ${whatsappNumber} terdaftar lebih dari satu kali.`;
      }

      const nameAndNumberKey = `${normalizeAdminName(name)}-${whatsappNumber}`;

      if (usedNameAndNumbers.has(nameAndNumberKey)) {
        return "Ada nama admin dan nomor WhatsApp yang sama persis.";
      }

      usedNumbers.add(whatsappNumber);
      usedNameAndNumbers.add(nameAndNumberKey);
    }

    const hasActiveAdmin = admins.some((admin) => admin.isActive);

    if (!hasActiveAdmin) {
      return "Minimal harus ada 1 admin yang aktif.";
    }

    return "";
  };

  const handleSave = async () => {
    const validationMessage = validateAdminsBeforeSave();

    if (validationMessage) {
      setStatus({
        type: "error",
        message: validationMessage,
      });
      return;
    }

    try {
      setSaving(true);

      setStatus({
        type: "",
        message: "",
      });

      const cleanedAdmins = admins.map((admin) => ({
        ...admin,
        name: cleanAdminName(admin.name),
        whatsappNumber: normalizeWhatsappNumber(admin.whatsappNumber),
      }));

      const normalizedAdmins = normalizeWhatsappAdmins(cleanedAdmins, settings);

      const savedSettings = await updateWhatsappAdmins(normalizedAdmins, {
        ...settings,
      });

      setSettings({
        ...DEFAULT_SITE_CONTACT_SETTINGS,
        ...savedSettings,
      });

      setAdmins(
        normalizeWhatsappAdmins(savedSettings.whatsappAdmins, savedSettings)
      );

      setNewAdmin(initialNewAdmin);

      setStatus({
        type: "success",
        message: "Daftar nomor admin berhasil disimpan.",
      });
    } catch (error) {
      console.error("Gagal menyimpan nomor admin:", error);

      setStatus({
        type: "error",
        message: getReadableFirebaseError(error),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell>
      <section className="space-y-5 pb-8">
        <WhatsappAdminHeader
          totalAdmins={admins.length}
          maxAdmins={MAX_WHATSAPP_ADMINS}
        />

        <WhatsappAdminCreateForm
          newAdmin={newAdmin}
          loading={loading}
          saving={saving}
          canAddMoreAdmins={canAddMoreAdmins}
          maxAdmins={MAX_WHATSAPP_ADMINS}
          onChange={handleNewAdminChange}
          onAdd={handleAddAdmin}
        />

        <WhatsappAdminList
          admins={admins}
          loading={loading}
          saving={saving}
          activeAdminsCount={activeAdminsCount}
          onChange={handleAdminChange}
          onToggleActive={handleToggleActive}
          onDelete={handleDeleteAdmin}
        />

        <StatusMessage status={status} />

        <WhatsappAdminSaveButton
          loading={loading}
          saving={saving}
          onSave={handleSave}
        />
      </section>
    </AdminShell>
  );
}