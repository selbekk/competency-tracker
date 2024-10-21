import { User, UserSchema } from "@/app/types/user";
import { createClient } from "@/lib/supabase/server";

/**
 * Retrieves the currently authenticated user's information from the database.
 *
 * @returns {Promise<User | null>} A promise that resolves to a User object if successful, or null if no user is found or an error occurs.
 *
 * @example
 * // Example usage
 * const user = await getUser();
 * if (user) {
 *   console.log(`Welcome, ${user.first_name}!`);
 *   console.log(`You have ${user.points} points.`);
 * } else {
 *   console.log('No user found or an error occurred.');
 * }
 */

export async function getUser(): Promise<User | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  try {
    const validatedUser = UserSchema.parse(data);
    return validatedUser;
  } catch (validationError) {
    console.error("User data validation error:", validationError);
    return null;
  }
}

/**
 * Updates the currently authenticated user's information in the database.
 *
 * @param {Partial<User>} updates - The partial user object containing the fields to update.
 * @returns {Promise<User | null>} A promise that resolves to a User object if successful, or null if no user is found, an error occurs, or the data does not match the expected schema.
 *
 * @example
 * // Example usage
 * const updatedUser = await updateUser({ points: 150 });
 * if (updatedUser) {
 *   console.log(`User updated: ${updatedUser.first_name} now has ${updatedUser.points} points.`);
 * } else {
 *   console.log('Failed to update user.');
 * }
 */
export async function updateUser(updates: Partial<User>): Promise<User | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("No authenticated user found");
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating user:", error);
    return null;
  }

  try {
    const validatedUser = UserSchema.parse(data);
    return validatedUser;
  } catch (validationError) {
    console.error("Updated user data validation error:", validationError);
    return null;
  }
}

/**
 * Deletes the currently authenticated user from the database.
 *
 * @returns {Promise<{ success: boolean; error?: string }>} A promise that resolves to an object indicating success or failure.
 *
 * @example
 * // Example usage
 * const result = await deleteUser();
 * if (result.success) {
 *   console.log('User successfully deleted');
 * } else {
 *   console.error('Failed to delete user:', result.error);
 * }
 */
export async function deleteUser(): Promise<{
  success: boolean;
  error?: string;
}> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "No authenticated user found" };
  }

  // First, delete the user's data from the 'users' table
  const { error: deleteError } = await supabase
    .from("users")
    .delete()
    .eq("id", user.id);

  if (deleteError) {
    console.error("Error deleting user data:", deleteError);
    return { success: false, error: "Failed to delete user data" };
  }

  // Then, delete the user's authentication record
  const { error: authError } = await supabase.auth.admin.deleteUser(user.id);

  if (authError) {
    console.error("Error deleting user authentication:", authError);
    return { success: false, error: "Failed to delete user authentication" };
  }

  // If both operations succeed, return success
  return { success: true };
}
