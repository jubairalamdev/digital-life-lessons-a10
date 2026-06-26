"use server"

export const serverFetch = async (apiUrl) => {
    try {
        const res = await fetch(apiUrl)
        if (!res.ok) {
            // console.log("Error fetching data from server: ", res.statusText)
        }
        const data = await res.json()
        return data;
    }
    catch (error) {
        console.log("Error fetching data from server: ", error)
    }
}

export const serverFetchById = async (apiUrl, id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${apiUrl}/${id}`);

        if (!res.ok) {
            console.error("Error fetching data from server: ", res.statusText);
            return null;
        }

        const data = await res.json();
        return data;
    } catch (error) {
        // console.error("Error fetching data from server: ", error);
        // return null;
    }
};

export const getUserById = async (userId) => {
    const res = await serverFetchById(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, userId);
    return await res
}


export const getAllLessons = async () => {
    const res = await serverFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/lessons`);
    // console.log("all lessons =======>" ,res)
    return res;
}

export const getLessonById = async (lessonId) => {
    const res = await serverFetchById('/api/lessons', lessonId);
    return res;
}


export const serverMutation = async (apiUrl, clientData, options = 'POST') => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

    // Ensure the apiUrl starts with a leading slash cleanly
    const cleanApiUrl = apiUrl.startsWith('/') ? apiUrl : `/${apiUrl}`;
    // console.log(`${baseUrl}${cleanApiUrl}`)
    const res = await fetch(`${baseUrl}${cleanApiUrl}`, {
        method: options,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(clientData)
    });

    if (!res.ok) {
        // console.error("Mutation failed status code:", res.status);
        return null;
    }

    const data = await res.json();
    // console.log(data);
    return data;
};

import { revalidatePath } from 'next/cache';

export async function updateDataAndRevalidate(path) {
  revalidatePath(path); 
}
