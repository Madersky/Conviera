import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import UseRequest from "../../hooks/use-request";

const FileUpload = ({ currentUser, conference }) => {
  const router = useRouter();
  const { conferenceId } = router.query;

  console.log(conferenceId);

  const [role, setRole] = useState("listener");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Choose file");
  const [fileUrl, setFileUrl] = useState(undefined);
  const isInitialMount = useRef(true);

  const [createApplicationRequest, createApplicationErrors] = UseRequest({
    url: `/api/applications`,
    method: "post",
    body: {
      conference: conference,
      user: currentUser,
      attachments: fileUrl,
      role: role,
      status: "awaiting:acceptance",
    },
    onSuccess: () => {
      console.log("Application created");
    },
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (currentUser && role === "listener") {
        setFile(undefined);
        createApplicationRequest();
        return;
      } else if (currentUser && role === "speaker") {
        try {
          if (!file) {
            throw new Error("there is no file to send");
          } else {
            createApplicationRequest();
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, [fileUrl]);

  const uploadFile = async () => {
    const response = await fetch("/api/applicationFileUpload", {
      method: "post",
      body: JSON.stringify({
        type: file.type,
        name: file.name,
        email: currentUser.email,
        conferenceId: conferenceId,
      }),
    });

    const { url } = await response.json();

    await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    setFileUrl(
      `https://meetbe-images.s3.eu-central-1.amazonaws.com/conferences/${conferenceId}/applications/${currentUser.email}/${file.name}`
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (role !== "listener") {
      uploadFile();
    } else {
      createApplicationRequest();
    }
  };

  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="">
      <div className="">
        {currentUser ? (
          <form onSubmit={onSubmit} className="">
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option>listener</option>
              <option>speaker</option>
            </select>
            {role === "speaker" ? (
              <div className="">
                <label>
                  {fileName}
                  <input
                    className=""
                    type="file"
                    name="photo"
                    accept=".doc,.docx,application/msword, application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={onChange}
                  />
                </label>
              </div>
            ) : (
              ""
            )}

            <button
              type="submit"
              style={
                role === "listener" || fileName !== "Choose file"
                  ? { display: "flex" }
                  : { display: "none" }
              }
            >
              Submit
            </button>
          </form>
        ) : (
          ""
        )}
        <p>{createApplicationErrors}</p>
      </div>
    </div>
  );
};

export default FileUpload;
