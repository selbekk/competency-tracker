import { addActivity } from "@/app/tracker/actions";
import { useEffect, useState } from "react";
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

interface ActivityData {
  type: string;
  title: string;
  description: string;
  status: string;
  date: string;
  link: string;
}

interface AddActivityFormProps {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  prefillActivity?: Partial<ActivityData>;
}

export function AddActivityForm({
  setIsAddModalOpen,
  prefillActivity,
}: AddActivityFormProps) {
  const [formData, setFormData] = useState<ActivityData>({
    type: "",
    title: "",
    description: "",
    status: "",
    date: "",
    link: "",
  });

  useEffect(() => {
    if (prefillActivity) {
      setFormData((prevData) => ({
        ...prevData,
        ...prefillActivity,
      }));
    }
  }, [prefillActivity]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof ActivityData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await addActivity(new FormData(e.currentTarget));
    if (result.error) {
      console.error(result.error);
    } else {
      setIsAddModalOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="type">Type</Label>
        <Select
          name="type"
          value={formData.type}
          onValueChange={handleSelectChange("type")}
        >
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
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="progress">Select your progress on this activity</Label>
        <Select
          name="status"
          value={formData.status}
          onValueChange={handleSelectChange("status")}
        >
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
      {formData.status === "completed" && (
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
      )}
      <div>
        <Label htmlFor="link">Link (optional)</Label>
        <Input
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
        />
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
