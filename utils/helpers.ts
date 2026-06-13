import { HeaderMap } from '@apollo/server';
import { IncomingHttpHeaders } from 'http';

export function toHeaderMap(headers: IncomingHttpHeaders) {
  const map = new HeaderMap();
  for (const [key, value] of Object.entries(headers)) {
    if (Array.isArray(value)) {
      for (const v of value) map.set(key, v);
    } else if (value !== undefined) {
      map.set(key, value);
    }
  }

  return map;
}
