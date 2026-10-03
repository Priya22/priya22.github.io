import { type CollectionEntry, getCollection } from "astro:content";

/** filter out draft notes based on the environment */
export async function getAllNotes(): Promise<CollectionEntry<"note">[]> {
	return await getCollection("note", ({ data }) => {
        return data
		// return import.meta.env.PROD ? !data.draft : true;
	});
}

/**get all featured notes */
export async function getFeaturedNotes(): Promise<CollectionEntry<"note">[]> {
	return await getCollection("note", ({ data }) => {
		return data.featured === true;    
	});
}

/** groups notes by year (based on option siteConfig.sortNotesByUpdatedDate), using the year as the key
 *  Note: This function doesn't filter draft notes, pass it the result of getAllNotes above to do so.
 */
export function groupNotesByYear(notes: CollectionEntry<"note">[]) {
	return Object.groupBy(notes, (note) => note.data.publishDate.getFullYear().toString());
}


