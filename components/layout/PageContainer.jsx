export default function PageContainer({ children, className = "" }) {
  return (
    <main
      className={`relative z-10 mx-auto w-full px-5 py-8 text-white ${className}`}
    >
      {children}
    </main>
  );
}