import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const getUserData = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin") redirect("/dashboard");


  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("DB ERROR:", error);
    return [];
  }
};

export const getProductByUser = async () => {
  const session = await auth();

  if (!session?.user) redirect("/dashboard");

  const { id, role } = session.user;

  try {
    const products = await prisma.permohonan.findMany({
      where: role === "admin" ? undefined : { userId: id },
      include: { user: { select: { name: true } } },
    });

    return products;
  } catch (error) {
    console.error("DB ERROR:", error);
    return [];
  }
};