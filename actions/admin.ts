"use server";

import { prisma } from "@/lib/prisma";
import { StatusPermohonan } from "@/src/generated/client";

const TRANSISI: Record<StatusPermohonan, StatusPermohonan[]> = {
  PENDING: ["DISETUJUI", "DITOLAK"],
  DISETUJUI: ["MENUNGGU_PEMBAYARAN"],
  DITOLAK: [],
  MENUNGGU_PEMBAYARAN: ["MENUNGGU_VERIFIKASI_PEMBAYARAN"],
  MENUNGGU_VERIFIKASI_PEMBAYARAN: ["MENUNGGU_SERTIFIKAT"],
  MENUNGGU_SERTIFIKAT: ["SERTIFIKAT_TERSEDIA"],
  SERTIFIKAT_TERSEDIA: [],
};

export async function updateStatus(
  id: string,
  status: StatusPermohonan
) {
  try {
    const data = await prisma.permohonan.findUnique({
      where: { id },
      select: { status: true }, // 🔥 lebih ringan & aman
    });

    if (!data) {
      return { error: "Data tidak ditemukan" };
    }

    // 🔒 status final tidak bisa diubah
    if (data.status === "DITOLAK" || data.status === "SERTIFIKAT_TERSEDIA") {
      return { error: "Status sudah final dan tidak bisa diubah" };
    }

    const allowedNext = TRANSISI[data.status];

    if (!allowedNext.includes(status)) {
      return {
        error: `Tidak bisa ubah dari ${data.status} ke ${status}`,
      };
    }

    await prisma.permohonan.update({
      where: { id },
      data: { status },
    });

    return { success: true };
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    return { error: "Gagal update status" };
  }
}