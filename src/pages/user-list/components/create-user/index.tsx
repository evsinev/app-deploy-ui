import UserFrom from '@/components/user-from';
import useSystemMessage from '@/hooks/use-system-message';
import { User } from '@/models/user';
import { useUserCreate, useUserList } from '@/remote/user';
import { Modal } from '@cloudscape-design/components';
import { useState } from 'react';
import CreateButton from './components/create-button';

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
