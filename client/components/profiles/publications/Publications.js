const Publications = ({ publications }) => {
  let activePublications = publications.slice(0, 3).map((publication) => {
    return (
      <div key={publication.doi} className="publications__instance">
        <h3 className="publications__instance-title">{publication.title}</h3>
        <p>{publication.time}</p>
        <p className="publications__instance-doi">{publication.doi}</p>
        <p>{publication.description}</p>
      </div>
    );
  });

  return (
    <div className="publications">
      <h2 className="publications__header">Publications</h2>
      {activePublications}
      {publications.length - activePublications.length != 0 ? (
        <p>{publications.length - activePublications.length} more</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Publications;
