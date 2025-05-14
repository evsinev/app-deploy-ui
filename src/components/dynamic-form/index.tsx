import { FormField, Grid, ToggleProps } from '@cloudscape-design/components';
import { BaseChangeDetail } from '@cloudscape-design/components/input/interfaces';
import { InputFormData } from './models/input-form-data';
import FormComponent from '@/components/dynamic-form/form-component';

export type DynamicFormData = InputFormData[];

interface DynamicFormProps {
  data: DynamicFormData;
  setData: (newData: DynamicFormData) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  disabled?: boolean;
}

export default function DynamicForm(props: DynamicFormProps) {
  const setRow = (index: number, detail: BaseChangeDetail | ToggleProps.ChangeDetail) => {
    const newData = [...props.data];
    newData[index].value = typeof newData[index].value === 'boolean'
      ? (detail as ToggleProps.ChangeDetail).checked
      : (detail as BaseChangeDetail).value;
    props.setData(newData);

    const newErrors = { ...props.errors };
    delete newErrors[props.data[index].field];

    props.setErrors(newErrors);
  };

  return (
    <Grid
      gridDefinition={props.data.map((row) => ({ colspan: row.colspan || 12 }))}
    >
      {props.data.map((row, index) => (
        <FormField
          label={row.label}
          description={row.description}
          stretch
          errorText={props.errors[row.field]}
          constraintText={props.errors[row.field] ? undefined : ' '}
        >
          <FormComponent
            index={index}
            row={row}
            onChange={({ detail }) => setRow(index, detail)}
            error={props.errors[row.field]}
          />
        </FormField>
      ))}
    </Grid>
  );
}
