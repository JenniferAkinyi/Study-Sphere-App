import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdMail, MdFolderShared } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import CreateGroup from "./Components/CreateGroup";
import ConfirmModal from "./Components/ConfirmModal";
import { fetchInvites, acceptInvite, declineInvite } from "../../services/api";
import AllGroups from "./Components/AllGroups";

const StudyScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [invites, setInvites] = useState([]);
  const [groups, setGroups] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedInvite, setSelectedInvite] = useState(null);

  useEffect(() => {
    const getInvites = async () => {
      try {
        const data = await fetchInvites();
        setInvites(data.details);
      } catch (error) {
        console.log(error);
      }
    };
    getInvites();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">My Groups</h1>
          <p className="text-xs font-semibold text-gray-500">
            Collaborate, share resources and study together with your academic
            peers
          </p>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-xl hover:bg-indigo-600"
        >
          <FaPlus />
          Create New Group
        </button>
      </div>
      {invites.length >= 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <MdMail className="text-indigo-500" />
            <h1 className="text-base font-bold">Pending Invites</h1>
            {invites.length > 0 && (
              <p className="p-1 text-xs font-semibold text-orange-600 bg-orange-200 rounded-lg">
                {invites.length} New
              </p>
            )}
          </div>
          <div className="mt-4 space-y-3">
            {invites.length === 0 ? (
              <div className="p-4 text-sm text-gray-500 border rounded-xl bg-gray-50">
                No pending invites
              </div>
            ) : (
              <div>
                {invites.map((invite) => (
                  <div
                    key={invite.id}
                    className="flex items-center justify-between p-4 bg-indigo-100 border rounded-xl"
                  >
                    <div>
                      <h2 className="font-semibold">{invite.group.name}</h2>
                      <p className="text-sm text-gray-500">
                        {invite.group.topic}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedInvite(invite);
                          setConfirmOpen(true);
                        }}
                        className="px-3 py-1 text-sm bg-gray-200 rounded-lg"
                      >
                        Decline
                      </button>
                      <button
                        onClick={async () => {
                          const res = await acceptInvite(invite.id);
                          setInvites((prev) =>
                            prev.filter((i) => i.id !== invite.id),
                          );
                          setGroups((prev) => [res.details.group, ...prev]);
                        }}
                        className="px-3 py-1 text-sm text-white bg-indigo-500 rounded-lg"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <MdFolderShared className="text-indigo-500" />
                <h1 className="text-base font-bold">Joined Groups</h1> 
              </div>
              <button className="flex items-center gap-2 px-3 py-1 font-semibold text-white bg-indigo-500 border rounded-xl">View all Groups<IoIosArrowForward className="font-semibold"/></button>
            </div>
            <AllGroups />
          </div>
        </div>
      )}
      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setOpenModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CreateGroup closeModal={() => setOpenModal(false)} />
          </div>
        </div>
      )}
      <ConfirmModal
        isOpen={confirmOpen}
        title="Decline Invite"
        message="Are you sure you want to decline this invite?"
        onClose={() => {
          setConfirmOpen(false);
          setSelectedInvite(null);
        }}
        onConfirm={async () => {
          if (!selectedInvite) return;

          await declineInvite(selectedInvite.id);

          setInvites((prev) => prev.filter((i) => i.id !== selectedInvite.id));

          setConfirmOpen(false);
          setSelectedInvite(null);
        }}
      />
    </div>
  );
};

export default StudyScreen;
