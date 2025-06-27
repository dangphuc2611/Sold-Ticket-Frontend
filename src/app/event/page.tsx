'use client';

import React, { useState, useEffect } from 'react';
interface EventItem {
    id: number;
    documentId: string;
    eventName: string;
    eventDate: string;
}

export default function EventPage() {
    const [newId, setNewId] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [updateDocId, setUpdateDocId] = useState('');
    const [updateDescription, setUpdateDescription] = useState('')
    const [event, setEvent] = useState<EventItem[]>([]);
    const fetchData = async () => {
        const res = await fetch('http://localhost:1337/api/events');
        const json = await res.json();
        setEvent(json.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async () => {
        const res = await fetch('http://localhost:1337/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
        const res = await fetch(`http://localhost:1337/api/events/${deleteId}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            alert('Delete successfully!');
            setDeleteId('');
            fetchData();
        } else {
            alert('Delete failed!');
        }
    };

    const handleUpdate = async () => {
        const itemToUpdate = event.find(item => item.documentId === updateDocId.trim());

        if (!itemToUpdate) {
            alert('Can not find this document ID!');
            return;
        }
        const res = await fetch(`http://localhost:1337/api/events/${itemToUpdate.documentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    abc_description: updateDescription,
                },
            }),
        });

        if (res.ok) {
            alert('Update succcessfully!');
            setUpdateDocId('');
            setUpdateDescription('');
            fetchData();
        } else {
            alert('Update failed!');
        }
    }
    return (
        <div>
            <h1>Event Page</h1>
            <table className="mb-5 border border-black-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Document ID</th>
                        <th className="border px-4 py-2">Event Name</th>
                        <th className="border px-4 py-2">Event Date</th>
                    </tr>
                </thead>
                <tbody>
                    {event.map((event) => (
                        <tr key={event.id}>
                            <td className="border px-4 py-2 text-center">{event.id}</td>
                            <td className="border px-4 py-2 text-center">{event.documentId}</td>
                            <td className="border px-4 py-2 text-center">{event.eventName}</td>
                            <td className="border px-4 py-2">{event.eventDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form action="" onSubmit={(e) => e.preventDefault()}>

                <input className='border rounded-sm mb-5' placeholder='Enter event name' type="text" value={newId} onChange={(e) => setNewId(e.target.value)} />
                <input
                    className='border rounded-sm mb-5'
                    type="datetime-local"
                    // value={eventDate}
                    // onChange={(e) => setEventDate(e.target.value)}
                    required
                />
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
        </div>
    )
}