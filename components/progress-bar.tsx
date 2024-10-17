interface ProgressBarProps {
  label: string;
  current: number;
  total: number;
  color: string;
}

export function ProgressBar({
  label,
  current,
  total,
  color,
}: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{`${current}/${total}`}</span>
      </div>
      <div className="w-full bg-gray-600 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
