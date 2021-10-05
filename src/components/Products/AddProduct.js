import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { addProduct, updateProduct } from "store/products";
import "./Products.scss";

export default function AddProduct(props) {
  const [product, setProductProfile] = useState({
    name: "",
    description: "",
    price: "",
  });

  const onSubmit = async (data) => {
    const returnedTarget = Object.assign(product, data);
    setProductProfile({ ...returnedTarget });
    if (errors.length) return;
    await submitDataFinal();
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitDataFinal = () => {
    let data = {
      product,
      access_token: props.access_token,
    };
    addProduct(data)
      .then((res) => {
        alert("success");
        setTimeout(() => {
          props.toggleAddProduct(false);
        }, 2000);
      })
      .catch((err) => {
        console.log("Failed", err.response);
        alert("Failed");
      });
  };

  // const submitData = useCallback(debounce(submitDataFinal, 5000), []);

  return (
    <div className="Products__sub-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="Login__col-3">
          {errors.name && (
            <div className="Users__errors">
              Name needs to be at least 3 characters
            </div>
          )}
          <input
            className="Login__input-focus-effect"
            type="text"
            placeholder="Name"
            {...register("name", {
              required: "required",
              minLength: {
                value: 8,
                message: "Please enter a valid password min 8 char",
              },
            })}
          ></input>
          <span className="focus-border"></span>
        </div>

        <div className="Login__col-3">
          {errors.price && (
            <div className="Users__errors">This field is required</div>
          )}

          <input
            className="Login__input-focus-effect"
            placeholder="Price"
            type="number"
            {...register("price", {
              required: "required",
              min: 1,
            })}
          />
          <span className="focus-border"></span>
        </div>

        <div className="Login__col-3">
          {errors.description && (
            <div className="Users__errors">
              Please enter a valid description min 8 char"
            </div>
          )}
          <input
            className="Login__input-focus-effect"
            type="description"
            placeholder="Description"
            {...register("description", { required: "required", min: 5 })}
          ></input>
          <span className="focus-border"></span>
        </div>

        <div className="Login__col-3">
          <input
            className={
              errors.length
                ? "Products__refresh-button Products__refresh-button-disabled"
                : "Products__refresh-button"
            }
            type="submit"
            value="Add New Product"
          ></input>
        </div>
      </form>
    </div>
  );
}
