import Link from "next/link";

const Conferences = ({ conferences, currentUser }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return conferences.map((conference) => {
    const conferenceStartDate = new Date(
      Date.parse(conference.conferenceStartDate)
    ).toLocaleDateString("en-EN", options);

    return (
      <div key={conference._id} className="conference-instance">
        <div className="conference-instance__basic-info">
          <div className="conference-instance__basic-info-group">
            <i className="bx bx-calendar-event"></i>
            <p>{conferenceStartDate}</p>
          </div>
          <div className="conference-instance__basic-info-group">
            <i className="bx bx-map"></i>
            <p>{conference.mode}</p>
          </div>
          <div className="conference-instance__basic-info-group">
            <i className="bx bxs-graduation"></i>
            <p>{conference.discipline}</p>
          </div>
        </div>
        <Link href={`/conferences/${conference._id}`}>
          <h2 className="conference-instance__name">{conference.name}</h2>
        </Link>

        <p className="conference-instance__description">
          {conference.description}
        </p>
        <p className="conference-instance__organizers">
          {conference.organizers}
        </p>
      </div>
    );
  });
};
export default Conferences;
