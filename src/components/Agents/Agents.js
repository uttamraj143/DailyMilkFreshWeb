import { useState, useContext } from "react";
import AgentsListing from "components/Agents/AgentsListing";
import AddAgent from "components/Agents/AddAgent";
import Spinner from "components/common/Spinner";
import { ReactComponent as UsersIcon } from "svgs/userBadge.svg";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

// import MiniNavbar from 'components/common/MiniNavbar';
import "./Agents.scss";
import { listUsers } from "store/user";
import UserContext from "UserContext";
import { useQuery } from "react-query";

export default function Agents() {
  const userInfo = useContext(UserContext);
  const [agents, setAgents] = useState([]);
  const [addagenttoggle, toggleAddAgent] = useState(false);
  const [spinner, toggleSpinner] = useState(true);
  const [page] = useState(1);

  const { refetch } = useQuery([2, userInfo.access_token], listUsers, {
    onSuccess: (data) => {
      data?.data && setAgents(data.data.data);
      toggleSpinner(false);
    },
    onError: (error) => {
      if (error && error.response && error.response.status === 401) {
        toggleSpinner(true);
        userInfo.refreshAccessToken();
      }
    },
  });

  const addAgentClicked = (e) => {
    e && e.preventDefault();
    toggleAddAgent(!addagenttoggle);
    if (addagenttoggle === true) refetch();
  };

  return (
    <div className="main-container">
      <div className="Orders__main-heading">
        <div className="General-main-heading">
          <UsersIcon /> {"  "} Agents
        </div>
        <div>
          <button
            className="Users__refresh-button"
            onClick={(e) => addAgentClicked(e)}
          >
            {addagenttoggle ? "Cancel Adding" : "Add new Agent"}
          </button>
        </div>
      </div>

      {!spinner ? (
        <div>
          {addagenttoggle ? (
            <AddAgent
              addAgentClicked={addAgentClicked}
              access_token={userInfo.access_token}
            ></AddAgent>
          ) : (
            <>
              <AgentsListing agents={agents}></AgentsListing>

              <div className="Orders__pagination">
                <Stack spacing={2}>
                  <Pagination
                    // onChange={(event, val) => modifyOrders(event, val)}
                    variant="outlined"
                    color="primary"
                    boundaryCount={2}
                    count={
                      agents.length % 6 === 0
                        ? agents.length / 6
                        : Math.floor(agents.length / 6) + 1
                    }
                    page={page}
                  />
                </Stack>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="Agents__spinners">
          <Spinner />
          <Skeleton animation="wave" height={100} width="80%" />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={210}
            height={118}
          />

          {/* <img height="150px" width="150px" src={Spinner} alt="Daily"></img> */}
        </div>
      )}
    </div>
  );
}
