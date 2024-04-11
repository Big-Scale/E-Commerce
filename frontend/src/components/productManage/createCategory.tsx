import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CATEGORY_MUTATION } from '../../graphql/mutations';
import { GET_CATEGORIES_QUERY } from '../../graphql/queries';

// Assuming these types align with your schema
interface CreateCategoryInput {
  name: string;
  description: string;
}

const CreateCategory: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  // const [image, setImage] = useState<File | null>(null);

  // const [createCategory, {data, loading, error }] = useMutation(CREATE_CATEGORY_MUTATION, {
  //   onCompleted: () => {
  //     // Handle completion (e.g., clear form, show success message)
  //   },
  //   onError: (error) => {
  //     // Handle error (e.g., show error message)
  //     console.error("Error creating user profile:", error.message);
  //   }
  // });
  const [createCategory, {data, loading, error }] = useMutation(CREATE_CATEGORY_MUTATION, {
    refetchQueries: [
      { query: GET_CATEGORIES_QUERY }, // The query you want to refetch
    ],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!image) return; // Ensure an image is selected

    const input: CreateCategoryInput = { name, description };
    await createCategory({
      variables: {
        input: {
          name: input.name,
          description: input.description,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        placeholder="Profile Name"
        type="text"
      />
      <input
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
        placeholder="Description"
        type="text"
      />
      
      <input
        type="file"
        accept="image/*"
        // onChange={(e: ChangeEvent<HTMLInputElement>) => 
        //   setImage(e.target.files ? e.target.files[0] : null)}
      />
      <button type="submit" disabled={loading}>Create User Profile</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default CreateCategory;
