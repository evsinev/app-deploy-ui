import { Input, Toggle, ToggleProps } from '@cloudscape-design/components';
import { NonCancelableEventHandler } from '@cloudscape-design/components/internal/events';
import { BaseChangeDetail } from '@cloudscape-design/components/input/interfaces';
import { InputFormData } from './models/input-form-data';

interface FormComponentProps {
  index: number;
  row: InputFormData;
  onChange?: NonCancelableEventHandler<BaseChangeDetail | ToggleProps.ChangeDetail>;
  disabled?: boolean;
  error?: string;
}

export default function FormComponent(props: FormComponentProps) {
  if (typeof props.row.value === 'boolean') {
    return (
      <Toggle
        data-id={props.row.field}
        checked={props.row.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    );
  }

  return (
    <Input
      data-id={props.row.field}
      value={props.row.value.toString()}
      onChange={props.onChange}
      type={props.row.type}
      invalid={!!props.error}
      placeholder={props.row.placeholder}
      disabled={props.disabled}
    />
  );
}
