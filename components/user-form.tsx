'use client';

import { userQueryKey } from '@/hooks/use-users-query';
import useInsertUserMutation from '@/hooks/user-insert-user-mutation';
import queryClient from '@/utils/queryClient';
import React, { useState } from 'react';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const insertUserMutation = useInsertUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    insertUserMutation.mutate(
      { name, email },
      {
        onSettled: () => {
          setName('');
          setEmail('');
        },
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: userQueryKey,
          });
        },
      }
    );
  };

  return (
    <div className='bg-gray-300 p-8 pt-4 rounded shadow-md max-w-2xl w-full'>
      <h2 className='text-2xl font-semibold mb-4'>Submit Form</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex space-x-4 items-end'>
          <div className='w-1/2'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 p-2 w-full border rounded-md'
              required
            />
          </div>

          <div className='w-1/2'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 p-2 w-full border rounded-md'
              required
            />
          </div>
          <div className='w-1/4'>
            <button
              type='submit'
              className='w-full block align-bottom bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
