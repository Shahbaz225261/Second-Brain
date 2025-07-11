import { useEffect, useState } from "react";
import "../App.css";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcons";
import { ShareIcon } from "../icons/ShareIcons";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
// import { BACKEND_URL } from "../config";
import axios from "axios";

type ShareResponse = {
  Link: string;
};

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  
  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <div className="flex justify-end gap-4">
          <Button
            onClick={async () => {
              const response = await axios.post<ShareResponse>(
                `${BACKEND_URL}/api/v1/brain/share`,
                { share: true }, // <-- Body of the request
                {
                  headers: {
                    Authorization: localStorage.getItem("token") || "",
                  },
                }
              );

              //   alert(response.data.link); // or response.data.Link depending on your backend
              await navigator.clipboard.writeText(response.data.Link);
              alert("✅ Link copied to clipboard:\n" + response.data.Link);
            }}
            StartIcon={<ShareIcon />}
            varient="primary"
            text="Share Brain"
          />

          <Button
            onClick={() => setModalOpen(true)}
            StartIcon={<PlusIcon />}
            varient="secondary"
            text="Add Content"
          />
        </div>

        <div className="flex p-2 gap-2 flex-wrap">
          {contents?.map(({ _id, type, link, title }) => (
            <Card refresh={refresh} id={_id} key={link} type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
