import prismadb from "@/lib/prismadb";
import { PhilosopherForm } from "./components/PhilosopherForm";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface PhilosopherIdPageProps {
  params: {
    philosopherId: string;
  };
}

const PhilosopherIdPage = async ({ params }: PhilosopherIdPageProps) => {
  const { userId } = auth();

  // TODO: Check Subs

  if (!userId) {
    return redirectToSignIn();
  }

  const philosopher = await prismadb.philosopher.findUnique({
    where: {
      id: params.philosopherId,
      userId,
    },
  });

  const categories = await prismadb.category.findMany();

  return <PhilosopherForm initialData={philosopher} categories={categories} />;
};

export default PhilosopherIdPage;
