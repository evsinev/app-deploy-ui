import { useState } from 'react';
import { Modal } from '@cloudscape-design/components';
import { User } from '@/models/user';
import CreateButton from './components/create-button';
import { useUserCreate, useUserList } from '@/remote/user';
import useSystemMessage from '@/hooks/use-system-message';
import UserFrom from '@/components/user-from';

export default function CreateUser() {
  const [open, setOpen] = useState(false);
  const { mutate: mutateUserList, isLoading: isListUpdate } = useUserList();
  const { trigger: create, isMutating: isCreating } = useUserCreate();
  const { message, showMessage } = useSystemMessage();
  const isLoading = isCreating || isListUpdate;

  const close = () => {
    setOpen(false);
  };

  const onSubmit = async (user: User) => {
    if (!user.title || !user.body) {
      return;
    }
    await create(user);
    await mutateUserList();
    close();
    showMessage({
      message: 'Пользователь успешно создан',
      severity: 'success',
    });
  };

  return (
    <>
      <CreateButton onClick={() => setOpen(true)} />

      <Modal
        visible={open}
        onDismiss={close}
        header="Создание пользователя"
      >
        <UserFrom
          onSubmit={onSubmit}
          onCancel={close}
          isLoading={isLoading}
        />
      </Modal>

      {message}
    </>
  );
}
