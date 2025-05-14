import { useLogin } from '@/remote/login';
import { Button, Container, Form, FormField, Input, SpaceBetween } from '@cloudscape-design/components';
import routing from '@routing';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

const loginValidate = (login: string) => !!login && login.length > 0;
const passwordValidate = (password: string) => !!password && password.length > 0;

interface LoginErrors {
  login?: boolean;
  password?: boolean;
  otp?: boolean;
  invalidPair?: boolean;
}

export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});

  const { trigger, isMutating: isLoading } = useLogin();
  const disabled = errors.login || errors.password || errors.otp || !login || !password || !otp;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (disabled) {
      return;
    }

    const result = await trigger({
      login,
      password,
      otp,
    });

    if (result) {
      navigate(routing.home, { replace: true });
    } else {
      setErrors({ invalidPair: true });
    }
  };

  return (
    <form
      id="login-form"
      onSubmit={onSubmit}
      style={{
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '648px',
        margin: '24px auto',
      }}
    >
      <Form
        errorIconAriaLabel="Login"
        errorText={errors?.invalidPair ? 'Invalid login and password pair' : undefined}
        actions={
          <SpaceBetween
            direction="horizontal"
            size="xs"
          >
            <Button
              variant="primary"
              loading={isLoading}
              disabled={disabled}
            >
              Login
            </Button>
          </SpaceBetween>
        }
      >
        <Container>
          <SpaceBetween
            direction="vertical"
            size="l"
          >
            <FormField
              label="Login"
              stretch
            >
              <Input
                value={login}
                onChange={({ detail }) => setLogin(detail.value)}
                onBlur={() =>
                  setErrors({
                    ...errors,
                    login: !loginValidate(login),
                  })
                }
                type="text"
                invalid={errors.login}
                disabled={isLoading}
                autoFocus
              />
            </FormField>
            <FormField
              label="Password"
              stretch
            >
              <Input
                value={password}
                onChange={({ detail }) => setPassword(detail.value)}
                onBlur={() =>
                  setErrors({
                    ...errors,
                    password: !passwordValidate(password),
                  })
                }
                type="password"
                invalid={errors.password}
                disabled={isLoading}
              />
            </FormField>
            <FormField
              label="OTP"
              stretch
            >
              <Input
                value={otp}
                onChange={({ detail }) => {
                  if (detail.value.length > 6) {
                    return;
                  }
                  setOtp(detail.value);
                }}
                onBlur={() =>
                  setErrors({
                    ...errors,
                    otp: otp.length !== 6,
                  })
                }
                type="number"
                invalid={errors.otp}
                disabled={isLoading}
              />
            </FormField>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
}
