export default interface ResponseInterface<T> {
  data: T;
  _headers: Headers;
  meta?: {
    oldest_id: string;
    newest_id: string;
    result_count: number;
    next_token: string;
  };
}
