import { useState, useEffect } from "react";

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
    } else {
      setUrl("https://http.cat/0")
    }
  };

  return (
    <main>
      <div>
        <input
          type="text"
          value={code}
          placeholder="Digite um código Http"
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          type="button"
          onClick={() => getCatImage()}
        >
          Buscar
        </button>
      </div>
      <img src={url} alt="cat" />
    </main>
  );
}
