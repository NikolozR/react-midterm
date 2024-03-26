import React, { useState } from "react";
import { useForm } from "react-hook-form";
import usePostProducts from "../service/Products/usePostProducts";
import { useQueryClient } from "react-query";
import { faker } from "@faker-js/faker";
import "../styles/Form.scss";
import useYupValidationResolver from "../service/validation/useYupValidationResolver";
import { validationSchemaAddProduct } from "../service/validation/validationSchemaAddProduct";
import useGetCategories from "../service/Categories/useGetCategories";

function AddProduct() {
  const queryClient = useQueryClient();
  const { createProduct } = usePostProducts(queryClient);
  const { data, isLoading, isSuccess } = useGetCategories();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      categoryId: "1",
      images: [""],
    },
    resolver: useYupValidationResolver(validationSchemaAddProduct),
  });

  return (
    <main>
      <div className="container">
        <form
          action=""
          onSubmit={handleSubmit((data) => {
            const urls = [];
            for (let i = 0; i < 5; i++) {
              urls.push(faker.image.url());
            }
            createProduct({
              title: data?.title,
              price: parseInt(data?.price),
              description: data?.description,
              categoryId: parseInt(data?.categoryId),
              images: urls,
            });
            reset()
          })}
        >
          <input
            type="text"
            placeholder="Product Title"
            name="title"
            id="title"
            {...register("title")}
          />
          {errors?.title && (
            <span className="error">{errors?.title.message}</span>
          )}
          <input
            type="text"
            placeholder="Product Description"
            name="descritpion"
            id="description"
            {...register("description")}
          />
          {errors?.description && (
            <span className="error">{errors?.description.message}</span>
          )}
          <input
            type="number"
            placeholder="Product Price"
            name="price"
            id="price"
            {...register("price")}
          />
          {errors?.price && (
            <span className="error">{errors?.price.message}</span>
          )}
          <select id="categoryId" name="categoryId" {...register("categoryId")}>
            {data?.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          {errors?.categoryId && (
            <span className="error">{errors?.categoryId.message}</span>
          )}
          <button type="submit">Add Product</button>
        </form>
      </div>
    </main>
  );
}

export default AddProduct;
