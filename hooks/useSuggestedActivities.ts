import { Activity } from "@/app/types/activity";
import { useState } from "react";

export function useSuggestedActivities(activities: Activity[]) {
  const [suggestedActivities, setSuggestedActivities] = useState<Activity[]>(
    []
  );
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);

  const generateSuggestions = async () => {
    setIsGeneratingSuggestions(true);
    const prompt = `Based on the user's current activities: ${activities
      .map((a) => a.title)
      .join(
        ", "
      )}, suggest 5 new activities for continued competency development.`;

    try {
      const response = await fetch("/api/generate-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate suggestions");
      }

      const data = await response.json();
      const parsedResult = JSON.parse(data.content);
      setSuggestedActivities(parsedResult);
    } catch (error) {
      console.error("Error generating suggestions:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };

  return { suggestedActivities, isGeneratingSuggestions, generateSuggestions };
}
