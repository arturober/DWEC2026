type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class Http {
  async ajax<T>(method: HttpMethod, url: string, body: string | FormData | null = null): Promise<T> {
    console.log(typeof body);
    const json = body && ! (body instanceof FormData);
    const headers: HeadersInit = body && json ? { "Content-Type": "application/json" } : {};
    const resp = await fetch(url, { method, headers, body });

    if (!resp.ok) throw new Error(resp.statusText);

    if (resp.status != 204) {
      return resp.json() as Promise<T>;
    } else {
      return null as T; // 204 implica una respuesta sin datos
    }
  }

  get<T>(url: string): Promise<T> {
    return this.ajax("GET", url);
  }

  post<T, U>(url: string, body: U): Promise<T> {
    return this.ajax("POST", url, body instanceof FormData ? body : JSON.stringify(body));
  }

  put<T, U>(url: string, body: U): Promise<T> {
    return this.ajax("PUT", url, body instanceof FormData ? body : JSON.stringify(body));
  }

  delete<T>(url: string): Promise<T> {
    return this.ajax("DELETE", url);
  }
}