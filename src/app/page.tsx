import { redirect } from "next/navigation";
import { i18nConfig } from "@/lib/i18n/config";

// Root page redirects to the default locale
export default function RootPage() {
  redirect(`/${i18nConfig.defaultLocale}`);
}
