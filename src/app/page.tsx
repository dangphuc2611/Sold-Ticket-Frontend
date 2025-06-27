"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  username: string;
  email: string;
};
interface AbcItem {
  id: number;
  documentId: string;
  abc_id: string;
  abc_description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [abcs, setAbcs] = useState<AbcItem[]>([]);
  const [newId, setNewId] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [updateDocId, setUpdateDocId] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const router = useRouter();

  const fetchData = async () => {
    const res = await fetch('http://localhost:1337/api/abcs');
    const json = await res.json();
    setAbcs(json.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) return;

    fetch("http://localhost:1337/api/users/me", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, []);

  const handleCreate = async () => {
    const res = await fetch('http://localhost:1337/api/abcs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        data: {
          abc_id: newId,
          abc_description: newDescription,
        }
      })
    });

    if (res.ok) {
      alert('Created successfully!');
      setNewId('');
      setNewDescription('');
      fetchData();
    } else {
      alert('Error creating item!');
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:1337/api/abcs/${deleteId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.ok) {
      alert('Delete successful!');
      setDeleteId('');
      fetchData();
    } else {
      alert('Delete failed!');
    }
  };

  const handleUpdate = async () => {
    const itemToUpdate = abcs.find(item => item.documentId === updateDocId.trim());

    if (!itemToUpdate) {
      alert('Không tìm thấy bản ghi với Document ID này!');
      return;
    }

    const res = await fetch(`http://localhost:1337/api/abcs/${itemToUpdate.documentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        data: {
          abc_description: updateDescription,
        },
      }),
    });

    if (res.ok) {
      alert('Update successful!');
      setUpdateDocId('');
      setUpdateDescription('');
      fetchData();
    } else {
      alert('Update failed!');
    }
  };

  return (
    <div className='p-5'>
      <h1>
        User: {user ? user.username : ''}
      </h1>
      <table className="mb-5 border border-black-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Document ID</th>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {abcs.map((abc) => (
            <tr key={abc.id}>
              <td className="border px-4 py-2 text-center">{abc.documentId}</td>
              <td className="border px-4 py-2 text-center">{abc.abc_id}</td>
              <td className="border px-4 py-2">{abc.abc_description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <input className='border rounded-sm mb-5' placeholder='Enter new id to create' type="text" value={newId} onChange={(e) => setNewId(e.target.value)} />
        <input className='border rounded-sm mb-5 ml-5' placeholder='Enter description' type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        <button className='border rounded-sm ml-5' onClick={handleCreate}>Create</button>
        <br />
        <input className='border rounded-sm' placeholder='Enter document id to delete' type="text" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
        <button className='ml-5 border rounded-sm mb-5' onClick={handleDelete}>Delete</button>
        <br />
        <input
          className='border rounded-sm mt-5'
          placeholder='Document ID cần cập nhật'
          type="text"
          value={updateDocId}
          onChange={(e) => setUpdateDocId(e.target.value)}
        />
        <input
          className='border rounded-sm ml-5'
          placeholder='Description mới'
          type="text"
          value={updateDescription}
          onChange={(e) => setUpdateDescription(e.target.value)}
        />
        <button className='ml-5 border rounded-sm' onClick={handleUpdate}>Update</button>
      </form>
      <Link href="/login">
        Login
      </Link>
      <br />
      <Link href={"/user-info"}>
        User Info
      </Link>
    </div>
  );
}
