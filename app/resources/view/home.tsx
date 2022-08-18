import HomeCard from "../components/HomeCard";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import "./index.css";

import { Button, Input, MultiSelect, Textarea } from "@mantine/core";
import Layout from "../components/Layout";
const Home = ({ version = {}, data = {}, authenticated = false }) => {
  const [textJson, setTextJson] = useState([
    {
      id: 1,
      type: "scene",
      text: "",
    },
  ]);
  console.log("cek", textJson);

  function UpdateJson(e: any, type: any, i: any) {
    console.log(e.target.name, e.target.value, "cek", e);
    setTextJson((old) =>
      old.map((dat, i) => {
        if (e.target.name === dat.id.toString()) {
          ("jalan");
          dat.text = e.target.value;
          dat.type = type;
        }
        return dat;
      })
    );
  }

  function NextElement(i: any) {
    let abs = document.getElementById("myInput" + i)?.parentElement
      ?.parentElement?.nextElementSibling?.firstElementChild
      ?.firstElementChild as HTMLElement;
    console.log(abs, "tes", i);

    if (abs) {
      abs.focus();
    }
  }
  function PrevElement(i: any) {
    let abs = document.getElementById("myInput" + i)?.parentElement
      ?.parentElement?.previousElementSibling?.firstElementChild
      ?.firstElementChild as HTMLElement;
    console.log(abs, "tes", i);

    if (abs) {
      abs.focus();
    }
  }

  const [index, setIndex] = useState();
  const [dienter, setDienter] = useState(false);
  useEffect(() => {
    console.log(dienter);
    if (dienter) {
      console.log("apakah jalan", index);
      NextElement(index);
      setDienter(false);
    }
  }, [dienter]);
  function NewLine(i: any, typeTextNew: any) {
    setTextJson((old) => [
      ...old.slice(0, i + 1),
      { id: old.length + 1, text: "", type: typeTextNew },
      ...old.slice(i + 1, old.length),
    ]);
  }
  function enter2(e: any, i: any, type: any) {
    setIndex(i);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      NextElement(i);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      PrevElement(i);
      // let abs = document.getElementById("myInput" + i)?.parentElement
      //   .previousElementSibling?.firstElementChild as HTMLElement;
      // if (abs) {
      //   abs.focus();
      // }
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (type === "action") {
        UpdateJson(e, "character", i);
        console.log("type4 cek22 ");
      }
      if (type === "character") {
        UpdateJson(e, "action", i);
        console.log("type3 cek22 ");
      }
    }
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      NewLine(i, "transition");
      setDienter(true);
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log(e.target.value.length);
      if (e.target.value.length > 0) {
        console.log("cek22");

        if (type === "scene") {
          // setTypeText("action");
          NewLine(i, "action");
          setDienter(true);
        }
        if (type === "transition") {
          // setTypeText("action");
          NewLine(i, "scene");
          setDienter(true);
        }
        if (type === "action") {
          // setTypeText("action");
          NewLine(i, "action");
          setDienter(true);
        }
        if (type === "character") {
          NewLine(i, "dialog");
          setDienter(true);
          console.log("type2 cek22 ");
        }
        if (type === "dialog") {
          NewLine(i, "character");
          setDienter(true);
          console.log("type1 cek22 ");
        }
      } else {
        if (type === "scene") {
          UpdateJson(e, "action", i);
          console.log("type");
        }
        if (type === "action") {
          UpdateJson(e, "scene", i);
          console.log("type");
        }
      }
    }
  }
  // const data={}
  const datase = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
    { value: "riot", label: "Riot" },
    { value: "next", label: "Next.js" },
    { value: "blitz", label: "Blitz.js" },
  ];
  return (
    <>
      <Helmet title="Lunox">
        <title>Lunox</title>
      </Helmet>
      <nav className="bg-purple-300 px-4 py-3 mx-auto flex flex-row justify-between items-center">
        <MultiSelect data={datase} placeholder="Pick all that you like" />
        <Input placeholder="Your email" />
        <Button variant="white" classNames={{ root: "bg-white" }}>
          Save
        </Button>
        <Button variant="outline" color="red" uppercase>
          Settings
        </Button>
        {/* // filled button with red color */}
        <Button variant="outline">Export PDF</Button>
        {/* // outline button with theme.primaryColor color */}
      </nav>
      <Layout version={version}>
        <div
          style={{ height: "594mm", padding: "20mm" }}
          className="shadow-lg bg-white border border-red-500"
        >
          {textJson.map?.((a, i) => (
            <Textarea
              id={"myInput" + i}
              value={a.text}
              onKeyDown={(e) => enter2(e, i, a.type)}
              name={a.id.toString()}
              onChange={(e) => {
                UpdateJson(e, a.type, i);
                console.log(e);
              }}
              // styles={{}}
              // style={{ background: "black" }}
              // className="bg-red-500"
              classNames={{
                input: `${
                  a.type === "scene" &&
                  "bg-gray-600 uppercase text-white font-bold text-base"
                } ${a.type === "action" && "action"} ${
                  a.type === "dialog" && "dialog"
                } ${a.type === "character" && "character"} ${
                  a.type === "transition" && "transition"
                } rounded-none border-none`,
              }}
              // placeholder="Autosize with no rows limit"
              autosize
            />
          ))}
          {/* <div style={{ height: "5mm" }} className="bg-gray-800"></div> */}
        </div>
        <p className="uppercase border-none text-white bg-gray-600 font-bold text-base">
          text
        </p>
      </Layout>
    </>
  );
};

export default Home;
