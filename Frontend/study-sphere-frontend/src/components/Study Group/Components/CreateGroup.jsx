import React, { useState, useRef } from "react";
import { BiWorld } from "react-icons/bi";
import { GiPadlock } from "react-icons/gi";
import { createGroup, searchUsers } from "../../../services/api";
import { useNavigate } from "react-router-dom";

const CreateGroup = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("PUBLIC");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const timeoutRef = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const subjects = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Economics",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const groupData = {
      name,
      topic,
      description,
      privacy,
      members: selectedMembers.map((m) => m.id),
    };
    try {
      await createGroup(groupData);
      closeModal();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create group");
    }
  };

  const addMember = (user) => {
    if (selectedMembers.find((m) => m.id === user.id)) return;
    setSelectedMembers([...selectedMembers, user]);
    setResults([]);
    setSearch("");
  };
  const removeMember = (id) => {
    setSelectedMembers(selectedMembers.filter((member) => member.id !== id));
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    console.log("Searching for:", value)
    timeoutRef.current = setTimeout(async () => {
      try {
        const users = await searchUsers(value);
        console.log("Search API returned:", users);
        setResults(users.details || []);
      } catch (error) {
        console.error("Search failed", error);
      }
    }, 300);
  };
  return (
    <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
      <button
        onClick={closeModal}
        className="absolute text-gray-500 top-3 right-3 hover:text-gray-800"
      >
        ✕
      </button>
      <h3 className="mb-4 text-2xl font-bold">Create New Group</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Group Name
          </label>
          <input
            type="text"
            placeholder="e.g. Advanced Quantum Mechanics"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Topic / Subject
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell potential members what this group is about..."
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Privacy Settings
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setPrivacy("PUBLIC")}
              className={`p-4 border rounded-lg cursor-pointer
              ${
                privacy === "PUBLIC"
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-500"
              }`}
            >
              <h4 className="flex items-center gap-2 font-semibold">
                <BiWorld /> Public
              </h4>
              <p className="text-xs text-gray-500">
                Anyone can discover and join
              </p>
            </div>
            <div
              onClick={() => setPrivacy("PRIVATE")}
              className={`p-4 border rounded-lg cursor-pointer
              ${
                privacy === "PRIVATE"
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-500"
              }`}
            >
              <h4 className="flex items-center gap-2 font-semibold">
                <GiPadlock /> Private
              </h4>
              <p className="text-xs text-gray-500">
                Only invited members can join
              </p>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Invite Members
          </label>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="@Email or username"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-100 rounded-full"
            >
              {member.name}
              <button
                type="button"
                onClick={() => removeMember(member.id)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        {results.length > 0 && (
          <div className="mt-2 bg-white border rounded-md shadow">
            {results
              .filter((user) => !selectedMembers.find((m) => m.id === user.id))
              .map((user) => (
                <div
                  key={user.id}
                  onClick={() => addMember(user)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {user.name} ({user.email})
                </div>
              ))}
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Create Group
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
