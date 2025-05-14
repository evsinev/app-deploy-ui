import DynamicForm, { DynamicFormData } from '@/components/dynamic-form';
import { useState } from 'react';

const defaultConfig: DynamicFormData = [
  {
    field: 'enabled',
    value: true,
    label: 'Enabled',
    description: 'Enabling rate limiting',
  },
  {
    field: 'capacity',
    value: 10,
    type: 'number',
    label: 'Capacity',
    description: 'How many tokens your bucket has',
    placeholder: 'Capacity',
    colspan: 6,
  },
  {
    field: 'string',
    value: 'Test string',
    label: 'String',
    description: 'String input test',
    colspan: 6,
  },
  {
    field: 'grid-1',
    value: 'Test grid',
    label: 'col 4',
    description: 'Grid test',
    colspan: 4,
  },
  {
    field: 'grid-2',
    value: 'Test grid',
    label: 'col 4',
    description: 'Grid test',
    colspan: 4,
  },
  {
    field: 'grid-3',
    value: 'Test grid',
    label: 'col 4',
    description: 'Grid test',
    colspan: 4,
  },
  {
    field: 'grid-4',
    value: 'Test grid',
    label: 'col 4',
    description: 'Stretch',
    colspan: 12,
  },
];

const defaultErrors: Record<string, string> = {
  capacity: 'some error text for capacity',
  'grid-4': 'some error text for grid 4',
  'grid-1': 'some error text for grid 1',
  'grid-3': 'some error text for grid 3',
};

export default function TestDynamicForm() {
  const [config, setConfig] = useState(defaultConfig);
  const [errors, setErrors] = useState(defaultErrors);

  return (
    <DynamicForm
      data={config}
      setData={setConfig}
      errors={errors}
      setErrors={setErrors}
    />
  );
}
