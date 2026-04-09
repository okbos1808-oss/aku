import {
  getPermohonanUser,   // ← renamed
  approvePermohonan,
  rejectPermohonan,
} from "@/actions/permohonan";

export default async function AdminPage() {
  const data = await getPermohonanUser();  // ← renamed

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-slate-800">
          Dashboard Admin
        </h1>

        {data.length === 0 && (
          <p className="text-slate-500">Belum ada permohonan masuk</p>
        )}

        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              {/* DATA */}
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <p><b>Nama Usaha:</b> {item.namaUsaha}</p>
                <p><b>Jenis Izin:</b> {item.jenisIzin}</p>
                <p><b>Alamat:</b> {item.alamat}</p>
                <p><b>NIB:</b> {item.nib || "-"}</p>
              </div>

              {/* STATUS */}
              <div className="mt-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    item.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : item.status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* ACTION BUTTON */}
              {item.status === "PENDING" && (
                <div className="flex gap-2 mt-4">
                  {/* APPROVE */}
                  <form action={approvePermohonan}>
                    <input type="hidden" name="id" value={item.id} />
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                      Approve
                    </button>
                  </form>

                  {/* REJECT */}
                  <form action={rejectPermohonan}>
                    <input type="hidden" name="id" value={item.id} />
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                      Reject
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}