import { useEffect, useState } from "react";
import Layout from "../components/Layout";
const Add_Project = ({ version = {}, data = {}, authenticated = false }) => {
  const [ButtonAdd, SetButtonAddDisable] = useState(true);
  useEffect(() => {
    const c = localStorage.getItem("SaveScript");
    if (!c) {
      localStorage.setItem("SaveScript", JSON.stringify([]));
    }
  }, []);
  function NewProject() {
    const c = JSON.parse(localStorage.getItem("SaveScript") ?? "");
    if (c.length > 1) {
      SetButtonAddDisable(false);
    }
    const NewPr = [
      {
        NamaFile: "Untitle-" + (+c.length + 1),
        data: [],
      },
    ];
    const b = c.concat(NewPr);
    localStorage.setItem("SaveScript", JSON.stringify(b));
    console.log("c", c, NewPr, b);
  }
  return (
    <>
      <div>test local storage</div>
      {ButtonAdd && <div onClick={() => NewProject()}>New Project</div>}
    </>
  );
};
export default Add_Project;
