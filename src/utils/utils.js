'use strict';

import globals from '../globals/globals';
import Uri from 'metal-uri';

/**
 * A collection of static utility functions.
 * @const
 */
class utils {

	/**
	 * Copies attributes form source node to target node.
	 * @return {void}
	 * @static
	 */
	static copyNodeAttributes(source, target) {
		Array.prototype.slice.call(source.attributes).forEach((attribute) => target.setAttribute(attribute.name, attribute.value));
	}

	/**
	 * Gets the current browser path including hashbang.
	 * @return {!string}
	 * @static
	 */
	static getCurrentBrowserPath() {
		return this.getCurrentBrowserPathWithoutHash() + globals.window.location.hash;
	}

	/**
	 * Gets the current browser path excluding hashbang.
	 * @return {!string}
	 * @static
	 */
	static getCurrentBrowserPathWithoutHash() {
		return globals.window.location.pathname + globals.window.location.search;
	}

	/**
	 * Extracts the path part of an url.
	 * @return {!string}
	 * @static
	 */
	static getUrlPath(url) {
		var uri = new Uri(url);
		return uri.getPathname() + uri.getSearch() + uri.getHash();
	}

	/**
	 * Extracts the path part of an url without hashbang.
	 * @return {!string}
	 * @static
	 */
	static getUrlPathWithoutHash(url) {
		var uri = new Uri(url);
		return uri.getPathname() + uri.getSearch();
	}

	/**
	 * Extracts the path part of an url without hashbang and query search.
	 * @return {!string}
	 * @static
	 */
	static getUrlPathWithoutHashAndSearch(url) {
		var uri = new Uri(url);
		return uri.getPathname();
	}

	/**
	 * Checks if url is in the same browser current url excluding the hashbang.
	 * @param  {!string} url
	 * @return {boolean}
	 * @static
	 */
	static isCurrentBrowserPath(url) {
		if (url) {
			const currentBrowserPath = this.getCurrentBrowserPathWithoutHash();
			// the getUrlPath will create a Uri and will normalize the path and
			// remove the trailling '/' for properly comparing paths.
			return utils.getUrlPathWithoutHash(url) === this.getUrlPath(currentBrowserPath);
		}
		return false;
	}

	/**
	 * Returns true if HTML5 History api is supported.
	 * @return {boolean}
	 * @static
	 */
	static isHtml5HistorySupported() {
		return !!(globals.window.history && globals.window.history.pushState);
	}

	/**
	 * Removes all attributes form node.
	 * @return {void}
	 * @static
	 */
	static clearNodeAttributes(node) {
		Array.prototype.slice.call(node.attributes).forEach((attribute) => node.removeAttribute(attribute.name));
	}

	/**
	 * Checks if a given url is valid and returns a URI object. Otherwise,
	 * returns false.
	 * @return {Object<Uri>|boolean}
	 * @static
	 */
	static validateUrl(url) {
		let result = {
			url: url
		};

		try {
			result = new Uri(url);
		}
		catch (err) {
			console.error(`Invalid url ${url}`);
			result.error = err;
		}

		return result;
	}

}

export default utils;
