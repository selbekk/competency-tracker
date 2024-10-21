import { addActivity } from "@/app/tracker/actions";
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
import { Textarea } from "./ui/textarea";

interface AddActivityFormProps {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddActivityForm({ setIsAddModalOpen }: AddActivityFormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const result = await addActivity(formData);
    if (result.error) {
      // Handle error (e.g., show an error message)
      console.error(result.error);
    } else {
      // Handle success (e.g., close the modal, show a success message)
      setIsAddModalOpen(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="type">Type</Label>
        <Select name="type">
          <SelectTrigger>
            <SelectValue placeholder="Select activity type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="book">Book</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="article">Article</SelectItem>
            <SelectItem value="course">Course</SelectItem>
            <SelectItem value="podcast">Podcast</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required />
      </div>
      <div>
        <Label htmlFor="progress">Select your progress on this activity</Label>
        <Select name="status">
          <SelectTrigger>
            <SelectValue placeholder="Select progress status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="not_started">I want to do this</SelectItem>
            <SelectItem value="in_progress">I am doing this</SelectItem>
            <SelectItem value="completed">I did this already</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" type="date" required />
      </div>
      <div>
        <Label htmlFor="link">Link (optional)</Label>
        <Input id="link" name="link" />
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setIsAddModalOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit">Add Activity</Button>
      </div>
    </form>
  );
}
