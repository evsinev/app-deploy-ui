'use client';

import { Alert } from '@cloudscape-design/components';
import { RequestErrorModel } from '../models/types';

interface ErrorMessageProps {
  error: RequestErrorModel;
  onClose: () => void;
  index: number;
}

export default function ErrorWidget(props: ErrorMessageProps) {
  const { error, onClose } = props;

  return (
    <Alert
      dismissible
      onDismiss={onClose}
      type="error"
      header="Error"
    >
      <div data-name="error-id">
        <strong>Error ID:</strong>
        <span>{JSON.stringify(error.errorId)}</span>
      </div>
      <div data-name="error-id">
        <strong>Title:</strong>
        <span>{JSON.stringify(error.title)}</span>
      </div>
      <div data-name="error-type">
        <strong>Type:</strong>
        <span>{JSON.stringify(error.type)}</span>
      </div>
      <div data-name="error-status">
        <strong>Status:</strong>
        <span>{JSON.stringify(error.status)}</span>
      </div>
      <div data-name="error-detail">
        <strong>Detail:</strong>
        <span>{JSON.stringify(error.detail)}</span>
      </div>
    </Alert>
  );
}
