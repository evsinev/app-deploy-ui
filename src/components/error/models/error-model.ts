import { v4 } from 'uuid';
import { ErrorModelDetail, RequestErrorModel } from './types';

export class RequestError extends Error {
  constructor(props: RequestErrorModel) {
    super(props.title);

    this.errorId = props.errorId || v4();
    this.title = props.title;
    this.type = props.type || 'Request Error';
    this.status = props.status;
    this.detail = props.detail;
  }

  errorId: string;

  title?: string;

  type: string;

  status?: number;

  detail?: ErrorModelDetail;
}
