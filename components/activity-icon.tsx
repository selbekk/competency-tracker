import { Book, Mic, Users, Zap } from "lucide-react";

interface ActivityIconProps {
  type: string;
  className?: string;
}

export function ActivityIcon({ type, className }: ActivityIconProps) {
  switch (type) {
    case "book":
      return <Book className={className} />;
    case "talk":
      return <Mic className={className} />;
    case "workshop":
      return <Users className={className} />;
    default:
      return <Zap className={className} />;
  }
}
