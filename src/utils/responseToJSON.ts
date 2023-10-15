export const responseToJSON = <T = any>(res: any): T => {
	try {
		return JSON.parse(res);
	} catch (error) {
		throw Error(`[requestClient] Error parsing response JSON data - ${JSON.stringify(error)}`);
	}
};
