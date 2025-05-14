import { User } from '@/models/user';
import { Button, Container, Form, FormField, Input, SpaceBetween } from '@cloudscape-design/components';
import { useEffect, useState } from 'react';

const newUser = {
  title: '',
  body: '',
};

const defaultErrorState = {
  title: false,
  body: false,
};

interface Props {
  user?: User;
  isLoading?: boolean;
  onSubmit: (user: User) => void;
  onCancel?: () => void;
}

export default function UserFrom(props: Props) {
  const [user, setUser] = useState<User>(props.user || (newUser as User));
  const [errors, setErrors] = useState(defaultErrorState);

  // обнуляем форму при закрытии или применяем новые данные для формы
  useEffect(() => {
    setUser(props.user || (newUser as User));
    setErrors(defaultErrorState);
  }, [props.user]);

  const change = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
    setErrors({ ...errors, [field]: false });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(user);
      }}
    >
      <Form
        actions={
          <SpaceBetween
            direction="horizontal"
            size="xs"
          >
            {props.onCancel && (
              <Button
                onClick={props.onCancel}
                loading={props.isLoading}
                formAction="none"
                variant="link"
              >
                Отмена
              </Button>
            )}
            <Button
              variant="primary"
              loading={props.isLoading}
            >
              Сохранить
            </Button>
          </SpaceBetween>
        }
      >
        <Container>
          <SpaceBetween
            direction="vertical"
            size="l"
          >
            <FormField label="Title">
              <Input
                value={user.title}
                onChange={({ detail }) => change('title', detail.value)}
                onBlur={() => setErrors({ ...errors, title: !user.title })}
                type="text"
                invalid={errors.title}
                placeholder="Title"
                disabled={props.isLoading}
              />
            </FormField>
            <FormField label="Body">
              <Input
                value={user.body}
                onChange={({ detail }) => change('body', detail.value)}
                onBlur={() => setErrors({ ...errors, body: !user.body })}
                type="text"
                invalid={errors.body}
                placeholder="Body"
                disabled={props.isLoading}
              />
            </FormField>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
}
