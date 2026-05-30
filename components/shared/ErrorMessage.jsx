export default function ErrorMessage({ message = "Terjadi kesalahan." }) {
  return (
    <p className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
      {message}
    </p>
  );
}
