import { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import HTMLReactParser from "html-react-parser";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TambahBerita = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = async () => {
    try {
      await axios.post("/news", {
        title: title,
        content: content,
      });
      setTitle("");
      setContent("");
      navigate("/Berita");
      toast.success("Berhasil menambahkan berita");
    } catch (error) {
      toast.error("Gagal menambahkan berita");
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-primary min-h-screen w-full text-black px-10 pt-16 pb-40">
        <h1 className="text-2xl font-bold mb-8">Buat Berita</h1>

        <input
          value={title}
          className="w-full border border-black rounded-md p-2 mb-5 bg-primary max-w-lg"
          placeholder="Judul Berita"
          onChange={(e) => setTitle(e.target.value)}
        />

        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />

        <button
          className="bg-secondary text-white px-4 items-end py-2 mt-5 rounded-xl w-52 "
          onClick={onSubmit}
        >
          Simpan
        </button>
        {/* <div>{HTMLReactParser(content)}</div> */}
      </div>
    </>
  );
};

export default TambahBerita;
