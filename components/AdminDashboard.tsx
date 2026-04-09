"use client";

import { useTransition } from "react";
import { updateStatus } from "@/actions/admin";
import { StatusPermohonan } from "@/src/generated/client";

type PermohonanType = {
  id: string;
  namaUsaha: string;
  jenisIzin: string;
  status: StatusPermohonan;
  user: {
    name: string | null;   // ✅ FIX
    email: string | null;  // ✅ FIX
  };
};

const STATUS_LABEL: Record<StatusPermohonan, string> = {
  PENDING: "Menunggu",
  DISETUJUI: "Disetujui",
  DITOLAK: "Ditolak",
  MENUNGGU_PEMBAYARAN: "Menunggu Pembayaran",
  MENUNGGU_VERIFIKASI_PEMBAYARAN: "Verifikasi Pembayaran",
  MENUNGGU_SERTIFIKAT: "Proses Sertifikat",
  SERTIFIKAT_TERSEDIA: "Selesai",
};

export default function AdminDashboard({ data }: { data: PermohonanType[] }) {
  const [isPending, startTransition] = useTransition();

  function handleUpdate(id: string, status: StatusPermohonan) {
    startTransition(async () => {
      await updateStatus(id, status);
      window.location.reload();
    });
  }

  function getStatusColor(status: StatusPermohonan) {
    switch (status) {
      case "PENDING":
        return "bg-gray-200 text-gray-700";
      case "DISETUJUI":
        return "bg-green-100 text-green-700";
      case "DITOLAK":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

      <div className="overflow-x-auto bg-white rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-3 text-left">Nama Pemohon</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Usaha</th>
              <th className="p-3 text-left">Jenis Izin</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium">
                  {item.user?.name || "-"}
                </td>
                <td className="p-3 text-slate-500">
                  {item.user?.email || "-"}
                </td>
                <td className="p-3">{item.namaUsaha}</td>
                <td className="p-3">{item.jenisIzin}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {STATUS_LABEL[item.status]}
                  </span>
                </td>

                <td className="p-3 text-center space-x-2">
                  <button
                    disabled={item.status !== "PENDING"}
                    onClick={() =>
                      handleUpdate(item.id, "DISETUJUI")
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded disabled:opacity-40"
                  >
                    Setujui
                  </button>

                  <button
                    disabled={item.status !== "PENDING"}
                    onClick={() =>
                      handleUpdate(item.id, "DITOLAK")
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded disabled:opacity-40"
                  >
                    Tolak
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <p className="text-center py-6 text-slate-500">
            Belum ada permohonan
          </p>
        )}
      </div>

      {isPending && (
        <p className="mt-3 text-sm text-slate-500">Memproses...</p>
      )}
    </div>
  );
}