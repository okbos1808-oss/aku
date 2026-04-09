import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import HeroText from "@/components/HeroText";
import { getPermohonanUser } from "@/actions/permohonan";

export default async function DashboardPage() {
  const session = await auth();

  // 🔒 proteksi
  if (!session?.user) {
    redirect("/login");
  }

  // 🔥 kalau admin jangan ke sini
  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  const data = await getPermohonanUser();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h1 className="text-2xl font-bold">
            Welcome, {session.user.name}
          </h1>
          <HeroText />
        </div>

        {/* DATA PERMOHONAN */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Permohonan Saya
          </h2>

          {data.length === 0 && (
            <p className="text-gray-500">
              Belum ada permohonan
            </p>
          )}

          {data.map((item) => (
            <div key={item.id} className="border p-3 rounded mb-2">
              <p><b>Nama Usaha:</b> {item.namaUsaha}</p>
              <p><b>Jenis Izin:</b> {item.jenisIzin}</p>
              <p>
                <b>Status:</b>{" "}
                <span
                  className={
                    item.status === "PENDING"
                      ? "text-yellow-600"
                      : item.status === "APPROVED"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {item.status}
                </span>
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}