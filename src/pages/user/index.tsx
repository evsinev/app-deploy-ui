import UserFrom from '@/components/user-from';
import { env } from '@/models/env';
import { User } from '@/models/user';
import { useUser, useUserDelete, useUserList, useUserUpdate } from '@/remote/user';
import { BreadcrumbGroup, Button, Container, Header, SpaceBetween } from '@cloudscape-design/components';
import routing from '@routing';
import { useNavigate } from 'react-router';

export default function UserPage() {
  const navigate = useNavigate();
  const { mutate: mutateUserList } = useUserList();
  const { data: user, mutate: mutateUser, isLoading: isUserLoading } = useUser();
  const { trigger: update, isMutating: isUpdating } = useUserUpdate();
  const { trigger: deleteUser, isMutating: isDeleting } = useUserDelete();

  const isLoading = isUpdating || isDeleting || isUserLoading;
  const onSubmit = async (formData: User) => {
    await update(formData);
    mutateUser();
    mutateUserList();
    navigate(routing.home, { replace: true });
  };

  const onDelete = async () => {
    await deleteUser();
    mutateUserList();
    navigate(routing.home, { replace: true });
  };

  return (
    <>
      <Container>
        <BreadcrumbGroup
          items={[
            { text: 'Users', href: env.PUBLIC_BASE_PATH + routing.home },
            { text: user?.title || '', href: '' },
          ]}
          ariaLabel="Breadcrumbs"
        />
        <Header>
          <SpaceBetween
            size="xxl"
            direction="horizontal"
          >
            <div>Пользователь {user?.title}</div>
            <Button
              onClick={onDelete}
              loading={isLoading}
            >
              Удалить
            </Button>
          </SpaceBetween>
        </Header>
      </Container>

      <div style={{ padding: '16px' }} />

      <UserFrom
        user={user}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </>
  );
}
