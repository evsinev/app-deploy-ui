import routing from '@routing';
import { BreadcrumbGroup, Button, Container, SpaceBetween, Table, TableProps } from '@cloudscape-design/components';
import { useState } from 'react';
import { NonCancelableEventHandler } from '@cloudscape-design/components/internal/events';
import { useUserList } from '@/remote/user';
import { User } from '@/models/user';
import CreateUser from '@/pages/user-list/components/create-user';
import ColumnDisplayProperties = TableProps.ColumnDisplayProperties;
import { compare } from '@/libs/sorting';
import Link from '@/components/link';

const columns: ReadonlyArray<ColumnDisplayProperties> = [
  {
    id: 'userId',
    visible: true,
  },
  {
    id: 'id',
    visible: true,
  },
  {
    id: 'title',
    visible: true,
  },
  {
    id: 'body',
    visible: true,
  },
];

const columnDefinitions: ReadonlyArray<TableProps.ColumnDefinition<User>> = [
  {
    id: 'userId',
    header: 'userId',
    cell: (user) => user.userId,
    sortingField: 'userId',
    isRowHeader: true,
  },
  {
    id: 'id',
    header: 'id',
    cell: (user) => user.id,
    sortingField: 'id',
    isRowHeader: true,
  },
  {
    id: 'title',
    header: 'title',
    cell: (user) => <Link href={routing.user.replace(':id', user.id.toString())}>{user.title}</Link>,
    sortingField: 'title',
    isRowHeader: true,
  },
  {
    id: 'body',
    header: 'body',
    cell: (user) => user.body,
    sortingField: 'body',
    isRowHeader: true,
  },
];

export default function UserList() {
  const { data } = useUserList();
  const [sortingField, setSortingField] = useState<string>('userId');
  const [sortingDescending, setSortingDescending] = useState<boolean>(true);

  const rows = data?.map((row) => ({ ...row })) || [];
  const sortingRows = rows.sort((a, b) => compare({
    field: sortingField,
    isDesc: sortingDescending,
    a,
    b,
  }));

  const changeSorting: NonCancelableEventHandler<TableProps.SortingState<User>> = ({ detail }) => {
    const { sortingColumn, isDescending } = detail;
    if (sortingColumn.sortingField) {
      setSortingField(sortingColumn.sortingField);
      setSortingDescending(!!isDescending);
    }
  };

  return (
    <>
      <Container variant="stacked">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          // простите за это, но на этом ui фреймворке это наиболее безболезненно.
        }}
        >
          <BreadcrumbGroup
            items={[
              {
                text: 'Users',
                href: '',
              },
            ]}
            ariaLabel="Breadcrumbs"
          /> <SpaceBetween direction="horizontal" size="s"> <Button>View details</Button> <Button>Edit</Button> <Button>Delete</Button> </SpaceBetween>
        </div>

      </Container>

      <Table
        columnDefinitions={columnDefinitions}
        columnDisplay={columns}
        items={sortingRows}
        stripedRows
        variant="stacked"
        sortingColumn={{ sortingField }}
        sortingDescending={sortingDescending}
        onSortingChange={changeSorting}
      />

      <CreateUser />
    </>
  );
}
