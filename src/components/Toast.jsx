import { useStore } from '../context/StoreContext';

export default function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/95 px-5 py-3.5 text-white shadow-2xl backdrop-blur-md transition-all animate-bounce"
      role="status"
      aria-live="polite"
    >
      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );
}
