export default function PageContainer({ children }) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[480px] px-5 py-8 text-white">
      {children}
    </main>
  );
}
