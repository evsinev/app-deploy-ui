import { Button } from '@cloudscape-design/components';

export default function CreateButton(props: { onClick: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
      }}
    >
      <Button onClick={props.onClick}>Добавить пользователя</Button>
    </div>
  );
}
