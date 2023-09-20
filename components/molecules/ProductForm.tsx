/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form";
import { Label, TextInput } from "flowbite-react";
import upload from "@/public/upload.svg";
import axios from "axios";

interface FormData {
  name: string;
  description: string;
  price: number;
  images: FileList;
}

export default function ProductForm(props: any) {
  const form = useForm<FormData>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const uploadImages = async (event: any) => {
    const files = event.target?.files;
    if (files.length > 0) {
      const data = new FormData();
      Array.from(files).forEach((file: any) => data.append("file", file));
      const res = await axios.post("/api/products/uploadImage", data);
      console.log(res.data);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(props.onSubmit)}
        noValidate
        className="flex m-10 mx-20 flex-col gap-4  "
      >
        <h1 className="text-xl font-medium dark:text-white">{props.heading}</h1>
        <div>
          <Label
            className="text-slate-200"
            htmlFor="productName"
            value="Nome do produto"
          />
          <TextInput
            id="productName"
            type="string"
            className="mt-2"
            {...register("name", {
              required: {
                value: props.isInputRequired,
                message: "Nome do produto é obrigtório",
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>
        <div>
          <Label className="text-slate-200" htmlFor="email" value="Descrição" />
          <TextInput
            id="productDescription"
            type="string"
            className="mt-2"
            style={{ height: "80px" }}
            {...register("description")}
          />
        </div>
        <div className="flex-col ">
          <Label
            className="text-slate-200"
            htmlFor="productPrice"
            value="Photos"
          />
          <div>
            <label className="flex cursor-pointer text-sm gap-1 w-24 h-24 mt-2 text-center justify-center items-center text-gray-500 rounded-md bg-gray-200">
              <img src={upload.src} alt="upload" width={22} height={22} />
              Upload{" "}
              <input
                onChange={uploadImages}
                className="hidden"
                type="file"
              ></input>
            </label>
          </div>
        </div>
        <div>
          <Label
            className="text-slate-200"
            htmlFor="productPrice"
            value="Preço"
          />
          <TextInput
            id="productPrice"
            type="number"
            className="mt-2"
            {...register("price", {
              required: {
                value: props.isInputRequired,
                message: "Preço é obrigtório",
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.price?.message}</p>
        </div>
        <button type="submit"> Submit </button>
      </form>
    </>
  );
}
