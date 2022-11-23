import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../Axios";
import Button from "@material-ui/core/Button";
import { Add, Save } from "@material-ui/icons";
import { text } from "../Components/Card";
import { response ,loginStatus} from "./Nav";
import "../Styles/Editor.css";
const Editor = (props) => {
  const [userId , setUserId] = useState(null);
  const history = useHistory();
  const [usernotes, setUserNotes] = useState(text);
  useEffect(() => {
    if(loginStatus){
      setUserId (response.googleId);
    }
    if (localStorage.getItem("userNotes"))
      setUserNotes(localStorage.getItem("userNotes"));
  }, []);
  
  const handleChange = (e) => {
    setUserNotes(e.target.value);
  };

  const handleSave = () => {
    if (usernotes !== "") {
      localStorage.setItem("userNotes", usernotes);
    }
  };

  const handleClear = () => {
    setUserNotes("");
    localStorage.removeItem("userNotes");
  };
  const handleAdd = () => {
    if (usernotes !== "" && userId != null) {
      api
        .post("/Add", {
          content: usernotes ,
          u_id : userId
        })
        .then((res) => {
          if (res.status === 201) {
            setUserNotes("");
            history.push("/");
            localStorage.removeItem("userNotes");
          }
        })
        .catch((err) => {
          alert('error please try again')
        });
    }
    else if(!loginStatus){
      alert("login to add to you notes")
    }
  };
  return (
    <div className="Editor">
      <div className="editorWrap">
        <div className="warea">
          <textarea
            name="content"
            id="notewrite"
            placeholder="Enter the text..."
            value={usernotes}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="btnbar">
          <div className="flexer">
            <Button color="secondary" variant="contained" onClick={handleClear}>
              Clear
            </Button>
            <Button
              color="primary"
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              color="primary"
              variant="contained"
              startIcon={<Add />}
              onClick={handleAdd}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
