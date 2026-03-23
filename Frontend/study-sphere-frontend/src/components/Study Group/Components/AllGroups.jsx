import React, {useState, useEffect} from 'react'
import { fetchMyGroups } from '../../../services/api';
import GroupCard from '../../Dashboard/Components/GroupCard';

const AllGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const data = await fetchMyGroups();
        setGroups(data);
      } catch (error) {
        console.log(error);
      }
    };

    getGroups();
  }, []);

  return (
    <>
   <div className="flex flex-row gap-4 mt-3 px-7">
         {groups.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500 px-7">
            No groups joined yet
          </p>
        ) : (
          groups.map((group) => <GroupCard key={group.id} group={group} />)
        )}
      </div>
    </>
  );
};

export default AllGroups