import React, { useState, useEffct } from "react";
import Link from "next/link";

import useRequest from "../../hooks/use-request";
import Conferences from "../../components/conferences/Conferences";

const Dashboard = ({ conferences, currentUser }) => {
  const [currentConferences, setCurrentConferences] = useState(conferences);
  const [chosenDiscipline, setChosenDiscipline] = useState("");

  const [searchConferencesRequest, searchConferencesError] = useRequest({
    url: `/api/conferences/${chosenDiscipline}`,
    method: "get",
    params: {
      discipline: chosenDiscipline,
    },
    onSuccess: (res) => {
      setCurrentConferences(res.conferences);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    searchConferencesRequest();
  };

  return (
    <div className="conferences-list">
      <div className="conferences-list__dashboard">
        <div className="conferences-list__dashboard--left">
          <div className="conferences-list__searcher">
            <form onSubmit={handleFormSubmit}>
              <select
                value={chosenDiscipline}
                onChange={(e) => setChosenDiscipline(e.target.value)}
              >
                <option>All disciplines</option>
                <optgroup label="IT">
                  <option>IT Engineering</option>
                  <option>Software Development</option>
                  <option>Software Architecture</option>
                </optgroup>
                <optgroup label="Biology">
                  <option>Kardiology</option>
                  <option>Pharmacy</option>
                  <option>Dentistry</option>
                </optgroup>
              </select>
              <button type="select">Find</button>
            </form>
          </div>
          {currentConferences != null || undefined || [] ? (
            <Conferences
              conferences={currentConferences}
              currentUser={currentUser}
            />
          ) : (
            ""
          )}
        </div>
        <div className="conferences-list__dashboard--right">
          <button>
            <Link href="/conferences/new">Create Conference</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

Dashboard.getInitialProps = async (context, client, currentUser) => {
  const conferencesRes = await client.get("/api/conferences");

  return {
    ...conferencesRes.data,
    currentUser,
  };
};

export default Dashboard;
