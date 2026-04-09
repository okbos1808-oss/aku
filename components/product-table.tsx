"use client";

import { useRef, useState, useTransition } from "react";
import { submitPermohonan } from "@/actions/permohonan";
import {
  Building2,
  FileText,
  MapPin,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  BadgeCheck,
} from "lucide-react";

const JENIS_IZIN = [
  "Izin Usaha Mikro Kecil (IUMK)",
  "Surat Izin Usaha Perdagangan (SIUP)",
  "Tanda Daftar Perusahaan (TDP)",
  "Izin Gangguan (HO)",
  "Izin Mendirikan Bangunan (IMB)",
  "Izin Usaha Industri (IUI)",
];

export default function FormPendaftaran() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [nibValue, setNibValue] = useState<string>("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setResult(null);

    startTransition(async () => {
      const res = await submitPermohonan(formData);
      setResult(res);
      if (res.success) {
        formRef.current?.reset();
        setFileName(null);
        setNibValue("");
      }
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="text-blue-600 w-6 h-6" />
            <span className="text-sm font-medium text-blue-600 uppercase tracking-widest">
              Sistem Perizinan Usaha
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">
            Pendaftaran Perizinan
          </h1>
          <p className="text-slate-500 mt-1">
            Isi formulir berikut untuk mengajukan permohonan izin usaha Anda.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {result?.success && (
            <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 mb-6">
              <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Permohonan Berhasil Dikirim!</p>
                <p className="text-sm text-green-700">
                  Permohonan Anda sedang diproses. Pantau status di dashboard.
                </p>
              </div>
            </div>
          )}

          {result?.error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 mb-6">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <p>{result.error}</p>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Usaha */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  Nama Usaha <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="namaUsaha"
                required
                placeholder="Contoh: Toko Maju Jaya"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Jenis Izin */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-400" />
                  Jenis Izin <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                name="jenisIzin"
                required
                defaultValue=""
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
              >
                <option value="" disabled>
                  -- Pilih Jenis Izin --
                </option>
                {JENIS_IZIN.map((j) => (
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </select>
            </div>

            {/* Alamat */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  Alamat Usaha <span className="text-red-500">*</span>
                </span>
              </label>
              <textarea
                name="alamat"
                required
                rows={3}
                placeholder="Jl. Contoh No. 1, Kelurahan, Kecamatan, Kota"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
            </div>

            {/* Punya NIB */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-slate-400" />
                  Nomor Induk Berusaha (NIB)
                </span>
              </label>
              <div className="flex items-center gap-3 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="punya_nib_radio"
                    value="ya"
                    onChange={() => {}}
                    onClick={() => setNibValue("")}
                    className="accent-blue-600"
                  />
                  <span className="text-sm text-slate-700">Sudah punya NIB</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="punya_nib_radio"
                    value="tidak"
                    onChange={() => {}}
                    onClick={() => setNibValue("BELUM_PUNYA")}
                    className="accent-blue-600"
                  />
                  <span className="text-sm text-slate-700">Belum punya NIB</span>
                </label>
              </div>
              <input
                type="text"
                name="punya_nib"
                value={nibValue}
                onChange={(e) => setNibValue(e.target.value)}
                placeholder={
                  nibValue === "BELUM_PUNYA"
                    ? "Belum memiliki NIB"
                    : "Masukkan nomor NIB (13 digit)"
                }
                disabled={nibValue === "BELUM_PUNYA"}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Upload Dokumen */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-slate-400" />
                  Upload Dokumen Pendukung <span className="text-red-500">*</span>
                </span>
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                <div className="flex flex-col items-center gap-1 text-slate-400">
                  <Upload className="w-6 h-6" />
                  {fileName ? (
                    <span className="text-sm text-blue-600 font-medium">
                      {fileName}
                    </span>
                  ) : (
                    <>
                      <span className="text-sm font-medium">
                        Klik untuk upload file
                      </span>
                      <span className="text-xs">PDF, JPG, PNG (maks. 5MB)</span>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  name="fileDokumen"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Mengirim Permohonan...
                </>
              ) : (
                "Kirim Permohonan"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Pastikan data yang diisi sudah benar sebelum mengirim permohonan.
        </p>
      </div>
    </div>
  );
}
