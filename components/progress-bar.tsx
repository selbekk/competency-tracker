interface ProgressBarProps {
  label: string;
  current: number;
  total: number;
}

export function ProgressBar({ label, current, total }: ProgressBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <label htmlFor={`progress-${label}`} className="text-sm font-medium">
          {label}
        </label>
        <span className="text-sm font-medium">{`${current}/${total}`}</span>
      </div>
      <progress
        id={`progress-${label}`}
        className="w-full h-2.5 [&::-webkit-progress-bar]:bg-gray-600 [&::-webkit-progress-value]:bg-yellow-500 [&::-moz-progress-bar]:bg-yellow-500 [&::-webkit-progress-bar]:rounded-sm [&::-webkit-progress-value]:rounded-sm [&::-moz-progress-bar]:rounded-sm"
        value={current}
        max={total}
      />
    </div>
  );
}
