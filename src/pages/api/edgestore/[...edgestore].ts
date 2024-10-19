import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/pages";

const es = initEdgeStore.create();

/**
 * This is the main router for the edgestore buckets.
 */
const edgeStoreRouter = es.router({
	publicFiles: es
		.fileBucket()
		.beforeUpload(({ ctx, input, fileInfo }) => {
			return true; // allow upload
		})
		/**
		 * return `true` to allow delete
		 * This function must be defined if you want to delete files directly from the client.
		 */
		.beforeDelete(({ ctx, fileInfo }) => {
			return true; // allow delete
		}),
});

export default createEdgeStoreNextHandler({
	router: edgeStoreRouter,
});

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
