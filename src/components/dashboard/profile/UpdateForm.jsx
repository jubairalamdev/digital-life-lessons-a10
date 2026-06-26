"use client";

import { Button, Input } from "@heroui/react";
import { serverMutation } from "@/lib/actions/common"; // Ensure this action is explicitly imported

const UpdateForm = ({ user }) => {
    
    const updateUser = async (formData) => {
        // Correctly read the structured object entries from the instance
        const newUser = Object.fromEntries(formData.entries());
        console.log("Submitting new user payload:", newUser);
        
        const resData = await serverMutation(`/api/users/${user._id}`, newUser, "PATCH");
        
        // Refresh the Server Component router tree state context safely if necessary
        window.location.reload();
        return resData;
    }

    return (
        <form 
            className="space-y-4" 
            onSubmit={(e) => {
                e.preventDefault();
                // Instantiate the structural FormData object using the submission target directly
                const formDataInstance = new FormData(e.currentTarget);
                updateUser(formDataInstance);
            }}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-[11px] text-zinc-400 font-medium mb-1.5 block">Display Name</label>
                    <Input
                        size="sm"
                        type="text"
                        placeholder="Enter structural name"
                        defaultValue={user?.name}
                        name="name"
                        className="bg-zinc-950 text-white rounded-xl border border-zinc-800 focus:border-zinc-700 outline-none"
                    />
                </div>
                <div>
                    <label className="text-[11px] text-zinc-400 font-medium mb-1.5 block">Photo Avatar URL</label>
                    <Input
                        size="sm"
                        type="text"
                        placeholder="https://image-link.com"
                        defaultValue={user?.image}
                        name="image"
                        className="bg-zinc-950 text-white rounded-xl border border-zinc-800 focus:border-zinc-700 outline-none"
                    />
                </div>
            </div>

            <Button
                type="submit"
                size="sm"
                className="bg-green-500 hover:bg-green-400 text-zinc-950 font-bold px-4 rounded-xl text-xs h-9 transition-all shadow-lg shadow-green-500/5"
            >
                Save Changes
            </Button>
        </form>
    );
};

export default UpdateForm;