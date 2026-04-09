"use server";

import { auth } from "@/lib/auth";

type Permohonan = {
  id: string;
  userId: string;
  namaUsaha: string;
  jenisIzin: string;
  alamat: string;
  nib: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: Date;
};

let dataDummy: Permohonan[] = [];

//////////////////////////////////////////////////
// USER: SUBMIT
//////////////////////////////////////////////////
export async function submitPermohonan(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return { error: "Harus login!" };
  }

  const namaUsaha = formData.get("namaUsaha") as string;
  const jenisIzin = formData.get("jenisIzin") as string;
  const alamat = formData.get("alamat") as string;
  const nib = formData.get("punya_nib") as string;

  if (!namaUsaha || !jenisIzin || !alamat) {
    return { error: "Semua field wajib diisi!" };
  }

  const data: Permohonan = {
    id: Date.now().toString(),
    userId: session.user.id, // 🔥 dari login
    namaUsaha,
    jenisIzin,
    alamat,
    nib: nib || null,
    status: "PENDING",
    createdAt: new Date(),
  };

  dataDummy.push(data);

  return { success: true };
}

//////////////////////////////////////////////////
// USER: LIHAT DATA SENDIRI
//////////////////////////////////////////////////
export async function getPermohonanUser() {
  const session = await auth();

  if (!session?.user) return [];

  return dataDummy.filter(
    (item) => item.userId === session.user.id
  );
}

//////////////////////////////////////////////////
// ADMIN: LIHAT SEMUA
//////////////////////////////////////////////////
export async function getPermohonanAdmin() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return dataDummy;
}

//////////////////////////////////////////////////
// ADMIN: APPROVE
//////////////////////////////////////////////////
export async function approvePermohonan(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id");

  dataDummy = dataDummy.map((item) =>
    item.id === id ? { ...item, status: "APPROVED" } : item
  );
}

//////////////////////////////////////////////////
// ADMIN: REJECT
//////////////////////////////////////////////////
export async function rejectPermohonan(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id");

  dataDummy = dataDummy.map((item) =>
    item.id === id ? { ...item, status: "REJECTED" } : item
  );
}