/* eslint-disable no-useless-escape */
export default class URLHelper {
  static getLocation(url) {
    const el = document.createElement("a");
    el.href = url;

    return {
      url: url,
      protocolo: url.protocol,
      host: url.host,
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash
    };
  }
}
