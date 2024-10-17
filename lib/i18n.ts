import { useRouter } from "next/router";

/** The supported languages as enums */
export enum Language {
  English = "en",
  Norwegian = "no",
}
export type LanguageObject = {
  [key in Language]: string | React.ReactNode;
};
type LanguageFunction = (...args: (string | number)[]) => LanguageObject;

type Translations = {
  [key: string]:
    | LanguageObject
    | LanguageFunction
    | Translations
    | Array<LanguageFunction | LanguageObject | Translations>;
};

/** Converts a Next.js locale string to a language enum */
const toLanguage = (locale?: string): Language => {
  switch (locale) {
    case "en":
      return Language.English;
    case "no":
      return Language.Norwegian;

    default:
      console.warn(`Unknown locale "${locale}", defaulting to Norwegian`);
      return Language.Norwegian;
  }
};

/** Utility function that creates type safe text objects with useTranslation
 *
 * ```tsx
 * const texts = createTexts({
 *  example: {
 *   no: "Eksempel",
 *   en: "Example",
 *  }
 * })
 * ```
 */
export function createTexts<T extends Translations>(texts: T) {
  return texts;
}

/** Utility for localizing texts
 *
 * ```tsx
 * const texts = createTexts({
 *   example: { no: "Eksempel", en: "Example" }
 * });
 * const Example = () => {
 *   const { t } = useTranslation();
 *   return t(texts.example);
 * }
 */
export const useTranslation = () => {
  const { locale } = useRouter();
  const language = toLanguage(locale);
  return {
    t: (translations: LanguageObject) => translations[language] as string,
    language,
  };
};
