import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/site.config";

export function getFormattedDate(
	date: Date | undefined,
	options?: Intl.DateTimeFormatOptions,
): string {
	if (date === undefined) {
		return "Invalid Date";
	}

	const mergedOptions = { ...(siteConfig.date.options as Intl.DateTimeFormatOptions), ...options };
	for (const key of ["day", "month", "year"] as const) {
		if (options && !(key in options)) {
			delete mergedOptions[key];
		}
	}

	return new Intl.DateTimeFormat(siteConfig.lang, mergedOptions).format(date);
}

export function collectionDateSort(
	a: CollectionEntry<"post" | "note">,
	b: CollectionEntry<"post" | "note">,
) {
	return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}
