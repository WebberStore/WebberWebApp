import { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { debounce, startCase } from 'lodash';
import { Button, NoRecords } from '../components/common';
import { default as Layout } from '../components/layout';
import { UserModal } from '../components/users';
import { getAllUsers } from '../services/user';

const Users = () => {
  const [userRes, setUserRes] = useState(null);

  const [showUserModal, setShowUserModal] = useState(false);

  const refresh = debounce(() => {
    getAllUsers().then((data) => {
      setUserRes(data);
    });
  }, 300);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Layout title="Users">
      <div class="w-screen min-h-screen flex flex-col justify-center items-center pt-6">
        {userRes && (
          <>
            <div class="w-11/12 flex justify-end items-center mb-6">
              <Button
                className="px-12 py-2 font-semibold md:text-lg focus:outline-none focus:ring focus:ring-offset-1 bg-primary-base focus:ring-black focus:ring-opacity-10"
                onClick={() => setShowUserModal(true)}
              >
                Add Admin User
              </Button>
            </div>
            <div class="w-11/12 min-h-screen flex flex-col justify-between items-center mb-16">
              <div class="w-full h-full flex flex-col justify-start items-center gap-y-6">
                {userRes?.length > 0 ? (
                  <Table striped={true} hoverable={true} class="w-full">
                    <Table.Head>
                      <Table.HeadCell>Username</Table.HeadCell>
                      <Table.HeadCell>Email</Table.HeadCell>
                      <Table.HeadCell>Mobile</Table.HeadCell>
                      <Table.HeadCell>Role</Table.HeadCell>
                    </Table.Head>
                    <Table.Body class="divide-y">
                      {userRes?.map((user) => {
                        return (
                          <Table.Row key={user.id} class="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell class="whitespace-nowrap font-medium text-gray-900 dark:text-white pl-6">{user.username ?? '--'}</Table.Cell>
                            <Table.Cell>{user.email ?? '--'}</Table.Cell>
                            <Table.Cell>{user.phoneNumber ?? '--'}</Table.Cell>
                            <Table.Cell>{startCase(user.role)}</Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                ) : (
                  <NoRecords text="No users found" className="mt-12" />
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <UserModal show={showUserModal} setShow={setShowUserModal} refresh={refresh} />
    </Layout>
  );
};

export default Users;
