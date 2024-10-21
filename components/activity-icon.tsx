import {
  Book,
  FileText,
  GraduationCap,
  Headphones,
  HelpCircle,
  Video,
} from "lucide-react";

interface ActivityIconProps {
  type: string;
  className?: string;
}

export function ActivityIcon({ type, className }: ActivityIconProps) {
  switch (type) {
    case "book":
      return <Book className={className} />;
    case "video":
      return <Video className={className} />;
    case "article":
      return <FileText className={className} />;
    case "course":
      return <GraduationCap className={className} />;
    case "podcast":
      return <Headphones className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
}
