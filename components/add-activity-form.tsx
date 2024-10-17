import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface AddActivityFormProps {
  newActivity: {
    type: string;
    title: string;
    date: string;
    link?: string;
  };
  setNewActivity: React.Dispatch<
    React.SetStateAction<{
      type: string;
      title: string;
      date: string;
      link?: string;
    }>
  >;
  addActivity: (e: React.FormEvent) => void;
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddActivityForm({
  newActivity,
  setNewActivity,
  addActivity,
  setIsAddModalOpen,
}: AddActivityFormProps) {
  return (
    <form onSubmit={addActivity} className="space-y-4">
      <div>
        <Label htmlFor="type">Type</Label>
        <Select
          value={newActivity.type}
          onValueChange={(value) =>
            setNewActivity({ ...newActivity, type: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select activity type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="book">Book</SelectItem>
            <SelectItem value="talk">Talk</SelectItem>
            <SelectItem value="workshop">Workshop</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={newActivity.title}
          onChange={(e) =>
            setNewActivity({ ...newActivity, title: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={newActivity.date}
          onChange={(e) =>
            setNewActivity({ ...newActivity, date: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="link">Link (optional)</Label>
        <Input
          id="link"
          value={newActivity.link}
          onChange={(e) =>
            setNewActivity({ ...newActivity, link: e.target.value })
          }
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsAddModalOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit">Add Activity</Button>
      </div>
    </form>
  );
}
