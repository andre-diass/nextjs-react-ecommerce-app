/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form";
import { Label, TextInput } from "flowbite-react";
import upload from "@/public/upload.svg";
import axios from "axios";
import { useEffect, useState } from "react";

interface IForm {
  name: string;
  description: string;
  price: number;
}

export default function ProductForm(props: any) {
  const form = useForm<IForm>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [images, setImages] = useState(props.imageLinks || []);

  const uploadImages = async (event: any) => {
    const files = event.target?.files;
    if (files.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      await axios
        .post("/api/products/uploadImage", data, {
          params: { productId: props.productId },
        })
        .then((res) => {
          setImages((oldImages: any) => {
            return [...oldImages, ...res.data.links];
          });
        });
    }
  };

  useEffect(() => {
    props.sentImageData(images);
  }, [images, props]);
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

        <Label
          className="text-slate-200"
          htmlFor="productPrice"
          value="Photos"
        />
        <div className="flex flex-wrap gap-2">
          {!!images?.length &&
            images.map((link: any) => (
              <div key={link} className="h-24">
                <img className="max-h-24 rounded-md" src={link} alt="link" />
              </div>
            ))}
          <div>
            <label className="flex cursor-pointer text-sm gap-1 w-24 h-24 text-center justify-center items-center text-gray-500 rounded-md bg-gray-200">
              <img src={upload.src} alt="upload" width={22} height={22} />
              Upload{" "}
              <input
                onChange={uploadImages}
                multiple
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