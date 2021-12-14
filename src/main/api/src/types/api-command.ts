/**
 * vMix API function command type
 * 
 * Applicable to 
 * https://www.vmix.com/help24/index.htm?ShortcutFunctionReference.html
 */
export type vMixApiFunctionCommand = {
	// May always contain Function parameter
	Function: String
	[key: string]: any
}
