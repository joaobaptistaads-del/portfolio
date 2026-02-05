import { getRequestConfig } from "next-intl/server";

const DEFAULT_LOCALE = "pt";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? DEFAULT_LOCALE;

  return {
    locale: resolvedLocale,
    messages: (await import(`../../messages/${resolvedLocale}.json`)).default,
  };
});
