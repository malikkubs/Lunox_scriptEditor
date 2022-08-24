import { Anchor, Button, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
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

    const NewPr = [
      {
        NamaFile: "Untitle-" + (+c.length + 1),
        slug: "project-" + (+c.length + 1),
        data: [
          {
            id: 1,
            type: "scene",
            text: "",
          },
        ],
      },
    ];
    const b = c.concat(NewPr);
    localStorage.setItem("SaveScript", JSON.stringify(b));
    window.location.href = "/demo/" + btoa("project-" + (+c.length + 1));
    console.log("c", c, NewPr, b);
  }

  const [ListProject, SetListProject] = useState<any[]>([]);
  useEffect(() => {
    const c = JSON.parse(localStorage.getItem("SaveScript") ?? "");
    SetListProject(c);
  }, []);
  return (
    <>
      <Helmet title="Lunox">
        <title>Lunox</title>
      </Helmet>
      <nav className="bg-purple-300 w-full px-4 py-3 mx-auto flex flex-row justify-between items-center">
        {/* // filled button with red color */}
        <div className="w-full flex flex-row justify-center items-center mx-auto relative ">
          <p className="text-3xl font-bold">Script Editor</p>
          <div className="absolute right-4 lg:right-7 ">
            <img
              className="lg:hidden flex"
              width={30}
              height={30}
              src="/images/icon_setting.svg"
            />
            <Button
              onClick={() => {}}
              variant="outline"
              className="lg:flex hidden"
            >
              Setting
            </Button>
          </div>
        </div>
        {/* // outline button with theme.primaryColor color */}
      </nav>
      <Layout version={version}>
        <div className="py-6 text-3xl text-center lg:text-left font-bold">
          Start a new document
        </div>
        <div className="w-full pb-5 justify-center lg:justify-end">
          <div className="flex w-full flex-row flex-wrap items-center lg:items-start m-0 lg:-m-8">
            {ListProject.length < 3 && (
              <div
                className="w-full lg:w-1/4 h-80 bg-red p-9 flex flex-col rounded-lg m-3 lg:m-8 justify-center items-center cursor-pointer"
                onClick={() => {
                  NewProject();
                  console.log("jalan");
                }}
              >
                <div className="w-40 h-40 bg-blue-50 rounded-xl font-bold text-xl flex flex-col items-center justify-center">
                  <div>
                    <img width={100} height={100} src="/images/icons_add.svg" />
                  </div>
                </div>
                <p className="font-bold text-xl py-3">New Project</p>
              </div>
            )}
            {ListProject.map((a: any, i: any) => (
              <>
                <a
                  href={"/demo/" + btoa(a.slug)}
                  className="w-full lg:w-1/4 h-80 bg-red p-9 flex flex-col rounded-lg justify-center m-3 lg:m-8 items-center"
                >
                  <div className="w-40 h-40 bg-blue-50 rounded-xl flex flex-col items-center justify-center">
                    <div>
                      <img
                        width={100}
                        height={100}
                        src="/images/icon_file.svg"
                      />
                    </div>
                  </div>
                  <p className="text-xl py-3">{a.NamaFile}</p>
                </a>
              </>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Add_Project;
