import { createClient } from "@/lib/supabase/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt) {
    return new Response(JSON.stringify({ error: "Prompt is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return new Response(JSON.stringify({ error: "Failed to fetch user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fetch the user's assessment from the database
  const { data: assessment, error } = await supabase
    .from("assessments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch assessment" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Include the assessment data in the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates suggestions for activities to improve your skills. These activities should be related to the user's prompt. The activities should be in the following format: {title: string, description: string, type: string, link: string}. The type should be one of the following: book, video, article, course, podcast. The description should be a short description of the activity that is no longer than 100 characters. The title should be a short title for the activity that is no longer than 50 characters. The response should be in JSON format, as a list of activities.",
      },
      {
        role: "system",
        content: `User's current assessment and focus: ${JSON.stringify(
          assessment
        )}`,
      },
      { role: "user", content: prompt },
    ],
  });

  // Extract the generated content from the response
  const generatedContent = response.choices[0].message.content
    ?.replace("```json", "")
    .replace("```", "");

  // Return the complete response as JSON
  return new Response(JSON.stringify({ content: generatedContent }), {
    headers: { "Content-Type": "application/json" },
  });
}