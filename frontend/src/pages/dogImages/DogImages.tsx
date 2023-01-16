import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import axios from "axios";
import { Button } from "@mui/material";

export default function DogImages(): JSX.Element {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getDogImage();
  }, []);

  const getDogImage = async () => {
    setIsLoading(true);
    const URL = "https://random.dog/woof.json";
    const { data: { url } } = await axios.get(URL);
    setUrl(url);
    setIsLoading(false);
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
          <Button
            className={`bg-teal-600 hover:bg-teal-700 font-bold px-12 py-4
              shadow-lg text-white`}
            type="button"
            onClick={() => getDogImage()}
          >
            Recarregar
          </Button>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div
              className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"
            />
          </div>
        ) : (
          <img
            src={url}
            alt="dog"
            className="w-2/5 max-h-screen  rounded-2xl"
          />
        )}
      </main>
    </>
  );
}
