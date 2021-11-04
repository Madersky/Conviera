const Contacts = ({ contacts }) => {
  let activeContacts = contacts.slice(0, 3).map((contact) => {
    return (
      <div key={contact.email} className="contacts__instance">
        <img src="https://meetbe-images.s3.eu-central-1.amazonaws.com/profilePhotos/profile.jpg" />
        <h3 className="contacts__instance-name">
          {contact.firstname} {contact.lastname}
        </h3>
      </div>
    );
  });

  return (
    <div className="contacts">
      <h2 className="contacts__header">Contacts</h2>
      {activeContacts}
      {contacts.length - activeContacts.length != 0 ? (
        <p>{contacts.length - activeContacts.length} more</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Contacts;
