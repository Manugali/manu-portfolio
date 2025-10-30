import { motion } from "framer-motion";

type StatCardProps = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
};

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_70%,transparent)] p-4 shadow-sm backdrop-blur"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="mt-1 text-2xl font-semibold">{value}</div>
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </motion.div>
  );
}


