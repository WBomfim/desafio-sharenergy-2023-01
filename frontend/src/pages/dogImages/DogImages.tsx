import { useEffect, useState } from "react";
import axios from "axios";

export default function DogImages(): JSX.Element {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    getDogImage();
  }, []);

  const getDogImage = async () => {
    const URL = "https://random.dog/woof.json";
    const { data: { url } } = await axios.get(URL);
    setUrl(url);
  };

  return (
    <main>
      <div>
        <button
          type="button"
          onClick={() => getDogImage()}
        >
          Recarregar
        </button>
      </div>
      <img src={url} alt="dog" />
    </main>
  );
}
