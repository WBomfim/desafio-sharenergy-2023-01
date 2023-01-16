import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Header from "../../components/header/Header";

export default function CatImages(): JSX.Element {
  const [code, setCode] = useState("");
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    setUrl("https://http.cat/200");
  }, []);

  const getCatImage = async () => {
    if (code !== "") {
      const url = `https://http.cat/${code}`;
      setUrl(url);
      setCode("");
    } else {
      setUrl("https://http.cat/0")
    }
  };

  return (
    <>
      <Header />
      <main
        className="flex flex-col items-center gap-8"
      >
        <div
          className="flex gap-5 mt-8"
        >
          <TextField
            className="shadow-md"
            type="text"
            value={code}
            placeholder="Digite um código Http"
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            className="bg-teal-600 hover:bg-teal-700 font-bold px-8 shadow-lg"
            type="button"
            variant="contained"
            onClick={() => getCatImage()}
          >
            Buscar
          </Button>
        </div>
        <img
          src={url}
          alt="cat"
          className="w-2/5 rounded-2xl"
        />
      </main>
    </>
  );
}
