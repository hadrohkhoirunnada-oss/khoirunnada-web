import Card from "@/components/ui/Card";

export default function EmptyState({ title, description }) {
  return (
    <Card className="mt-10 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-amber-300">Khoirunnada</p>
      <h1 className="mt-4 text-2xl font-semibold text-white">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
    </Card>
  );
}
